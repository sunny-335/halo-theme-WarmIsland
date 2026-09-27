/**
 * 点击特效脚本冒烟测试（Node 内置模块，无第三方依赖）。
 *
 * 直接从构建产物 templates/index.html 中取出特效脚本，放进桩 DOM 里执行，
 * 校验：启用/禁用判定、拖尾与点击分支、节点生成与定位。
 *
 * 这类 bug 的共同点是"不报错但没效果"，靠读代码很难发现，所以固化成测试。
 * 用法：npm run build && npm run smoke
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const template = path.join(root, "templates", "index.html");

if (!fs.existsSync(template)) {
  console.error("[smoke] 未找到 templates/index.html，请先执行 npm run build");
  process.exit(1);
}

const html = fs.readFileSync(template, "utf8");
const anchor = html.indexOf('id="wi-click-effect"');
if (anchor === -1) {
  console.error("[smoke] 模板中未找到 #wi-click-effect 节点");
  process.exit(1);
}
const scriptOpen = html.indexOf("<script", anchor);
const scriptStart = html.indexOf(">", scriptOpen) + 1;
const scriptEnd = html.indexOf("</script>", scriptStart);
const code = html.slice(scriptStart, scriptEnd);

const failures = [];

function makeEl(tag) {
  return {
    tagName: tag,
    className: "",
    innerHTML: "",
    textContent: "",
    children: [],
    parentNode: null,
    style: {},
    _attrs: {},
    get offsetWidth() {
      return 1;
    },
    getAttribute(name) {
      return Object.prototype.hasOwnProperty.call(this._attrs, name) ? this._attrs[name] : null;
    },
    appendChild(child) {
      if (child.parentNode) return child;
      child.parentNode = this;
      this.children.push(child);
      return child;
    },
    removeChild(child) {
      const i = this.children.indexOf(child);
      if (i >= 0) {
        this.children.splice(i, 1);
        child.parentNode = null;
      }
      return child;
    },
  };
}

function run(attrs, expectEnabled, label) {
  const cfg = makeEl("div");
  Object.assign(cfg._attrs, attrs);
  const body = makeEl("body");
  const listeners = {};
  const sandbox = {
    document: {
      getElementById: (id) => (id === "wi-click-effect" ? cfg : null),
      createElement: makeEl,
      body,
      addEventListener(type, fn) {
        (listeners[type] = listeners[type] || []).push(fn);
      },
    },
    window: {},
    requestAnimationFrame: (fn) => fn(),
    setTimeout: () => 0,
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  const hasListener = Object.keys(listeners).length > 0;
  if (hasListener !== expectEnabled) {
    failures.push(`${label}：期望 ${expectEnabled ? "注册监听" : "不注册监听"}，实际相反`);
    return;
  }
  if (!expectEnabled) {
    console.log(`  ✔ ${label} -> 已跳过`);
    return;
  }

  const layer = body.children.find((c) => c.className === "wi-click-fx-layer");
  if (!layer) {
    failures.push(`${label}：未创建 .wi-click-fx-layer`);
    return;
  }
  if (layer.children.length !== 0) {
    failures.push(`${label}：初始化时特效层不应有子节点`);
    return;
  }

  const type = attrs["data-effect"] || "(缺失，走兜底 values)";
  if (listeners.click) {
    listeners.click[0]({ clientX: 120, clientY: 240 });
  } else if (listeners.mousemove) {
    listeners.mousemove[0]({ clientX: 120, clientY: 240 });
  } else {
    failures.push(`${label}：未注册 click 或 mousemove 监听`);
    return;
  }

  const spawned = layer.children;
  if (spawned.length === 0) {
    failures.push(`${label}：effect=${type} 触发后未生成任何特效节点`);
    return;
  }
  const first = spawned[0];
  if (!String(first.className).startsWith("wi-click-fx ")) {
    failures.push(`${label}：特效节点缺少 wi-click-fx 基类（${first.className}）`);
  }
  if (first.style.left !== "120px" || first.style.top !== "240px") {
    failures.push(`${label}：定位不正确（${first.style.left}, ${first.style.top}）`);
  }
  console.log(`  ✔ ${label} effect=${type} -> ${spawned.length} 个节点，className=${first.className}`);
}

console.log("禁用场景：");
run({ "data-enabled": "false", "data-effect": "values" }, false, "显式关闭");
run({ "data-effect": "values" }, false, "配置缺失");
run({ "data-enabled": "true", "data-effect": "off" }, false, "类型选了「关闭」");

console.log("点击场景：");
for (const effect of ["values", "hearts", "fireworks", "ripples", "particles", "stars"]) {
  run({ "data-enabled": "true", "data-effect": effect }, true, effect);
}
console.log("兜底与拖尾：");
run({ "data-enabled": "true" }, true, "type 缺省");
run({ "data-enabled": "true", "data-effect": "star-trail" }, true, "star-trail");
run({ "data-enabled": "true", "data-effect": "particle-trail" }, true, "particle-trail");

if (failures.length > 0) {
  console.error("\n[smoke] 失败：");
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log("\n[smoke] 点击特效全部通过");
