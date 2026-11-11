/**
 * 打包主题安装包：dist/warm-island-<version>.zip
 *
 * 安装包结构与 Halo 主题目录一致（根目录直接放 theme.yaml / settings.yaml /
 * templates），与历史版本安装包保持相同布局，可直接上传安装。
 *
 * 仅依赖 Node 内置模块，无需额外依赖。
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import { auditTemplates, auditReadmeLinks } from "./audit-external.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** 读取 theme.yaml 中的版本号（避免手抄版本号不一致） */
function readThemeVersion() {
  const yaml = fs.readFileSync(path.join(root, "theme.yaml"), "utf8");
  const match = yaml.match(/^\s*version:\s*["']?([^"'\n]+)["']?\s*$/m);
  if (!match) {
    throw new Error("theme.yaml 中未找到 version 字段");
  }
  return match[1].trim();
}

/* ---------------- CRC32 ---------------- */
const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

/* ---------------- ZIP 写入 ---------------- */
function dosDateTime(date = new Date()) {
  const time =
    ((date.getHours() & 0x1f) << 11) |
    ((date.getMinutes() & 0x3f) << 5) |
    ((date.getSeconds() / 2) & 0x1f);
  const day =
    (((date.getFullYear() - 1980) & 0x7f) << 9) |
    (((date.getMonth() + 1) & 0xf) << 5) |
    (date.getDate() & 0x1f);
  return { time, day };
}

function buildZip(entries, outFile) {
  const chunks = [];
  const central = [];
  let offset = 0;

  for (const entry of entries) {
    const nameBuf = Buffer.from(entry.name, "utf8");
    const raw = entry.data;
    const crc = crc32(raw);
    const compressed = zlib.deflateRawSync(raw, { level: 9 });
    const useDeflate = compressed.length < raw.length;
    const body = useDeflate ? compressed : raw;
    const method = useDeflate ? 8 : 0;
    const { time, day } = dosDateTime(entry.date);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0x0800, 6); // UTF-8 名称
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(day, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);

    chunks.push(local, nameBuf, body);

    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4); // version made by
    cd.writeUInt16LE(20, 6); // version needed
    cd.writeUInt16LE(0x0800, 8);
    cd.writeUInt16LE(method, 10);
    cd.writeUInt16LE(time, 12);
    cd.writeUInt16LE(day, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(body.length, 20);
    cd.writeUInt32LE(raw.length, 24);
    cd.writeUInt16LE(nameBuf.length, 28);
    cd.writeUInt16LE(0, 30); // extra
    cd.writeUInt16LE(0, 32); // comment
    cd.writeUInt16LE(0, 34); // disk start
    cd.writeUInt16LE(0, 36); // internal attrs
    cd.writeUInt32LE(0, 38); // external attrs
    cd.writeUInt32LE(offset, 42);
    central.push(Buffer.concat([cd, nameBuf]));

    offset += local.length + nameBuf.length + body.length;
  }

  const centralBuf = Buffer.concat(central);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(centralBuf.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, Buffer.concat([...chunks, centralBuf, eocd]));
}

/* ---------------- 收集文件 ---------------- */
const INCLUDE_ROOT = [
  "theme.yaml",
  "settings.yaml",
  "LICENSE",
  "README.md",
  /* 上架说明引用的预览图必须真实存在于制品中（审核指南 4.6 / 2.2） */
  "WarmIsland Preview.webp",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
];
const INCLUDE_DIRS = ["templates"];
/* README 引用的 docs/*.md 也要随包分发，避免制品内出现死链 */
const INCLUDE_DOCS = ["docs"];
const EXCLUDE_DIRS = new Set([
  ".git", "node_modules", "src", "dist", "compat", ".astro", ".vitepress",
]);

/* ---------------- 构建产物前置校验 ----------------
 * templates/ 被 .gitignore 忽略，克隆仓库或清理工作区后默认不存在。
 * 旧逻辑里 walk() 对不存在的目录只是静默跳过，于是会打出只含
 * theme.yaml / settings.yaml 的"空壳包"；上传到 Halo 后旧主题被覆盖，
 * 找不到 index 模板，首页直接 404「Template index was not found.」。
 * 这里 fail fast，禁止产出这种包。
 */
