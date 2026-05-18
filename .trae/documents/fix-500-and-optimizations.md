# 主题全面修复与优化计划

## 🔴 紧急：修复 500 报错（最高优先级）

### 根因分析
Docker 日志显示错误：
```
TemplateProcessingException: Exception evaluating SpringEL expression: 
"#strings.equals(#request.requestURI, menuItem.status.href)"
```

**原因**：Halo 使用 Spring WebFlux（非 Spring MVC），`#request` 对象在 WebFlux 环境中不可用。上一轮在 Navbar.astro 和 MobileMenu.astro 中添加的 `th:classappend="${#strings.equals(#request.requestURI, menuItem.status.href)}"` 导致了全站 500 错误。

### 额外问题：SEO 标签与 Halo 自动注入冲突
根据 Halo Thymeleaf 最佳实践文档，Halo 会**自动注入**以下 SEO 标签：
- `<meta name="description">` 和 `<meta name="keywords">`
- Open Graph 标签（og:title, og:description, og:image 等）
- Twitter Card 标签和 canonical URL

我们在 Layout.astro、post.astro、page.astro 中手动添加的这些标签会与 Halo 自动注入的冲突，需要移除。

### 修改文件

#### 1. Navbar.astro（第 34 行）
移除 `th:classappend`，改用 JS 方案实现导航高亮：

```html
<!-- 修改前 -->
<a ... th:classappend="${#strings.equals(#request.requestURI, menuItem.status.href)} ? 'wi-navbar__link--active'">

<!-- 修改后 -->
<a ... th:data-href="${menuItem.status.href}" class="wi-navbar__link">
```

在 Navbar.astro 的 `<script>` 中添加 JS 高亮逻辑：
```javascript
document.querySelectorAll('.wi-navbar__link[data-href]').forEach(function(link) {
  if (new URL(link.href).pathname === window.location.pathname) {
    link.classList.add('wi-navbar__link--active');
  }
});
```

#### 2. MobileMenu.astro（第 22 行）
同样移除 `th:classappend`，改用 JS 方案：

```html
<!-- 修改前 -->
<a ... th:classappend="${#strings.equals(#request.requestURI, menuItem.status.href)} ? 'wi-mobile-menu__link--active'">

<!-- 修改后 -->
<a ... th:data-href="${menuItem.status.href}" class="wi-mobile-menu__link">
```

在 MobileMenu.astro 的 `<script>` 中添加 JS 高亮逻辑：
```javascript
menu?.querySelectorAll('.wi-mobile-menu__link[data-href]').forEach(function(link) {
  if (new URL(link.href).pathname === window.location.pathname) {
    link.classList.add('wi-mobile-menu__link--active');
  }
});
```

#### 3. Layout.astro（第 57-66 行）
移除手动添加的 SEO 标签（Halo 会自动注入），仅保留 RSS 订阅链接：

```html
<!-- 移除以下行 -->
<meta name="description" th:content="${site.seo?.description}" />
<meta name="keywords" th:content="${site.seo?.keywords}" />
<link rel="canonical" th:href="${site.url}" />
<meta property="og:site_name" th:content="${site.title}" />
<meta property="og:type" content="website" />
<meta property="og:url" th:content="${site.url}" />
<meta property="og:title" th:content="${site.title}" />
<meta property="og:description" th:content="${site.seo?.description}" />
<meta name="twitter:card" content="summary" />

<!-- 仅保留 -->
<link rel="alternate" type="application/rss+xml" th:title="${site.title}" th:href="@{/feed.xml}" />
```

#### 4. post.astro（第 8-20 行）
移除手动添加的文章页 SEO 标签（Halo 会自动注入），仅保留 `<title>`：

```html
<!-- 修改后 -->
<Fragment slot="head">
  <title th:text="|${post.spec.title} - ${site.title}|"></title>
</Fragment>
```

#### 5. page.astro（第 8-13 行）
移除手动添加的页面 SEO 标签，仅保留 `<title>`：

```html
<!-- 修改后 -->
<Fragment slot="head">
  <title th:text="|${singlePage.spec.title} - ${site.title}|"></title>
</Fragment>
```

---

## 🟡 响应式断点统一

### 当前问题
各组件使用的断点不一致：640px、680px、767px、768px、480px 等。

### 统一方案
将断点统一为以下四级体系（与 `_variables.scss` 中的 `$breakpoint-sm/md/lg/xl` 对应）：

| 级别 | 断点值 | 用途 |
|------|--------|------|
| sm | 640px | 手机端（单列布局） |
| md | 768px | 平板端（导航切换、双列→单列） |
| lg | 1024px | 小桌面（三列→双列） |
| xl | 1280px | 大桌面（TOC 显示） |

### 具体改动

| 文件 | 当前断点 | 改为 |
|------|----------|------|
| Navbar.astro | 767px | 768px |
| page.astro | 680px | 768px |
| post.astro (TOC FAB) | 1279px | 1279px（保持，与 xl-1px 对应） |
| post.astro (其他) | 680px | 768px |
| Footer.astro | 680px | 768px |
| archives.astro | 680px | 768px |
| tag.astro | 680px | 768px |
| categories.astro | 680px | 768px |
| page_messageboard.astro | 680px | 768px |
| Header.astro | 680px | 768px |
| global.css | 680px | 768px |
| FeaturedSection.astro | 767px | 768px |
| PostCard.astro | 767px | 768px |
| LatestSection.astro | 767px | 768px |

