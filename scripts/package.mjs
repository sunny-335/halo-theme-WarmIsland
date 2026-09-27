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
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
];
const INCLUDE_DIRS = ["templates"];
const EXCLUDE_DIRS = new Set([".git", "node_modules", "src", "dist", "compat", ".astro"]);

const entries = [];

for (const name of INCLUDE_ROOT) {
  const full = path.join(root, name);
  if (fs.existsSync(full)) {
    entries.push({ name, data: fs.readFileSync(full), date: fs.statSync(full).mtime });
  }
}

function walk(dir, prefix) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      walk(abs, rel);
    } else {
      entries.push({ name: rel, data: fs.readFileSync(abs), date: fs.statSync(abs).mtime });
    }
  }
}

for (const dir of INCLUDE_DIRS) {
  const full = path.join(root, dir);
  if (fs.existsSync(full)) walk(full, dir);
}

const version = readThemeVersion();
const outFile = path.join(root, "dist", `warm-island-${version}.zip`);
buildZip(entries, outFile);

const sizeMB = (fs.statSync(outFile).size / 1024 / 1024).toFixed(2);
console.log(`[package] dist/warm-island-${version}.zip（${entries.length} 个文件，${sizeMB}MB）`);
