/**
 * 结构化数据 / 内容渲染安全冒烟测试（审核指南 4.4.2）
 *
 * 从构建产物 templates/post.html 提取 JSON-LD 生成脚本，用桩 DOM 执行，验证：
 *  - 输出的 JSON-LD 合法、字段完整、可选字段缺省时不产生非法 JSON
 *  - 标题里注入的脚本闭合标签只作为普通字符串保留，不会变成可执行内容
 *  - 写入方式为 textContent，且模板中的 JSON-LD 标签初始为空
 *
 * 仅用 Node 内置模块，无浏览器 / 第三方依赖；需先执行 pnpm build。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postHtmlPath = path.join(root, "templates", "post.html");

if (!fs.existsSync(postHtmlPath)) {
  console.error("[jsonld-smoke] 未找到 templates/post.html，请先执行 pnpm build");
  process.exit(1);
}

const html = fs.readFileSync(postHtmlPath, "utf8");
const blocks = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
const code = blocks.find((block) => block.includes("wi-article-jsonld"));
if (!code) {
  console.error("[jsonld-smoke] 未找到 JSON-LD 生成脚本");
  process.exit(1);
}

let pass = 0;
let fail = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`  ✔ ${name}`);
    pass++;
  } catch (error) {
    console.error(`  ✘ ${name} -> ${error.message}`);
    fail++;
  }
}

function render(values) {
  const target = { textContent: "" };
  const document = {
    querySelector: (selector) =>
      values[selector] == null ? null : { getAttribute: () => values[selector] },
    getElementById: (id) => (id === "wi-article-jsonld" ? target : null),
    title: "fallback title",
  };
  let executed = false;
  vm.runInNewContext(
    code,
    { document, JSON, console, eval: () => (executed = true) },
    { timeout: 1000 }
  );
  return { raw: target.textContent, executed };
}

const base = {
  'meta[property="og:title"]': "普通标题",
  'meta[property="og:url"]': "https://example.com/archives/a",
  'meta[property="article:published_time"]': "2026-11-11",
  'meta[name="author"]': "暖心向阳335",
  'meta[property="og:site_name"]': "WarmIsland",
  'meta[property="og:image"]': "https://example.com/cover.png",
  'meta[property="og:description"]': '含"引号"与\n换行的摘要',
};

check("正常文章生成合法 JSON-LD", () => {
  const data = JSON.parse(render(base).raw);
  if (data["@type"] !== "Article" || data.headline !== "普通标题") {
    throw new Error("标题 / 类型不符");
  }
  if (data.author.name !== "暖心向阳335") throw new Error("作者不符");
  if (!data.description.includes("\n")) throw new Error("换行丢失");
  if (data.image !== base['meta[property="og:image"]']) throw new Error("封面丢失");
});

check("模板里的 JSON-LD 标签初始为空（动态内容不经 HTML 解析）", () => {
  const match = html.match(/<script\b[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error("未找到 JSON-LD 标签");
  if (match[1].trim() !== "") throw new Error("标签内仍有静态 / 拼接内容，可能被解析为 HTML");
});

check("脚本只用 textContent 写入，不含 innerHTML / document.write / eval", () => {
  if (!code.includes(".textContent = JSON.stringify")) throw new Error("未使用 textContent 安全赋值");
  if (/innerHTML|document\.write|\beval\s*\(/.test(code)) throw new Error("存在不安全写入方式");
});

check("标题含脚本闭合标签时只作为 JSON 字符串保留，不产生动态执行", () => {
  const injected = "</" + "script><img src=x onerror=alert(1)>";
  const result = render({ ...base, 'meta[property="og:title"]': injected });
  const data = JSON.parse(result.raw);
  if (data.headline !== injected || typeof data.headline !== "string") {
    throw new Error("标题被篡改或不是纯字符串");
  }
  if (result.executed) throw new Error("发生动态执行");
});

check("缺失可选字段时不产生 undefined / 非法 JSON", () => {
  const sparse = { ...base };
  delete sparse['meta[property="og:image"]'];
  delete sparse['meta[property="og:description"]'];
  const data = JSON.parse(render(sparse).raw);
  if ("image" in data || "description" in data) throw new Error("空字段未剔除");
});

check("全部 meta 缺失时仍输出合法 JSON", () => {
  const data = JSON.parse(render({}).raw);
  if (data["@context"] !== "https://schema.org" || data.author.name !== "") {
    throw new Error("兜底失败");
  }
});

console.log(`[jsonld-smoke] 内容渲染安全 ${pass} 项通过 / ${fail} 项失败`);
process.exit(fail ? 1 : 0);
