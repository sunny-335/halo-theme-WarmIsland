# CSS 变量

WarmIsland 主题使用 CSS 自定义属性（CSS Variables）构建完整的样式系统，方便用户通过覆盖变量来自定义主题外观。

## 颜色变量

### 浅色模式

```css
:root {
  --bg: #faf7f2;
  --bg-raised: #f3ede5;
  --bg-overlay: rgba(250, 247, 242, 0.85);
  --ink: #2c2420;
  --ink-2: #7a6e64;
  --ink-3: #b5a99e;
  --rule: #e8e0d6;
  --accent: #d4764e;
  --accent-hover: #c4613a;
  --accent-bg: #fdf0e8;
  --mist-pink: #f0e4de;
  --sea-salt: #e8e0d6;
  --caramel: #8b6f5e;
  --glass-bg: rgba(250, 247, 242, 0.72);
  --glass-border: rgba(232, 224, 214, 0.5);
  --shadow-sm: 0 1px 3px rgba(44, 36, 32, 0.06);
  --shadow-md: 0 4px 16px rgba(44, 36, 32, 0.08);
  --shadow-lg: 0 8px 32px rgba(44, 36, 32, 0.12);
  --shadow-glow: 0 0 40px rgba(212, 118, 78, 0.15);
}
```

### 深色模式

```css
html.dark {
  --bg: #1a1614;
  --bg-raised: #242018;
  --bg-overlay: rgba(26, 22, 20, 0.85);
  --ink: #ede6de;
  --ink-2: #9a8e84;
  --ink-3: #5e544a;
  --rule: #2e2822;
  --accent: #e8955f;
  --accent-hover: #f0a872;
  --accent-bg: #2a1e16;
  --mist-pink: #2e2420;
  --sea-salt: #2e2822;
  --caramel: #a08878;
  --glass-bg: rgba(26, 22, 20, 0.72);
  --glass-border: rgba(46, 40, 34, 0.5);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.35);
  --shadow-glow: 0 0 40px rgba(232, 149, 95, 0.12);
}
```

## 字体变量

```css
:root {
  --font-sans: 'Noto Serif SC', 'Source Han Serif SC', Georgia, serif;
  --font-body: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

| 变量 | 用途 |
|------|------|
| `--font-sans` | 标题、强调文字（衬线体） |
| `--font-body` | 正文、UI 文字（无衬线体） |
| `--font-mono` | 代码（等宽体） |

## 字号变量

使用 `clamp()` 实现响应式字号：

```css
:root {
  --text-xs: clamp(0.7rem, 0.66rem + 0.2vw, 0.75rem);
  --text-sm: clamp(0.8rem, 0.76rem + 0.2vw, 0.875rem);
  --text-base: clamp(0.938rem, 0.89rem + 0.24vw, 1rem);
  --text-md: clamp(1.05rem, 0.99rem + 0.3vw, 1.125rem);
  --text-lg: clamp(1.15rem, 1.06rem + 0.45vw, 1.25rem);
  --text-xl: clamp(1.3rem, 1.16rem + 0.7vw, 1.5rem);
  --text-2xl: clamp(1.55rem, 1.34rem + 1.05vw, 1.875rem);
  --text-3xl: clamp(1.85rem, 1.52rem + 1.65vw, 2.25rem);
  --text-4xl: clamp(2.15rem, 1.7rem + 2.25vw, 3rem);
  --text-5xl: clamp(2.6rem, 1.9rem + 3.5vw, 3.75rem);
}
```

| 变量 | 最小值 | 最大值 | 典型用途 |
|------|--------|--------|----------|
| `--text-xs` | 0.7rem | 0.75rem | 辅助标签、日期 |
| `--text-sm` | 0.8rem | 0.875rem | 次要文字、描述 |
| `--text-base` | 0.938rem | 1rem | 正文 |
| `--text-md` | 1.05rem | 1.125rem | 页面正文 |
| `--text-lg` | 1.15rem | 1.25rem | 卡片标题 |
| `--text-xl` | 1.3rem | 1.5rem | 小节标题 |
| `--text-2xl` | 1.55rem | 1.875rem | 区块标题 |
| `--text-3xl` | 1.85rem | 2.25rem | 页面标题 |
| `--text-4xl` | 2.15rem | 3rem | 大标题 |
| `--text-5xl` | 2.6rem | 3.75rem | Hero 标题 |

## 间距变量

```css
:root {
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1200px;
  --content-max: 800px;
  --section-spacing: clamp(3rem, 2rem + 3vw, 6rem);
}
```

## 圆角变量

圆角使用 SCSS 变量定义，不在运行时作为 CSS 变量暴露：

```scss
$border-radius-sm: 8px;
$border-radius-md: 12px;
$border-radius-lg: 16px;
$border-radius-xl: 24px;
$border-radius-full: 9999px;
```

## 阴影变量

```css
:root {
  --shadow-sm: 0 1px 3px rgba(44, 36, 32, 0.06);
  --shadow-md: 0 4px 16px rgba(44, 36, 32, 0.08);
  --shadow-lg: 0 8px 32px rgba(44, 36, 32, 0.12);
  --shadow-glow: 0 0 40px rgba(212, 118, 78, 0.15);
}

html.dark {
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.35);
  --shadow-glow: 0 0 40px rgba(232, 149, 95, 0.12);
}
```

## 动画变量

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-breath: 3s;
}
```

## 行高变量

```css
:root {
  --leading-none: 1;
  --leading-tight: 1.2;
  --leading-snug: 1.35;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;
  --leading-loose: 2;
}
```

| 变量 | 值 | 用途 |
|------|-----|------|
| `--leading-none` | 1 | 紧凑元素 |
| `--leading-tight` | 1.2 | 标题 |
| `--leading-snug` | 1.35 | 小标题 |
| `--leading-normal` | 1.6 | 正文 |
| `--leading-relaxed` | 1.75 | 长文阅读 |
| `--leading-loose` | 2 | 宽松排版 |

## 字间距变量

```css
:root {
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.04em;
  --tracking-wider: 0.08em;
  --tracking-widest: 0.12em;
}
```

| 变量 | 值 | 用途 |
|------|-----|------|
| `--tracking-tight` | -0.02em | 大标题 |
| `--tracking-normal` | 0 | 正文 |
| `--tracking-wide` | 0.04em | 辅助文字 |
| `--tracking-wider` | 0.08em | 标签、日期 |
| `--tracking-widest` | 0.12em | 大写标签 |

## 如何覆盖变量

### 方法一：主题设置

在 Halo 后台 → **外观** → **主题** → **样式设置** 中的「自定义 CSS」字段添加覆盖规则：

```css
:root {
  --accent: #e85d75;
  --accent-hover: #d44a64;
  --accent-bg: #fdf0f3;
}

html.dark {
  --accent: #f07090;
  --accent-hover: #f5889f;
  --accent-bg: #2a1a1e;
}
```

### 方法二：外部 CSS

在 Halo 后台 → **外观** → **主题** → **页脚设置** 中的「自定义 HTML」字段引入外部 CSS：

```html
<link rel="stylesheet" href="https://your-cdn.com/custom.css" />
```

::: warning
覆盖变量时，务必同时覆盖深色模式的对应变量（`html.dark` 选择器下），否则深色模式下可能出现颜色不协调的问题。
:::
