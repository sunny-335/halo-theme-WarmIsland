# 样式与配色

WarmIsland 主题的视觉设计围绕「暖夜中的小岛」这一意象展开，追求温暖、宁静、有质感的阅读体验。

## 设计哲学

### 暖夜小岛

想象一座深夜里温暖的小岛——远处是深邃的夜空，近处是篝火般的暖光。这就是 WarmIsland 的设计基调：

- **温暖**：以暖色调为基础，避免冷硬的科技感
- **宁静**：克制的动效和留白，不喧宾夺主
- **质感**：毛玻璃、渐变光晕、细腻的阴影层次
- **呼吸**：元素有节奏地律动，如岛上的微风

### 设计原则

1. **内容优先**：所有视觉设计服务于内容阅读
2. **克制装饰**：每个装饰元素都有其存在的理由
3. **层次分明**：通过颜色、字号、间距建立清晰的信息层级
4. **温暖一致**：从配色到动效，保持统一的温暖气质

## 色彩系统

### 浅色模式

| 变量 | 色值 | 用途 |
|------|------|------|
| `--bg` | `#faf7f2` | 页面背景，温暖的米白色 |
| `--bg-raised` | `#f3ede5` | 卡片背景，略深的暖色 |
| `--bg-overlay` | `rgba(250, 247, 242, 0.85)` | 遮罩层背景 |
| `--ink` | `#2c2420` | 主文字色，深棕黑 |
| `--ink-2` | `#7a6e64` | 次要文字，中灰棕 |
| `--ink-3` | `#b5a99e` | 辅助文字，浅灰棕 |
| `--rule` | `#e8e0d6` | 分隔线、边框 |
| `--accent` | `#d4764e` | 强调色，温暖的赤陶橙 |
| `--accent-hover` | `#c4613a` | 强调色悬停态，更深的赤陶 |
| `--accent-bg` | `#fdf0e8` | 强调色浅底，用于标签背景 |
| `--mist-pink` | `#f0e4de` | 薄雾粉，Hero 渐变用 |
| `--sea-salt` | `#e8e0d6` | 海盐色，与 rule 相同 |
| `--caramel` | `#8b6f5e` | 焦糖色，滚动条用 |
| `--glass-bg` | `rgba(250, 247, 242, 0.72)` | 毛玻璃背景 |
| `--glass-border` | `rgba(232, 224, 214, 0.5)` | 毛玻璃边框 |

### 深色模式

通过 `html.dark` 选择器切换，所有颜色变量重新定义：

| 变量 | 色值 | 说明 |
|------|------|------|
| `--bg` | `#1a1614` | 深棕黑背景 |
| `--bg-raised` | `#242018` | 略浅的卡片背景 |
| `--ink` | `#ede6de` | 浅色主文字 |
| `--ink-2` | `#9a8e84` | 次要文字 |
| `--ink-3` | `#5e544a` | 辅助文字 |
| `--accent` | `#e8955f` | 更亮的强调色（保证对比度） |
| `--accent-hover` | `#f0a872` | 更亮的悬停态 |
| `--accent-bg` | `#2a1e16` | 深色强调底 |

### 阴影系统

| 变量 | 浅色模式 | 深色模式 | 用途 |
|------|----------|----------|------|
| `--shadow-sm` | `0 1px 3px rgba(44, 36, 32, 0.06)` | `0 1px 3px rgba(0, 0, 0, 0.2)` | 轻微阴影 |
| `--shadow-md` | `0 4px 16px rgba(44, 36, 32, 0.08)` | `0 4px 16px rgba(0, 0, 0, 0.25)` | 中等阴影 |
| `--shadow-lg` | `0 8px 32px rgba(44, 36, 32, 0.12)` | `0 8px 32px rgba(0, 0, 0, 0.35)` | 大阴影 |
| `--shadow-glow` | `0 0 40px rgba(212, 118, 78, 0.15)` | `0 0 40px rgba(232, 149, 95, 0.12)` | 强调色光晕 |

## 深色模式

### 切换机制

深色模式通过 `html.dark` 类名控制：

1. **跟随系统**（默认）：根据 `prefers-color-scheme` 媒体查询
2. **手动切换**：通过导航栏的主题切换按钮
3. **配置指定**：通过 `color_scheme` 配置项强制指定

### 切换逻辑

```javascript
// 优先级：localStorage > 配置项 > 系统偏好
var stored = localStorage.getItem("wi-theme");
var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
var scheme = document.currentScript.getAttribute("data-scheme");

if (stored === "dark") { isDark = true; }
else if (stored === "light") { isDark = false; }
else if (scheme === "dark") { isDark = true; }
else if (scheme === "light") { isDark = false; }
else if (!stored && prefersDark) { isDark = true; }
```

