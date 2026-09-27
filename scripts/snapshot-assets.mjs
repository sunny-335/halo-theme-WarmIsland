/**
 * 把当前构建产出的哈希静态资源快照进 compat/assets。
 *
 * 为什么要这么做：
 * Astro 给 CSS/JS 加内容哈希，主题升级后旧文件会被删除。若站点缓存或反向代理
 * （Halo 页面缓存 / Nginx / CDN）里还留着上一版本的 HTML，它仍然会请求旧哈希
 * 文件，Halo 找不到就直接抛 FileNotFoundException 返回 500，表现为"整站没样式"。
 * 把每个版本的哈希文件都留一份，旧 HTML 就永远不会请求失败。
 *
 * 用法：npm run build && npm run snapshot（随后把 compat/assets 的新增文件提交进仓库）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "templates", "assets");
const compatDir = path.join(root, "compat", "assets");

if (!fs.existsSync(assetsDir)) {
  console.error("[snapshot] 未找到 templates/assets，请先执行 npm run build");
  process.exit(1);
}

fs.mkdirSync(compatDir, { recursive: true });

/** 名称固定、体积大的资源不需要进兼容层 */
const SKIP_EXACT = new Set(["logo.png"]);
const SKIP_DIRS = new Set(["fonts"]);

let added = 0;
let updated = 0;
let unchanged = 0;

for (const entry of fs.readdirSync(assetsDir, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    if (SKIP_DIRS.has(entry.name)) continue;
    // 哈希资源都在根目录，子目录（如 fonts）不参与快照
    continue;
  }
  if (SKIP_EXACT.has(entry.name)) continue;

  const src = path.join(assetsDir, entry.name);
  const dst = path.join(compatDir, entry.name);
  const stat = fs.statSync(src);
  if (!fs.existsSync(dst)) {
    fs.copyFileSync(src, dst);
    added++;
  } else {
    const dstBuf = fs.readFileSync(dst);
    const srcBuf = fs.readFileSync(src);
    if (dstBuf.length !== stat.size || !dstBuf.equals(srcBuf)) {
      fs.copyFileSync(src, dst);
      updated++;
    } else {
      unchanged++;
    }
  }
}

console.log(
  `[snapshot] 新增 ${added} / 更新 ${updated} / 无变化 ${unchanged} 个历史资源（compat/assets）`
);
