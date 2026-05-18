# 文章页 TOC 悬浮、首页两排布局、文章阅读体验优化

## 任务概述

1. 文章页目录（TOC）改为悬浮定位，不挤占文章空间，支持左侧/右侧切换（配置项控制，默认左侧）
2. 首页文章流式布局从三排改为两排
3. 优化文章详情页阅读体验（段落间距、标题留白、字体颜色等）

---

## 一、TOC 悬浮定位改造

### 现状
- TOC 在 `.wi-post__content` 中使用 CSS Grid 布局，占 200-240px 列宽
- 文章内容被挤压到剩余空间

### 改造方案
- 移除 `.wi-post__content` 的 CSS Grid 双列布局，改为单列
- TOC 使用 `position: fixed` 悬浮在页面左侧或右侧，不占文档流空间
- 通过 `theme.config.article.article_toc_position` 配置项控制左/右（默认左侧）
- TOC 宽度固定 220px，距离内容区域边缘留出间距
- 移动端（< 1280px）隐藏 TOC 或改为浮动按钮展开

### 涉及文件
- `src/pages/post.astro`：修改 HTML 结构和 CSS 样式
- `settings.yaml`：新增 `article_toc_position` 配置项

### 具体修改

#### settings.yaml
在文章配置组 `article_show_toc` 后新增：
```yaml
- $formkit: select
  name: article_toc_position
  label: 目录位置
  options:
    - label: 左侧
      value: left
    - label: 右侧
      value: right
  value: left
```

#### post.astro HTML
- 移除 `.wi-post__content` 的 Grid 包裹，TOC 和 body 恢复为平级
- TOC 添加 `th:attr="data-position=${theme.config?.article?.article_toc_position ?: 'left'}"` 属性
- JS 读取 `data-position` 决定定位方向

#### post.astro CSS
- `.wi-post__content` 移除 Grid 双列，改为单列
- `.wi-toc` 改为 `position: fixed`，根据 `data-position` 计算 `left` 或 `right`
- TOC 仅在视口宽度 ≥ 1280px 且内容区域旁有足够空间时显示
- JS 动态计算 TOC 定位坐标（基于内容区域的边缘位置）

---

## 二、首页流式布局从三排改为两排

### 现状
- `.wi-flow` 使用 `columns: 3`
- 平板端 `columns: 2`，手机端 `columns: 1`

### 改造方案
- 默认改为 `columns: 2`
- 平板端保持 `columns: 2`
- 手机端保持 `columns: 1`

### 涉及文件
- `src/pages/index.astro`：修改 `.wi-flow` 的 `columns` 值

### 具体修改
```css
.wi-flow {
  columns: 2;          /* 从 3 改为 2 */
  column-gap: var(--space-lg);
}

/* 移除平板端的覆盖，因为默认已经是 2 */
@media (max-width: 640px) {
  .wi-flow {
    columns: 1;
  }
}
```

---

## 三、文章详情页阅读体验优化

### 用户已确认的问题
1. 增加段落之间的间距，避免文字堆积
2. 增加标题上下方的留白，使章节区分更明显
3. 字体优化：正文字号适中（16px 或 17px），颜色用深灰色代替纯黑

### 我额外发现的问题（需用户确认）
4. **行高偏小**：当前 `--leading-relaxed` 为 1.75，对于中文正文可以适当增加到 1.8-1.85，提升长文阅读舒适度
5. **列表项间距偏小**：`li` 的 `margin-block-end: 0.4em` 较紧凑，建议增加到 `0.6em`
6. **代码块与正文间距不足**：`pre` 和 `code` 缺少明确的上下 margin，与正文混在一起
7. **引用块（blockquote）间距**：全局 blockquote 的 `margin-block: var(--space-lg)` 在文章内可能不够，建议在 `.wi-post__body blockquote` 中增加更多上下留白
8. **图片与正文间距**：当前 `margin-block: var(--space-lg)`（1.5rem），建议增加到 `var(--space-xl)`（2rem）

### 涉及文件
- `src/pages/post.astro`：修改 `.wi-post__body` 及子元素样式
- `src/styles/_colors.scss`：可能需要调整 `--ink` 颜色值
- `src/styles/_typography.scss`：可能需要调整 `--text-md` 和 `--leading-relaxed`

### 具体修改

#### 1. 段落间距
```css
.wi-post__body p {
  margin-block-end: 1.6em;  /* 从 1.2em 增加到 1.6em */
}
```

#### 2. 标题留白
```css
.wi-post__body :is(h1, h2, h3, h4, h5, h6) {
  margin-top: 2.5em;       /* 从 2em 增加到 2.5em */
  margin-bottom: 1em;      /* 从 0.6em 增加到 1em */
}

.wi-post__body h2 {
  margin-top: 3em;         /* h2 作为主要章节分隔，留更多空间 */
  margin-bottom: 1.2em;
}
```

#### 3. 字体优化
- 正文字号：当前 `--text-md` 为 `clamp(1.05rem, 0.99rem + 0.3vw, 1.125rem)`（约 16.8px-18px），已经偏大。建议改为 `1.0625rem`（17px）固定值或保持现有 clamp 但微调
- 正文字色：当前 `--ink` 为 `#2c2420`（深棕黑），已经不是纯黑，但可以在文章正文中使用更柔和的 `var(--ink-2)` 即 `#7a6e64`... 不对，这个太浅了。建议新增一个文章专用文字色 `--ink-body: #3d3530`，比 `--ink` 浅一点但比 `--ink-2` 深很多

```css
.wi-post__body {
  font-size: 1.0625rem;    /* 17px，比 --text-md 略大 */
  line-height: 1.85;       /* 从 var(--leading-relaxed)(1.75) 增加到 1.85 */
  color: #3d3530;          /* 深棕灰，比 --ink (#2c2420) 柔和 */
}
```

暗色模式下：
```css
html.dark .wi-post__body {
  color: #d4cdc4;          /* 比 --ink (#ede6de) 柔和 */
}
```

#### 4-8. 其他优化（需用户确认后实施）
- 行高：1.75 → 1.85
- 列表项间距：0.4em → 0.6em
- 代码块上下间距：增加 `margin-block: 1.5em`
- 引用块间距：增加到 `margin-block: 2em`
- 图片间距：1.5rem → 2rem

---

## 实施步骤

1. **settings.yaml**：新增 `article_toc_position` 配置项
2. **post.astro**：TOC 悬浮定位改造（HTML + CSS + JS）
3. **post.astro**：文章阅读体验优化（段落间距、标题留白、字体颜色等）
4. **index.astro**：首页流式布局从三排改为两排
5. **构建部署**：`npm run build` → docker cp → docker restart
6. **浏览器验证**：检查 TOC 悬浮效果、首页布局、文章阅读体验

---

## 待用户确认

以上第 4-8 项额外发现的问题，是否一并修改？还是只修改用户已确认的 1-3 项？