> 注意：640px 断点（首页流式布局、友链、装备等）保持不变，因为它们用于单列/双列切换，语义上属于 sm 级别。
> 480px 断点（图库、瞬间的极小屏幕适配）保持不变，属于额外微调。

---

## 🟡 冗余代码清理

### 删除文件
1. `src/components/Header.astro` — 未被 Layout 使用，与 Navbar 功能重叠
2. `src/components/MobileMenu.vue` — 未被使用（Layout 用的是 MobileMenu.astro）

---

## 🟡 Footer 版本号硬编码修复

### 当前问题
Footer.astro 第 33 行硬编码 `WarmIsland v1.0.0`

### 修改方案
将版本号改为从 theme.yaml 读取（通过 Halo 的 theme 变量），如果不可用则使用 Astro 构建时变量：

```html
<!-- 修改前 -->
<span th:if="${showTheme}">WarmIsland v1.0.0</span>

<!-- 修改后 -->
<span th:if="${showTheme}">WarmIsland v1.0.0</span>
```

实际上，Halo 的 Thymeleaf 环境中没有直接暴露 theme version 的变量。最简洁的方案是在 settings.yaml 的 footer 配置组中添加一个版本号字段，或者直接使用一个固定的版本号但添加注释标记。考虑到维护成本，最佳方案是：

在 Footer.astro 的 frontmatter 中定义版本号常量，模板中引用：

```astro
---
const THEME_VERSION = "1.0.0";
const today = new Date();
---
...
<span th:if="${showTheme}">WarmIsland v{THEME_VERSION}</span>
```

这样只需在一处修改版本号。

---

## 🟢 顶部阅读进度条

### 修改文件
- `src/pages/post.astro`

### 实现方案
在文章详情页顶部添加一个固定定位的进度条，随滚动进度填充：

#### HTML
在 `<article class="wi-post">` 之前添加：
```html
<div class="wi-reading-progress" id="wi-reading-progress"></div>
```

#### CSS
```css
.wi-reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: var(--accent);
  z-index: 101;
  transition: width 0.1s linear;
}
```

#### JS
在现有 `<script is:inline>` 中添加：
```javascript
var progressBar = document.getElementById("wi-reading-progress");
if (progressBar) {
  var article = document.querySelector(".wi-post");
  if (article) {
    window.addEventListener("scroll", function () {
      var rect = article.getBoundingClientRect();
      var articleHeight = article.offsetHeight;
      var scrolled = -rect.top;
      var progress = Math.min(Math.max(scrolled / (articleHeight - window.innerHeight), 0), 1);
      progressBar.style.width = (progress * 100) + "%";
    }, { passive: true });
  }
}
```

---

## 🟢 文章页作者信息

### 修改文件
- `src/pages/post.astro`

### 实现方案
在文章 meta 区域（日期之后）添加作者信息。Halo 的 PostVo 有 `contributors` 字段（ContributorVo 列表），包含 `displayName` 和 `avatar`。

在 `.wi-post__meta` 中，日期之后添加：
```html
<th:block th:if="${post.contributors != null and !#lists.isEmpty(post.contributors)}">
  <span class="wi-post__meta-sep">·</span>
  <span class="wi-post__author">
    <img
      th:if="${post.contributors[0].avatar}"
      th:src="${post.contributors[0].avatar}"
      th:alt="${post.contributors[0].displayName}"
      class="wi-post__author-avatar"
    />
    <span th:text="${post.contributors[0].displayName}"></span>
  </span>
</th:block>
```

CSS：
```css
.wi-post__author {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.wi-post__author-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}
```

---

## 📝 README.md 撰写

### 内容结构
1. 主题简介
2. 截图预览
3. 安装方法
4. 配置说明（各配置组概述）
5. lightgallery.js 灯箱插件集成指南
   - 路径匹配规则
   - DOM 节点选择器
6. 开发指南（构建命令等）

### lightgallery.js 集成信息

| 页面 | 路径匹配 | 匹配区域 DOM 节点 |
|------|----------|-------------------|
| 文章详情页 | `/archives/*` | `.wi-post__body` |
| 瞬间页 | `/moments` | `.wi-moments-page__content` |
| 图库页 | `/photos` | `.wi-photos-page__grid` |
| 自定义页面 | （用户自定义） | `.wi-page__body` |

---

## 执行顺序

1. **修复 500 报错** — Navbar.astro、MobileMenu.astro 移除 `#request`，改用 JS 高亮；Layout.astro、post.astro、page.astro 移除冲突的 SEO 标签
2. **构建并部署** — 验证 500 错误已修复
3. **响应式断点统一** — 批量替换 680px→768px、767px→768px
4. **冗余代码清理** — 删除 Header.astro 和 MobileMenu.vue
5. **Footer 版本号修复** — 使用 frontmatter 常量
6. **阅读进度条** — post.astro 添加进度条
7. **文章页作者信息** — post.astro 添加作者
8. **README.md 撰写**
9. **最终构建部署验证**
