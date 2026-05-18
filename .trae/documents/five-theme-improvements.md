# 主题五大改进实施计划

## 任务一：Footer 配置组缺失

### 问题
[Footer.astro](file:///c:/Users/Zhang/Documents/Halo/WarmIsland/src/components/Footer.astro) 引用了 `theme.config?.footer?.footer_copyright`、`footer_icp`、`footer_socials`、`footer_show_powered`、`footer_show_theme`、`footer_custom_html` 等配置项，但 [settings.yaml](file:///c:/Users/Zhang/Documents/Halo/WarmIsland/settings.yaml) 中没有定义 footer 配置组，用户在后台无法设置页脚内容。

### 修改文件
- `settings.yaml` — 新增 footer 配置组

### 具体改动
在 settings.yaml 的 `comment` 配置组之后新增 `footer` 配置组：

```yaml
- group: footer
  label: 页脚
  formSchema:
    - $formkit: text
      name: footer_copyright
      label: 版权信息（留空则使用默认格式 © 年份 站点标题）
    - $formkit: text
      name: footer_icp
      label: ICP 备案号
    - $formkit: repeater
      name: footer_socials
      label: 社交链接
      children:
        - $formkit: text
          name: platform
          label: 平台名称
        - $formkit: text
          name: icon
          label: 图标类名（如 fa-brands fa-github）
        - $formkit: url
          name: url
          label: 链接地址
    - $formkit: switch
      name: footer_show_powered
      label: 显示 "Powered by Halo"
      value: true
    - $formkit: switch
      name: footer_show_theme
      label: 显示主题版本
      value: true
    - $formkit: code
      name: footer_custom_html
      label: 自定义 HTML（统计代码等）
      language: html
```

---

## 任务二：SEO Meta 标签严重缺失

### 问题
[Layout.astro](file:///c:/Users/Zhang/Documents/Halo/WarmIsland/src/layouts/Layout.astro) 的 `<head>` 中只有全站 description，缺少 og 标签、canonical URL、RSS 链接等。文章页应使用文章摘要作为 description。

### 修改文件
- `src/layouts/Layout.astro` — 在 `<head>` 中添加 SEO meta 标签
- `src/pages/post.astro` — 在 head slot 中添加文章页专属 SEO 标签
- `src/pages/page.astro` — 在 head slot 中添加页面专属 SEO 标签

### 具体改动

#### Layout.astro — 全局 SEO 标签
在现有 `<meta name="description">` 之后添加：

```html
<meta name="keywords" th:content="${site.seo?.keywords}" />
<link rel="canonical" th:href="${site.url}" />
<link rel="alternate" type="application/rss+xml" th:title="${site.title}" th:href="@{/feed.xml}" />
<meta property="og:site_name" th:content="${site.title}" />
<meta property="og:type" content="website" />
<meta property="og:url" th:content="${site.url}" />
<meta property="og:title" th:content="${site.title}" />
<meta property="og:description" th:content="${site.seo?.description}" />
<meta name="twitter:card" content="summary" />
```

#### post.astro — 文章页专属 SEO 标签
在 `<Fragment slot="head">` 中，`<title>` 之后添加：

```html
<meta name="description" th:content="${post.spec.excerpt ?: site.seo?.description}" />
<link rel="canonical" th:href="${post.status.permalink}" />
<meta property="og:type" content="article" />
<meta property="og:title" th:content="${post.spec.title}" />
<meta property="og:description" th:content="${post.spec.excerpt ?: site.seo?.description}" />
<meta property="og:url" th:href="@{${post.status.permalink}}" />
<meta property="og:image" th:if="${post.spec.cover}" th:content="${post.spec.cover}" />
<meta property="article:published_time" th:content="${post.spec.publishTime}" />
<meta name="twitter:card" content="summary_large_image" th:if="${post.spec.cover}" />
<meta name="twitter:card" content="summary" th:unless="${post.spec.cover}" />
<meta name="twitter:title" th:content="${post.spec.title}" />
<meta name="twitter:description" th:content="${post.spec.excerpt ?: site.seo?.description}" />
<meta name="twitter:image" th:if="${post.spec.cover}" th:content="${post.spec.cover}" />
```

#### page.astro — 自定义页面专属 SEO 标签
在 `<Fragment slot="head">` 中，`<title>` 之后添加：

```html
<meta name="description" th:content="${singlePage.spec.excerpt ?: site.seo?.description}" />
<link rel="canonical" th:href="${singlePage.status.permalink}" />
<meta property="og:type" content="website" />
<meta property="og:title" th:content="${singlePage.spec.title}" />
<meta property="og:description" th:content="${singlePage.spec.excerpt ?: site.seo?.description}" />
<meta property="og:url" th:href="@{${singlePage.status.permalink}}" />
```

---

## 任务三：导航当前页面无高亮

### 问题
[Navbar.astro](file:///c:/Users/Zhang/Documents/Halo/WarmIsland/src/components/Navbar.astro) 中 CSS 已定义 `.wi-navbar__link--active` 样式，但模板中没有为当前页面的导航链接添加 active 类名。

### 修改文件
- `src/components/Navbar.astro`

### 具体改动
在导航链接 `<a>` 标签上添加 `th:classappend` 条件判断，通过比较当前请求路径与菜单项链接来判断是否高亮：

```html
<a
  th:each="menuItem : ${menu.menuItems}"
  th:href="@{${menuItem.status.href}}"
  th:target="${menuItem.spec.target}"
  th:text="${menuItem.status.displayName}"
  class="wi-navbar__link"
  th:classappend="${#strings.equals(#request.requestURI, menuItem.status.href)} ? 'wi-navbar__link--active'"
>
</a>
```

同时需要在 MobileMenu.astro 中也添加同样的高亮逻辑。MobileMenu.astro 第 16-22 行的导航链接结构与 Navbar 相同：

```html
<a
  th:each="menuItem : ${menu.menuItems}"
  th:href="@{${menuItem.status.href}}"
  th:target="${menuItem.spec.target}"
  th:text="${menuItem.status.displayName}"
  class="wi-mobile-menu__link"
  th:classappend="${#strings.equals(#request.requestURI, menuItem.status.href)} ? 'wi-mobile-menu__link--active'"
></a>
```

并在 MobileMenu.astro 的 `<style>` 中添加 active 样式：

```css
.wi-mobile-menu__link--active {
  color: var(--accent);
  background: var(--bg-raised);
  font-weight: 600;
}
```

---

## 任务四：移动端文章目录不可用（浮动目录按钮）

### 问题
[post.astro](file:///c:/Users/Zhang/Documents/Halo/WarmIsland/src/pages/post.astro) 中 TOC 仅在 `min-width: 1280px` 时显示，移动端没有任何替代方案。

### 修改文件
- `src/pages/post.astro`

### 具体改动

#### 1. 添加移动端浮动 TOC 按钮
在文章 `<article>` 内添加一个浮动按钮，仅在 `max-width: 1279px` 时显示：

```html
<button
  th:if="${theme.config?.article?.article_show_toc ?: true}"
  class="wi-toc-fab"
  id="wi-toc-fab"
  type="button"
  aria-label="打开目录"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
</button>
```

#### 2. 添加移动端 TOC 抽屉面板
在浮动按钮之后添加一个从底部滑出的抽屉面板：

```html
<div
  th:if="${theme.config?.article?.article_show_toc ?: true}"
  class="wi-toc-drawer"
  id="wi-toc-drawer"
>
  <div class="wi-toc-drawer__overlay"></div>
  <div class="wi-toc-drawer__panel">
    <div class="wi-toc-drawer__header">
      <span class="wi-toc-drawer__title">目录</span>
      <button class="wi-toc-drawer__close" type="button" aria-label="关闭目录">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <nav class="wi-toc-drawer__nav" id="wi-toc-drawer-nav"></nav>
  </div>
</div>
```

#### 3. 添加 CSS 样式
```css
.wi-toc-fab {
  display: none;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--rule);
  background: var(--bg-raised);
  color: var(--ink-2);
  cursor: pointer;
  z-index: 20;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.wi-toc-fab:hover {
  color: var(--accent);
  border-color: var(--accent);
}

@media (max-width: 1279px) {
  .wi-toc-fab {
    display: inline-flex;
  }
}

.wi-toc-drawer {
  display: none;
}

.wi-toc-drawer--open {
  display: block;
}

.wi-toc-drawer__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 50;
}

.wi-toc-drawer__panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 60vh;
  background: var(--bg);
  border-top: 1px solid var(--rule);
  border-radius: 16px 16px 0 0;
  padding: 1.25rem;
  z-index: 51;
  overflow-y: auto;
  transform: translateY(0);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.wi-toc-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--rule);
}

.wi-toc-drawer__title {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--ink);
}

.wi-toc-drawer__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  color: var(--ink-3);
  cursor: pointer;
}

.wi-toc-drawer__close:hover {
  color: var(--accent);
}

.wi-toc-drawer__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wi-toc-drawer__nav .wi-toc__link {
  font-size: var(--text-sm);
  padding: 6px 0;
}
```

#### 4. 添加 JS 逻辑
在现有 `<script is:inline>` 中，TOC 构建逻辑之后，添加移动端抽屉逻辑：

```javascript
var tocFab = document.getElementById("wi-toc-fab");
var tocDrawer = document.getElementById("wi-toc-drawer");
var tocDrawerNav = document.getElementById("wi-toc-drawer-nav");

if (tocFab && tocDrawer && tocDrawerNav && tocNav) {
  tocDrawerNav.innerHTML = tocNav.innerHTML;

  tocFab.addEventListener("click", function () {
    tocDrawer.classList.add("wi-toc-drawer--open");
    document.body.style.overflow = "hidden";
  });

  var drawerClose = tocDrawer.querySelector(".wi-toc-drawer__close");
  var drawerOverlay = tocDrawer.querySelector(".wi-toc-drawer__overlay");

  function closeDrawer() {
    tocDrawer.classList.remove("wi-toc-drawer--open");
    document.body.style.overflow = "";
  }

  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  tocDrawerNav.querySelectorAll(".wi-toc__link").forEach(function (link) {
    link.addEventListener("click", function () {
      closeDrawer();
    });
  });
}
```

---

## 任务五：404/500 页面深色模式不生效

### 问题
[404.html](file:///c:/Users/Zhang/Documents/Halo/WarmIsland/public/error/404.html) 和 [500.html](file:///c:/Users/Zhang/Documents/Halo/WarmIsland/public/error/500.html) 是纯静态页面，没有读取 localStorage 中的主题偏好，首次直接访问错误页面时深色模式不会生效。

### 修改文件
- `public/error/404.html`
- `public/error/500.html`

### 具体改动
在两个文件的 `<head>` 中，`<style>` 标签之前，添加与 Layout.astro 相同的主题检测脚本（简化版，仅检测 localStorage 和系统偏好）：

```html
<script>
  (function () {
    var stored = localStorage.getItem("wi-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = stored === "dark" || (!stored && prefersDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  })();
</script>
```

这段脚本会在页面渲染前检测用户的主题偏好并添加 `dark` 类名，确保 CSS 变量正确切换。

---

## 执行顺序

1. **settings.yaml** — 新增 footer 配置组
2. **Layout.astro** — 添加全局 SEO meta 标签
3. **post.astro** — 添加文章页 SEO 标签 + 移动端 TOC 浮动按钮和抽屉
4. **page.astro** — 添加页面 SEO 标签
5. **Navbar.astro** — 添加导航当前页面高亮
6. **MobileMenu.astro** — 添加导航当前页面高亮（需先确认结构）
7. **404.html** — 添加深色模式检测脚本
8. **500.html** — 添加深色模式检测脚本
9. 构建并部署到 Docker 验证