function fail(message) {
  console.error(`[package] ${message}`);
  console.error("[package] 请先执行 pnpm build（或直接 pnpm release）生成完整模板产物后再打包。");
  process.exit(1);
}

const templatesDir = path.join(root, "templates");
if (!fs.existsSync(templatesDir)) fail("未找到 templates/ 目录");

const htmlTemplates = fs.readdirSync(templatesDir).filter((name) => name.endsWith(".html"));
for (const required of ["index.html", "post.html", "page.html", "archives.html"]) {
  if (!htmlTemplates.includes(required)) fail(`缺少必需模板 templates/${required}`);
}
if (htmlTemplates.length < 10) {
  fail(`模板数量异常（仅 ${htmlTemplates.length} 个 .html），疑似构建不完整`);
}
if (!fs.existsSync(path.join(templatesDir, "assets"))) {
  fail("未找到 templates/assets/ 静态资源目录");
}

const entries = [];

for (const name of INCLUDE_ROOT) {
  const full = path.join(root, name);
  if (fs.existsSync(full)) {
    entries.push({ name, data: fs.readFileSync(full), date: fs.statSync(full).mtime });
  }
}

function walk(dir, prefix, opts = {}) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      walk(abs, rel, opts);
    } else {
      /* docs 只收 Markdown 源文件，不收 VitePress 构建产物 / 依赖 README */
      if (opts.mdOnly && !entry.name.endsWith(".md")) continue;
      entries.push({ name: rel, data: fs.readFileSync(abs), date: fs.statSync(abs).mtime });
    }
  }
}

for (const dir of INCLUDE_DIRS) {
  const full = path.join(root, dir);
  if (fs.existsSync(full)) walk(full, dir);
}
for (const dir of INCLUDE_DOCS) {
  const full = path.join(root, dir);
  if (fs.existsSync(full)) walk(full, dir, { mdOnly: true });
}

if (!entries.some((entry) => entry.name === "templates/index.html")) {
  fail("打包清单中缺少 templates/index.html");
}

const version = readThemeVersion();
const pkgVersion = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).version;
if (pkgVersion !== version) {
  fail(`版本号不一致：package.json=${pkgVersion}，theme.yaml=${version}`);
}

/* ---------------- 上架合规前置校验 ----------------
 * 1. 主题不得出现未披露的第三方自动请求 / 远程动态加载（审核指南 1.4 / 4.4.4）
 * 2. README 的相对链接必须在制品内真实存在（审核指南 4.6 / 2.2）
 * 3. logo 只保留一份压缩版，避免打包两份 1.5MB 大图
 */
const templateAudit = auditTemplates(templatesDir);
for (const problem of templateAudit.problems) {
  console.error(`[package] ${problem}`);
}
if (templateAudit.problems.length) {
  fail("外部资源审计未通过：模板仍存在第三方远程加载 / 预连接");
}

const linkAudit = auditReadmeLinks(new Set(entries.map((entry) => entry.name)));
for (const problem of linkAudit.problems) {
  console.error(`[package] ${problem}`);
}
if (linkAudit.problems.length) {
  fail("README 存在指向制品中不存在文件的相对链接");
}

if (fs.existsSync(path.join(templatesDir, "logo.png"))) {
  fail("templates/logo.png 仍存在：应只保留压缩后的 templates/assets/logo.png");
}
const logoFile = path.join(templatesDir, "assets", "logo.png");
if (fs.existsSync(logoFile) && fs.statSync(logoFile).size > 300 * 1024) {
  fail("templates/assets/logo.png 超过 300KB，请先压缩再打包");
}
console.log(
  `[package] 合规审计通过（${templateAudit.htmlCount} 个模板、${linkAudit.checked} 个相对链接、logo 单份压缩）`
);

const outFile = path.join(root, "dist", `warm-island-${version}.zip`);
buildZip(entries, outFile);

const assetCount = entries.filter((entry) => entry.name.startsWith("templates/assets/")).length;
const sizeMB = (fs.statSync(outFile).size / 1024 / 1024).toFixed(2);
console.log(
  `[package] dist/warm-island-${version}.zip（${entries.length} 个文件：` +
    `${htmlTemplates.length} 个模板 / ${assetCount} 个资源，${sizeMB}MB）`
);
