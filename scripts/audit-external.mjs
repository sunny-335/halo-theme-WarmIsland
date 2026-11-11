/**
 * 外部资源与隐私审计（发版前自动检查，Node 内置模块，无第三方依赖）
 *
 * 对应 Halo 应用市场审核指南：
 *  - 1.4  远程执行与动态加载：禁止远程加载核心代码 / 动态拉取并执行组件
 *  - 4.4.4 性能与外部资源：不得预连接外部 CDN、加载远程脚本样式、打包无关大资源
 *  - 4.4.2 内容渲染安全：不得把站点内容用 th:utext 拼进 <script> 原始文本
 *  - 5.2 / 2.2：第三方字体必须随包携带许可证全文；上架说明数字必须与配置定义一致
 *  - 4.6 / 2.2：不得出现占位内容、无效链接
 *
 * 检查项：
 *  1. 模板中不得有指向第三方的 <link rel=preconnect|dns-prefetch|preload>
 *  2. 模板中不得有 src/href 直接指向 http(s) 的 script/link/img/iframe/source/video/audio
 *  3. 模板与静态资源中不得硬编码 fetch("https://...") / import("https://...") / url(https://...)
 *  4. 不得出现历史上被审核点名的第三方服务域名，或 autoloader 动态加载痕迹
 *  5. README 中的相对链接必须在安装包清单中真实存在
 *  6. 任何 <script> 开标签不得带 th:utext；字体许可证全文必须在制品清单中；
 *     README 的设置分组 / 配置项数量必须与 settings.yaml 一致
 *
 * 说明：<a href="https://..."> 这类需要访客主动点击的分享 / 备案 / 应用市场外链是允许的，
 * 不属于「自动外部请求」，但已在 README「外部资源与隐私」章节逐项披露。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** 曾经造成未披露外部请求的服务域名，出现即视为回归 */
const BLOCKED_HOSTS = [
  "cdn.jsdelivr.net",
  "unpkg.com",
  "cdnjs.cloudflare.com",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "v1.hitokoto.cn",
  "myip.ipip.net",
  "r.inews.qq.com",
];

const REMOTE_LOAD_RE =
  /<(?:script|link|img|iframe|source|video|audio)\b[^>]*\b(?:src|href)\s*=\s*["']https?:\/\/[^"']+["']/gi;
