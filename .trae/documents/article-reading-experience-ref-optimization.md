# 参考页面排版优化文章详情页阅读体验

## 参考页面分析（nxxy335.top/archives/c2KWtzf4）

通过浏览器截图和 JS 提取的样式数据，参考页面的排版特征如下：

| 属性 | 参考页面 | 我们当前 | 差异分析 |
|------|----------|----------|----------|
| 内容区域宽度 | 704px | 800px | 我们更宽，但参考页面更聚焦阅读 |
| 正文字号 | 16px | 17px (1.0625rem) | 我们略大 |
| 正文行高 | 27.6px (~1.725) | 1.85 | 我们行高更大 |
| h2 字号 | 24px | 未设置（继承） | 参考页面 h2 有明确字号 |
| h2 margin-top | 32px | 3em (~51px) | 我们标题上方留白过大 |
| h2 margin-bottom | 8px | 1.2em (~20px) | 参考页面标题下方更紧凑 |
| 段落间距 | 16px | 1.6em (~27px) | 我们段落间距偏大 |
| 图片圆角 | 0px（无圆角） | 12px | 参考页面图片无圆角 |
| 图片 margin-bottom | 0px | var(--space-xl) 2rem | 参考页面图片紧贴文字 |
| 字体 | 系统字体栈 | var(--font-sans) | 类似 |

### 参考页面的设计理念
- **紧凑但不拥挤**：段落间距适中（16px），标题上方留白适中（32px），整体节奏感好
- **内容宽度适中**：704px 是经典的阅读宽度，适合单栏长文阅读
- **标题层级清晰**：h2 有明确的 24px 字号，上方 32px 留白，下方仅 8px，让标题和下方正文紧密关联
- **图片融入正文**：无圆角，无额外间距，图片像段落一样自然融入文字流
- **行高适中**：1.725 的行高在中文阅读中既不拥挤也不松散

---

## 优化方案

### 1. 缩小内容区域宽度
- 将 `.wi-content-wrap` 的 `max-width` 从 `800px` 改为 `720px`
- 这是阅读体验最核心的改进——过宽的内容行会导致视线追踪困难

### 2. 调整正文字号和行高
- 字号：保持 `1rem`（16px），与参考页面一致
- 行高：从 `1.85` 调整为 `1.75`，与参考页面的 1.725 接近

### 3. 优化标题间距
- h2：`margin-top: 2em`（从 3em 降低），`margin-bottom: 0.5em`（从 1.2em 降低）
- h3-h6：`margin-top: 1.8em`（从 2.5em 降低），`margin-bottom: 0.5em`（从 1em 降低）
- 核心理念：标题上方留白适中，下方紧凑，让标题和正文紧密关联

### 4. 优化段落间距
- 从 `1.6em` 调整为 `1.2em`，与参考页面的 16px（1em）接近但略宽松

### 5. 优化图片样式
- 圆角：从 `12px` 改为 `8px`（保留微圆角但不突兀）
- 间距：从 `margin-block: var(--space-xl)` 改为 `margin-block: 1.5em`

### 6. 为 h2 添加明确字号
- h2：`font-size: 1.5rem`（24px）
- h3：`font-size: 1.25rem`（20px）

---

## 涉及文件

1. **`src/styles/main.scss`**：修改 `.wi-content-wrap` 的 `max-width` 从 800px 到 720px
2. **`src/pages/post.astro`**：修改 `.wi-post__body` 及子元素的排版样式

---

## 具体修改

### main.scss
```css
.wi-content-wrap {
  max-width: 720px;    /* 从 800px 缩小到 720px */
  margin: 0 auto;
  padding-inline: clamp(1rem, 3vw, 2rem);
}
```

### post.astro CSS 修改

```css
.wi-post__body {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  font-size: 1rem;           /* 从 1.0625rem 改为 1rem (16px) */
  line-height: 1.75;         /* 从 1.85 改为 1.75 */
  color: #3d3530;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.wi-post__body :is(h1, h2, h3, h4, h5, h6) {
  font-family: var(--font-sans);
  margin-top: 1.8em;         /* 从 2.5em 降低 */
  margin-bottom: 0.5em;      /* 从 1em 降低 */
  scroll-margin-top: 80px;
}

.wi-post__body h2 {
  font-size: 1.5rem;         /* 新增：明确 h2 字号 */
  margin-top: 2em;           /* 从 3em 降低 */
  margin-bottom: 0.5em;      /* 从 1.2em 降低 */
}

.wi-post__body h3 {
  font-size: 1.25rem;        /* 新增：明确 h3 字号 */
}

.wi-post__body p {
  margin-block-end: 1.2em;   /* 从 1.6em 降低 */
}

.wi-post__body img {
  border-radius: 8px;        /* 从 12px 降低 */
  margin-block: 1.5em;       /* 从 var(--space-xl) 改为 1.5em */
}
```

---

## 实施步骤

1. 修改 `src/styles/main.scss`：`.wi-content-wrap` 的 `max-width` 从 800px 改为 720px
2. 修改 `src/pages/post.astro`：调整 `.wi-post__body` 及子元素排版样式
3. 构建并部署到 Halo 容器
4. 浏览器验证效果