### 设计要点

- 深色模式不是简单的反色，而是重新定义了所有颜色变量
- 强调色在深色模式下更亮，保证足够的对比度
- 阴影在深色模式下使用纯黑，更自然
- 文字颜色保持温暖色调，不是纯白

## 字体系统

### 字体栈

| 变量 | 字体栈 | 用途 |
|------|--------|------|
| `--font-sans` | `Georgia, 'Noto Serif SC', 'Source Han Serif SC', serif` | 标题、强调文字 |
| `--font-body` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans SC', sans-serif` | 正文、UI 文字 |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace` | 代码 |

### 设计思路

- **标题用衬线体**：Georgia 赋予标题优雅的文艺气质，回退到系统中文字体
- **正文用系统字体**：使用各平台原生系统字体栈，确保最佳阅读体验与加载性能
- **代码用等宽体**：优先使用 JetBrains Mono，回退到系统等宽字体

::: tip
主题使用系统默认字体栈，无需额外加载字体文件，可显著提升页面加载速度。如需使用自定义字体，可通过 [自定义 CSS](/customize/custom-css) 覆盖 `--font-sans`、`--font-body` 等变量。
:::

## 间距系统

| 变量 | 值 | 用途 |
|------|-----|------|
| `--space-xs` | `0.25rem` | 极小间距 |
| `--space-sm` | `0.5rem` | 小间距 |
| `--space-md` | `1rem` | 标准间距 |
| `--space-lg` | `1.5rem` | 大间距 |
| `--space-xl` | `2rem` | 超大间距 |
| `--space-2xl` | `3rem` | 区块间距 |
| `--space-3xl` | `4rem` | 大区块间距 |
| `--space-4xl` | `6rem` | 页面级间距 |

### 容器宽度

| 变量 | 值 | 用途 |
|------|-----|------|
| `--container-sm` | `640px` | 小容器 |
| `--container-md` | `768px` | 中容器 |
| `--container-lg` | `1024px` | 大容器 |
| `--container-xl` | `1200px` | 最大容器 |
| `--content-max` | `800px` | 内容最大宽度 |

### 区块间距

`--section-spacing: clamp(3rem, 2rem + 3vw, 6rem)` — 响应式区块间距，在小屏幕上更紧凑。

## 圆角系统

| SCSS 变量 | 值 | 用途 |
|-----------|-----|------|
| `$border-radius-sm` | `8px` | 小元素（标签、代码块） |
| `$border-radius-md` | `12px` | 中等元素（卡片、图片） |
| `$border-radius-lg` | `16px` | 大元素（卡片、面板） |
| `$border-radius-xl` | `24px` | 超大元素 |
| `$border-radius-full` | `9999px` | 胶囊按钮、头像 |

### 配置项

通过 `border_radius` 配置项可全局调整圆角风格：

| 选项 | 效果 |
|------|------|
| `small` | 较小的圆角 |
| `medium` | 中等圆角（默认） |
| `large` | 较大的圆角 |

## 动画系统

### 时间曲线

| 变量 | 值 | 用途 |
|------|-----|------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | 弹性出场，用于悬停和展开 |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | 平滑出场，用于颜色过渡 |
| `--ease-in-out-cubic` | `cubic-bezier(0.65, 0, 0.35, 1)` | 对称缓动，用于循环动画 |

### 时长

| 变量 | 值 | 用途 |
|------|-----|------|
| `--duration-fast` | `150ms` | 快速反馈（颜色变化） |
| `--duration-normal` | `300ms` | 标准过渡（悬停效果） |
| `--duration-slow` | `500ms` | 慢速过渡（大位移） |
| `--duration-breath` | `3s` | 呼吸动画周期 |

### 关键帧动画

| 动画名 | 效果 | 用途 |
|--------|------|------|
| `breathe` | 透明度 0.4→0.7 + 缩放 1→1.08 | Hero 光球呼吸 |
| `fadeInUp` | 透明度 0→1 + 上移 20px | 元素入场 |
| `float` | 上下浮动 6px | 装饰元素 |
| `shimmer` | 背景位置平移 | 加载占位 |
| `scrollHint` | 透明度 + 下移 8px | 滚动指示器 |
| `likeHeartbeat` | 缩放 1→1.3→0.9→1 | 点赞心跳 |

### 动画开关

| 配置 | 说明 | 默认值 |
|------|------|--------|
| `animation_enabled` | 启用动效 | `true` |
| `animation_breath` | 呼吸动画 | `true` |
| `animation_scroll_reveal` | 滚动渐入 | `true` |
| `animation_cursor_glow` | 光感跟随 | `false` |

关闭动效时，`html` 元素添加 `wi-no-animations` 类名。
