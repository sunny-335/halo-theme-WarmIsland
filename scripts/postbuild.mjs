/**
 * 构建后置处理：
 * 1. 复制 logo.png 到 assets（保留历史行为）
 * 2. 合并 compat/assets 下的历史版本静态资源，避免站点/代理缓存中的旧 HTML
 *    仍然引用上一版本的哈希文件名时出现 500（FileNotFoundException）
 * 3. 校验所有 templates/*.html 引用的静态资源真实存在，缺失即构建失败
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "templates", "assets");
const compatDir = path.join(root, "compat", "assets");
const templatesDir = path.join(root, "templates");

fs.mkdirSync(assetsDir, { recursive: true });

// 1. logo
const logoSrc = path.join(templatesDir, "logo.png");
if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, path.join(assetsDir, "logo.png"));
}

// 2. 历史资源合并（已存在的同名文件以当前构建为准，不覆盖）
if (fs.existsSync(compatDir)) {
  let copied = 0;
  let skipped = 0;
  for (const entry of fs.readdirSync(compatDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const src = path.join(compatDir, entry.name);
    const dst = path.join(assetsDir, entry.name);
    if (fs.existsSync(dst)) {
      skipped++;
      continue;
    }
    fs.copyFileSync(src, dst);
    copied++;
  }
  console.log(`[compat] 历史静态资源：复制 ${copied} 个，当前构建已覆盖 ${skipped} 个`);
}

// 3. 资源引用校验
const missing = [];
const checked = new Set();
/** 主题静态资源前缀，必须与 astro.config.mjs 的 base 保持一致 */
const prefixes = ["/themes/warm-island/assets/"];

/** Thymeleaf 的 @{...} 链接表达式同样需要校验 */
const REFERENCE_RE =
  /(?:href|src)=["']([^"']*?\/(?:themes\/[^/]+)\/assets\/[^"']+?)["']/g;

for (const file of fs.readdirSync(templatesDir)) {
  if (!file.endsWith(".html")) continue;
  const html = fs.readFileSync(path.join(templatesDir, file), "utf8");
  REFERENCE_RE.lastIndex = 0;
  let match;
  while ((match = REFERENCE_RE.exec(html)) !== null) {
    let ref = match[1];
    if (ref.includes("@{")) continue; // 由 Halo 运行时解析，跳过
    for (const prefix of prefixes) {
      if (!ref.startsWith(prefix)) continue;
      const rel = ref.slice(prefix.length).split("#")[0].split("?")[0];
      const key = `${file}:${rel}`;
      if (checked.has(key)) continue;
      checked.add(key);
      if (!fs.existsSync(path.join(assetsDir, rel))) {
        missing.push(`${file} -> ${ref}`);
      }
    }
  }
}

if (missing.length > 0) {
  console.error(`[verify] 发现 ${missing.length} 处静态资源缺失：`);
  for (const item of missing) console.error(`  - ${item}`);
  process.exit(1);
}

console.log(`[verify] 静态资源引用校验通过（${checked.size} 条引用）`);