const PRECONNECT_RE =
  /<link\b[^>]*\brel\s*=\s*["'](?:preconnect|dns-prefetch|preload)["'][^>]*\bhref\s*=\s*["']https?:\/\/[^"']+["']/gi;
const REMOTE_FETCH_RE = /\b(?:fetch|importScripts)\s*\(\s*["']https?:\/\/[^"']+["']/gi;
const REMOTE_IMPORT_RE = /\bimport\s*\(\s*["']https?:\/\/[^"']+["']/gi;
const REMOTE_CSS_URL_RE = /url\(\s*["']?https?:\/\/[^)"']+/gi;
const AUTOLOADER_RE = /\b(?:prism-autoloader|languages_path|Prism\.plugins\.autoloader)\b/gi;

function listFiles(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      /* 字体目录只有本地 woff2 与版权注释，不参与审计 */
      if (entry.name === "fonts") continue;
      listFiles(abs, exts, out);
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      out.push(abs);
    }
  }
  return out;
}

export function auditTemplates(templatesDir = path.join(root, "templates")) {
  const problems = [];
  const files = listFiles(templatesDir, [".html", ".js", ".css"]);
  const htmlFiles = files.filter((f) => f.endsWith(".html"));
  /* 对外报告的模板数只算 templates/ 根目录下的 Halo 页面模板；
     templates/error/ 下的错误页 HTML 同样参与审计，但不计入模板数。 */
  const htmlCount = htmlFiles.filter((f) => path.dirname(f) === templatesDir).length;

  if (htmlFiles.length === 0) {
    problems.push("未找到任何 templates/*.html，构建产物不完整");
    return { fileCount: 0, htmlCount: 0, problems };
  }

  for (const file of files) {
    const rel = path.relative(root, file).replace(/\\/g, "/");
    const text = fs.readFileSync(file, "utf8");
    const isHtml = file.endsWith(".html");

    const rules = isHtml
      ? [
          ["远程预连接 / 预加载", PRECONNECT_RE],
          ["远程脚本 / 样式 / 媒体", REMOTE_LOAD_RE],
          ["硬编码外部 fetch", REMOTE_FETCH_RE],
          ["远程动态 import", REMOTE_IMPORT_RE],
          ["autoloader 动态加载", AUTOLOADER_RE],
        ]
      : [
          ["硬编码外部 fetch", REMOTE_FETCH_RE],
          ["远程动态 import", REMOTE_IMPORT_RE],
          ["CSS 远程 url()", REMOTE_CSS_URL_RE],
        ];

    for (const [label, re] of rules) {
      re.lastIndex = 0;
      const hit = re.exec(text);
      if (hit) {
        problems.push(`${rel}: ${label} → ${hit[0].slice(0, 110)}`);
      }
    }

    for (const host of BLOCKED_HOSTS) {
      if (isHtml && text.includes(host)) {
        problems.push(`${rel}: 出现已移除的第三方服务域名 ${host}`);
      }
    }
  }

  return { fileCount: files.length, htmlCount, problems };
}

export function auditReadmeLinks(entryNames, readmePath = path.join(root, "README.md")) {
  const problems = [];
  if (!fs.existsSync(readmePath)) return ["README.md 不存在"];
  const readme = fs.readFileSync(readmePath, "utf8");
  const linkRe = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;
  let checked = 0;
  while ((match = linkRe.exec(readme)) !== null) {
    const href = match[1];
    if (/^(?:https?:|mailto:|#)/.test(href)) continue;
    let target = href.split("#")[0];
    if (!target) continue;
    try {
      target = decodeURIComponent(target);
    } catch (e) {
      /* 保留原值 */
    }
    target = target.replace(/^\.\//, "");
    checked++;
    if (!entryNames.has(target)) {
      problems.push(`README.md 相对链接在安装包中不存在：${href}（期望 ${target}）`);
    }
  }
  return { problems, checked };
}

/**
 * 合规审计：审核指南 4.4.2（内容渲染安全）、5.2（许可证传递）、2.2（上架信息准确）
 *
 * @param {Set<string>|null} entryNames 打包清单；传入时额外校验许可证确实进了制品
 */
export function auditCompliance(entryNames = null) {
  const problems = [];
  const templatesDir = path.join(root, "templates");
  const oflRel = "templates/assets/fonts/LXGWWenKai/OFL.txt";

  // 1. <script> 是原始文本元素，th:utext 不转义且可被脚本闭合标签截断（4.4.2）
  const scriptTagRe = /<script\b[^>]*>/gi;
  for (const file of listFiles(templatesDir, [".html"])) {
    const rel = path.relative(root, file).replace(/\\/g, "/");
    const text = fs.readFileSync(file, "utf8");
    scriptTagRe.lastIndex = 0;
    let hit;
    while ((hit = scriptTagRe.exec(text)) !== null) {
      if (/\bth:utext\b/i.test(hit[0])) {
        problems.push(`${rel}: <script> 开标签使用了 th:utext（4.4.2 内容注入风险）`);
      }
    }
  }

  // 2. SIL OFL 1.1 要求随字体软件附带版权声明与许可证全文（5.2）
  const oflPath = path.join(root, oflRel);
  if (entryNames && !entryNames.has(oflRel)) {
    problems.push(`安装包缺少 ${oflRel}（5.2 字体许可证传递）`);
  }
  if (!fs.existsSync(oflPath)) {
    problems.push(`构建产物缺少 ${oflRel}（5.2 字体许可证传递）`);
  } else {
    const ofl = fs.readFileSync(oflPath, "utf8");
    if (!/SIL OPEN FONT LICENSE Version 1\.1/.test(ofl) || !/Copyright 2021-2026 LXGW/.test(ofl)) {
      problems.push(`${oflRel} 内容不完整：需包含上游版权声明与 OFL 1.1 全文`);
    }
  }

  // 3. 上架说明里的配置数量必须与 settings.yaml 一致（2.2 / 4.6）
  const settingsPath = path.join(root, "settings.yaml");
  const readmePath = path.join(root, "README.md");
  let groupCount = 0;
  let fieldCount = 0;
  if (fs.existsSync(settingsPath) && fs.existsSync(readmePath)) {
    const settings = fs.readFileSync(settingsPath, "utf8");
    const readme = fs.readFileSync(readmePath, "utf8");
    groupCount = (settings.match(/^\s*-\s+group:/gm) || []).length;
    fieldCount = (settings.match(/^\s*-\s+\$formkit:/gm) || []).length;
    const expected = `${groupCount} 个设置分组、${fieldCount} 个配置项`;
    if (!readme.includes(expected)) {
      problems.push(`README 配置数量与 settings.yaml 不一致，应为「${expected}」（2.2）`);
    }
  }

  return { problems, groupCount, fieldCount };
}

function report(label, problems) {
  if (problems.length === 0) {
    console.log(`[audit] PASS ${label}`);
    return 0;
  }
  for (const p of problems) console.error(`[audit] FAIL ${label}: ${p}`);
  return problems.length;
}

const isCli = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCli) {
  const templates = auditTemplates();
  const compliance = auditCompliance();
  let failures = 0;
  failures += report(
    `模板外部资源（${templates.htmlCount} 个 HTML / ${templates.fileCount} 个文件）`,
    templates.problems
  );
  failures += report(
    `合规审计 4.4.2 / 5.2 / 2.2（${compliance.groupCount} 组 / ${compliance.fieldCount} 配置项）`,
    compliance.problems
  );
  /* 独立运行时按当前磁盘上的打包清单口径检查 README 链接 */
  const distZip = path.join(root, "dist");
  const zip = fs.existsSync(distZip)
    ? fs.readdirSync(distZip).filter((f) => f.endsWith(".zip") && f.includes("warm-island"))
    : [];
  if (zip.length) {
    /* 简单口径：zip 存在时仅提示需通过 pnpm package 做完整链接校验 */
    console.log(`[audit] 提示：README 链接校验在 pnpm package 内执行（发现 ${zip.length} 个安装包）`);
  } else {
    console.log("[audit] 提示：README 链接校验在 pnpm package 内执行（当前无安装包）");
  }
  console.log(`[audit] 审计共 ${failures} 项问题`);
  process.exit(failures ? 1 : 0);
}
