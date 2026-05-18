# 实施计划：TOC 优化、图片描述样式、灯箱修复、Logo 修复、瞬间评论计数修复

## 任务概览

| # | 任务 | 优先级 |
|---|------|--------|
| 1 | TOC 优化：子标题缩进 + 当前项高亮 + 删除全目录展开/收起 + 二级目录折叠/展开 | 高 |
| 2 | 文章图片描述（figcaption）颜色 #545164 + 字号缩小 | 中 |
| 3 | 图库页灯箱插件图片无法点击大图预览 | 高 |
| 4 | 主题 Logo 在后台主题详情/管理器不显示 | 中 |
| 5 | 瞬间页评论计数修复 | 高 |

---

## 任务 1：TOC 优化

### 现状分析

当前 TOC 实现（[post.astro](file:///c:/Users/Zhang/Documents/Halo/WarmIsland/src/pages/post.astro)）：

1. **子标题缩进**：已有 `wi-toc__link--h2/h3/h4/h5/h6` 类，h2 无缩进，h3 12px，h4 24px 等。但缩进量较小，层级感不够明显。
2. **当前项高亮**：已有 `wi-toc__link--active` 类（`color: var(--accent); font-weight: 600;`），但高亮效果不够明显，缺少视觉锚点。
3. **全目录展开/收起**：当前 `wi-toc__toggle` 按钮控制整个目录的展开/收起（`wi-toc__nav--collapsed` 类），需要删除此功能。
4. **二级目录折叠/展开**：当前没有此功能，需要新增。当进入某一个一级分类（h2）时展开其下属的二级分类（h3-h6），其他一级分类的子项折叠。

### 修改方案

#### 步骤 1.1：增强子标题缩进

修改 CSS 中的缩进量，使层级更清晰：

```css
.wi-toc__link--h2 { padding-left: 0; }
.wi-toc__link--h3 { padding-left: 16px; }
.wi-toc__link--h4 { padding-left: 32px; }
.wi-toc__link--h5 { padding-left: 48px; }
.wi-toc__link--h6 { padding-left: 64px; }
```

同时为 h2 级目录项添加左侧竖线指示器，增强层级感。

#### 步骤 1.2：增强当前阅读项高亮样式

改进 `wi-toc__link--active` 样式：
- 左侧添加竖线指示器（accent 色）
- 背景色微调（半透明 accent）
- 字重加粗
- 平滑过渡动画

```css
.wi-toc__link--active {
  color: var(--accent);
  font-weight: 600;
  border-left: 2px solid var(--accent);
  padding-left: calc(原缩进 - 2px);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}
```

#### 步骤 1.3：删除全目录展开/收起功能

1. 删除 `wi-toc__header` 中的 `wi-toc__toggle` 按钮
2. 删除 JS 中 `toggleBtn` 相关的事件监听代码
3. 删除 CSS 中 `wi-toc__nav--collapsed` 相关样式

#### 步骤 1.4：增加二级目录折叠/展开功能

1. 修改 JS 中 TOC 生成逻辑，将 h2 作为一级目录项，h3-h6 作为二级目录项
2. 每个 h2 项下方创建一个可折叠的子容器
3. 默认只展开当前活跃 h2 的子项，其他 h2 的子项折叠
4. 点击 h2 项可手动展开/折叠其子项
5. 当滚动位置变化时，自动展开当前活跃 h2 的子项

HTML 结构改为：
```html
<div class="wi-toc__group" data-h2="wi-heading-0">
  <a class="wi-toc__link wi-toc__link--h2" href="#wi-heading-0">一级标题</a>
  <div class="wi-toc__sub">
    <a class="wi-toc__link wi-toc__link--h3" href="#wi-heading-1">二级标题</a>
    ...
  </div>
</div>
```

CSS：
```css
.wi-toc__sub {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.3s ease, opacity 0.2s ease;
}

.wi-toc__group--active .wi-toc__sub,
.wi-toc__group--expanded .wi-toc__sub {
  max-height: 500px;
  opacity: 1;
}
```

JS 逻辑：
- 生成 TOC 时，将 h3-h6 归入前一个 h2 的子组
- IntersectionObserver 检测到活跃标题时，自动展开对应的 h2 组
- 点击 h2 项时，切换该组的展开/折叠状态

---

## 任务 2：文章图片描述样式

### 现状分析

Halo 文章编辑器中，图片可以添加描述（alt/caption），渲染后通常为 `<figure>` + `<figcaption>` 结构。当前主题没有为 `figcaption` 定义样式，使用默认样式。

### 修改方案

在 [post.astro](file:///c:/Users/Zhang/Documents/Halo/WarmIsland/src/pages/post.astro) 的 `<style>` 中添加 `figcaption` 样式：

```css
.wi-post__body figcaption {
  color: #545164;
  font-size: 0.875rem;
  text-align: center;
  margin-top: -0.8em;
  margin-bottom: 1.2em;
  line-height: 1.5;
}

html.dark .wi-post__body figcaption {
  color: #8a8494;
}
```

字号 `0.875rem`（14px）比正文字号 `1rem`（16px）小一点。

---

## 任务 3：图库页灯箱插件图片无法点击大图预览

### 现状分析

当前图库页 [photos.astro](file:///c:/Users/Zhang/Documents/Halo/WarmIsland/src/pages/photos.astro) 中，图片结构为：

```html
<div class="wi-photos-page__wrap">
  <img th:src="${photo.spec.cover ?: photo.spec.url}" class="wi-photos-page__image" />
  <div class="wi-photos-page__overlay">...</div>
</div>
```

lightgallery.js 插件的工作原理：
1. 需要在匹配区域的 DOM 节点上初始化 `lightGallery()`
2. 默认情况下，lightGallery 会查找 `<a>` 标签包裹的 `<img>`，`<a>` 的 `href` 属性作为大图 URL
3. 或者使用 `selector` 选项指定点击目标

**问题原因**：当前图片没有用 `<a>` 标签包裹，lightGallery 无法识别可点击的图片。`wi-photos-page__overlay` 遮罩层也可能拦截点击事件。

### 修改方案

将每个图片项的 `<img>` 用 `<a>` 标签包裹，`href` 指向原图 URL：

```html
<div class="wi-photos-page__wrap">
  <a th:href="${photo.spec.url}" class="wi-photos-page__link">
    <img th:src="${photo.spec.cover ?: photo.spec.url}" class="wi-photos-page__image" />
  </a>
  <div class="wi-photos-page__overlay">...</div>
</div>
```

CSS 添加：
```css
.wi-photos-page__link {
  display: block;
  text-decoration: none;
}
```

这样 lightGallery 插件配置路径匹配 `/photos`、DOM 节点 `.wi-photos-page__grid`、selector `a` 即可正常工作。

---

## 任务 4：主题 Logo 在后台不显示

### 现状分析

当前 [theme.yaml](file:///c:/Users/Zhang/Documents/Halo/WarmIsland/theme.yaml) 中：

```yaml
spec:
  logo: /themes/warm-island/public/logo.png
```

问题分析：
1. Halo 2.x 主题的静态资源在 `templates/` 目录下，通过 `/themes/{theme-name}/assets/` 路径访问
2. `public/` 目录下的文件在构建时被复制到 `templates/` 根目录
3. `logo.png` 在构建后位于 `templates/logo.png`
4. 路径 `/themes/warm-island/public/logo.png` 不正确，因为 `public/` 不是资源访问路径的一部分

### 修改方案

将 `theme.yaml` 中的 logo 路径改为正确的资源路径：

```yaml
spec:
  logo: /themes/warm-island/assets/logo.png
```

或者如果 logo 在 templates 根目录下，使用：

```yaml
spec:
  logo: /themes/warm-island/logo.png
```

需要验证 Halo 2.x 主题的静态资源访问路径规则。根据 vite-plugin-halo-theme 的构建输出，`public/` 目录下的文件被复制到 `templates/` 根目录，而 `templates/assets/` 下是构建产物。所以正确的路径应该是 `/themes/warm-island/logo.png`。

---

## 任务 5：瞬间页评论计数修复

### 现状分析

上一轮已修复了点赞计数问题（upvote API group 从 `moment.moment.halo.run` 改为 `moment.halo.run`），并添加了 `loadMomentStats()` 客户端函数通过 `/apis/api.moment.halo.run/v1alpha1/moments` API 获取统计数据。

当前 `loadMomentStats()` 函数已正确获取 `stats.approvedComment` 并更新 DOM。但评论计数仍然显示 0，可能原因：

1. 评论确实为 0（没有审核通过的评论）
2. `moment.stats?.approvedComment` 在 Thymeleaf 渲染时为 null，`?: 0` 兜底显示 0
3. 客户端 `loadMomentStats()` 可能未正确执行

### 修改方案

1. 使用浏览器验证评论数据是否存在
2. 确认 `loadMomentStats()` 函数是否正确更新了评论计数
3. 如果评论计数在评论提交后没有实时更新，需要在评论提交后重新调用 `loadMomentStats()`

---

## 执行顺序

1. 修改 theme.yaml 修复 Logo 路径
2. 修改 post.astro：TOC 优化 + figcaption 样式
3. 修改 photos.astro：图片添加 `<a>` 标签包裹
4. 验证瞬间页评论计数
5. 构建部署
6. 浏览器验证
