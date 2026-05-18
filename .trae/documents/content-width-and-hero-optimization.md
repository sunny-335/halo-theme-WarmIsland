# 内容区域宽度改回 800px & 优化首页 Hero 背景颜色

## 任务概述

1. 将 `.wi-content-wrap` 的 `max-width` 从 `720px` 改回 `800px`
2. 优化首页 Hero 区域的背景颜色，使其更有层次感和视觉吸引力

---

## 任务一：内容区域宽度改回 800px

### 修改文件
- `src/styles/main.scss`

### 具体改动
将 `.wi-content-wrap` 的 `max-width: 720px` 改为 `max-width: 800px`

```scss
// 修改前
.wi-content-wrap {
  max-width: 720px;
  margin: 0 auto;
  padding-inline: clamp(1rem, 3vw, 2rem);
}

// 修改后
.wi-content-wrap {
  max-width: 800px;
  margin: 0 auto;
  padding-inline: clamp(1rem, 3vw, 2rem);
}
```

> 注：`_variables.scss` 中已定义 `$content-max: 800px`，此处改回 800px 与变量定义一致。

---

## 任务二：优化首页 Hero 背景颜色

### 当前问题分析

当前 Hero 背景方案：
- **主背景**：`linear-gradient(160deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 92%, var(--accent) 8%) 50%, var(--bg) 100%)` — 渐变非常微弱，几乎看不出色调变化
- **光球 1**：`rgba(212, 118, 78, 0.35)` — 暖橙色，420px
- **光球 2**：`rgba(240, 180, 160, 0.3)` — 浅粉色，350px
- **光球 3**：`rgba(200, 150, 100, 0.25)` — 棕黄色，300px

问题：
1. 主背景渐变太弱（仅 8% accent 混合），几乎看不到渐变效果
2. 三个光球颜色过于接近暖棕色调，缺乏色彩层次
3. 整体偏"平"，缺少深度和氛围感
4. 暗色模式下没有单独的背景颜色适配

### 优化方案

#### 1. 增强主背景渐变
- 将渐变从 8% accent 提升到 15%，使背景有更明显的色调过渡
- 添加中间色调节点，让渐变更丰富

```css
background: linear-gradient(
  160deg,
  var(--bg) 0%,
  color-mix(in srgb, var(--bg) 85%, var(--accent) 15%) 40%,
  color-mix(in srgb, var(--bg) 90%, var(--mist-pink) 10%) 70%,
  var(--bg) 100%
);
```

#### 2. 优化光球颜色 — 增加色彩层次
- **光球 1**（右上）：保持暖橙色调，但稍微增加饱和度和大小，作为主视觉焦点
- **光球 2**（左下）：改为偏粉/玫瑰色调，与暖橙形成互补色对比
- **光球 3**（中央）：改为偏紫/薰衣草色调，增加神秘感和深度

```css
.hero__orb--1 {
  /* 暖橙 — 增强饱和度 */
  background: radial-gradient(circle, rgba(212, 118, 78, 0.4) 0%, transparent 70%);
}

.hero__orb--2 {
  /* 玫瑰粉 — 从浅粉改为带玫瑰色调 */
  background: radial-gradient(circle, rgba(220, 140, 160, 0.3) 0%, transparent 70%);
}

.hero__orb--3 {
  /* 薰衣草紫 — 从棕黄改为淡紫，增加深度 */
  background: radial-gradient(circle, rgba(180, 150, 200, 0.2) 0%, transparent 70%);
}
```

#### 3. 添加暗色模式适配
暗色模式下光球需要不同的颜色表现：

```css
html.dark .hero {
  background: linear-gradient(
    160deg,
    var(--bg) 0%,
    color-mix(in srgb, var(--bg) 85%, var(--accent) 12%) 40%,
    var(--bg) 100%
  );
}

html.dark .hero__orb--1 {
  background: radial-gradient(circle, rgba(232, 149, 95, 0.25) 0%, transparent 70%);
}

html.dark .hero__orb--2 {
  background: radial-gradient(circle, rgba(200, 120, 140, 0.18) 0%, transparent 70%);
}

html.dark .hero__orb--3 {
  background: radial-gradient(circle, rgba(160, 130, 180, 0.12) 0%, transparent 70%);
}
```

### 修改文件
- `src/components/HeroSection.astro`

---

## 执行步骤

1. 修改 `src/styles/main.scss` — 将 `.wi-content-wrap` 的 `max-width` 从 `720px` 改为 `800px`
2. 修改 `src/components/HeroSection.astro` — 优化 Hero 背景渐变和光球颜色，添加暗色模式适配
3. 构建主题并部署到 Docker 容器验证效果
