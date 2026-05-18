# WarmIsland 主题修复与改进计划

## 概述
修复 BUG、改进硬编码中文字符串、添加暗色模式切换过渡动画、增加首页模块化布局、首页文章列表改为单栏布局（文字左图片右）。

---

## 步骤 1：暗色模式切换过渡动画

**状态**：CSS 已添加到 Layout.astro，需要修改切换逻辑

### 1.1 修改 ThemeSwitcher.vue
- 文件：`src/components/ThemeSwitcher.vue`
- 在 `toggle()` 函数中：
  1. 切换前添加 `document.documentElement.classList.add("wi-theme-transition")`
  2. 执行切换
  3. 300ms 后移除 `wi-theme-transition` 类

```javascript
function toggle() {
  document.documentElement.classList.add("wi-theme-transition");
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("wi-theme", isDark.value ? "dark" : "light");
  setTimeout(() => {
    document.documentElement.classList.remove("wi-theme-transition");
  }, 300);
}
```

### 1.2 修改 MobileMenu.astro
- 文件：`src/components/MobileMenu.astro`
- 在 themeBtn 点击事件中添加同样的过渡逻辑

```javascript
themeBtn?.addEventListener("click", () => {
  document.documentElement.classList.add("wi-theme-transition");
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("wi-theme", isDark ? "dark" : "light");
  document.documentElement.setAttribute("data-color-scheme", isDark ? "dark" : "light");
  setTimeout(() => {
    document.documentElement.classList.remove("wi-theme-transition");
  }, 300);
});
```

---

## 步骤 2：首页文章列表改为单栏布局（文字左图片右）

**文件**：`src/pages/index.astro`

### 2.1 修改 HTML 结构
将 `.wi-flow__card` 从纵向布局改为横向布局：
- 文字区域（`.wi-flow__body`）在左侧
- 图片区域（`.wi-flow__cover`）在右侧
- 无封面图时文字占满宽度

当前结构：
```html
<a class="wi-flow__card">
  <div class="wi-flow__cover">...</div>  <!-- 图片在上 -->
  <div class="wi-flow__body">...</div>    <!-- 文字在下 -->
</a>
```

改为：
```html
<a class="wi-flow__card">
  <div class="wi-flow__body">...</div>    <!-- 文字在左 -->
  <div class="wi-flow__cover">...</div>   <!-- 图片在右 -->
</a>
```

### 2.2 修改 CSS 样式
- `.wi-flow`：从 `columns: 2` 改为单栏布局（`display: flex; flex-direction: column;`）
- `.wi-flow__card`：改为 `flex-direction: row`，横向排列
- `.wi-flow__body`：`flex: 1`，占据左侧空间
- `.wi-flow__cover`：固定宽度（如 240px），`flex-shrink: 0`
- `.wi-flow__image`：宽高固定，`object-fit: cover`
- 移动端响应式：`flex-direction: column`，封面图全宽

---

## 步骤 3：改进硬编码中文字符串

### 3.1 在 settings.yaml 中添加可配置标签字段

**文件**：`settings.yaml`

在 `home` 组中添加：
```yaml
- $formkit: text
  name: home_label_newer
  label: 分页-较新标签
  value: 较新
- $formkit: text
  name: home_label_older
  label: 分页-较旧标签
  value: 较旧
- $formkit: text
  name: home_label_loading
  label: 无限滚动-加载中文案
  value: 加载中...
- $formkit: text
  name: home_label_all_loaded
  label: 无限滚动-全部加载文案
  value: 已加载全部文章
- $formkit: text
  name: home_featured_title
  label: 精选模块标题
  value: 精选
- $formkit: text
  name: home_latest_title
  label: 最新文章模块标题
  value: 最新文章
- $formkit: text
  name: home_timeline_title
  label: 时间线模块标题
  value: 时间线
- $formkit: text
  name: home_friends_title
  label: 友链模块标题
  value: 友链
- $formkit: text
  name: home_message_wall_title
  label: 留言墙模块标题
  value: 留言墙
- $formkit: text
  name: home_label_view_all
  label: 查看全部标签
  value: 查看全部
- $formkit: text
  name: home_label_no_posts
  label: 暂无文章文案
  value: 暂无文章。
- $formkit: text
  name: home_label_post_count
  label: 文章数量文案（{total}为占位符）
  value: 共 {total} 篇文章
```

在 `basic` 组中添加：
```yaml
- $formkit: text
  name: label_search
  label: 搜索按钮标签
  value: 搜索
- $formkit: text
  name: label_theme_switch
  label: 主题切换标签
  value: 切换主题
- $formkit: text
  name: label_archives_title
  label: 归档页标题
  value: 归档
```

### 3.2 修改模板文件中的硬编码字符串

| 文件 | 硬编码字符串 | 替换为 Thymeleaf 表达式 |
|------|-------------|----------------------|
| `index.astro` | `较新` | `th:text="${theme.config?.home?.home_label_newer ?: '较新'}"` |
| `index.astro` | `较旧` | `th:text="${theme.config?.home?.home_label_older ?: '较旧'}"` |
| `index.astro` | `加载中...` | `th:text="${theme.config?.home?.home_label_loading ?: '加载中...'}"` |
| `index.astro` | `已加载全部文章` | `th:text="${theme.config?.home?.home_label_all_loaded ?: '已加载全部文章'}"` |
| `index.astro` (JS) | `已加载全部文章` | 通过 data 属性传递配置值 |
| `MobileMenu.astro` | `搜索` | `th:text="${theme.config?.basic?.label_search ?: '搜索'}"` |
| `MobileMenu.astro` | `切换主题` | `th:text="${theme.config?.basic?.label_theme_switch ?: '切换主题'}"` |
| `FeaturedSection.astro` | `精选` | `th:text="${theme.config?.home?.home_featured_title ?: '精选'}"` |
| `LatestSection.astro` | `最新文章` | `th:text="${theme.config?.home?.home_latest_title ?: '最新文章'}"` |
| `LatestSection.astro` | `较新`/`较旧` | 同 index.astro |
| `MomentsSection.astro` | `查看全部` | `th:text="${theme.config?.home?.home_label_view_all ?: '查看全部'}"` |
| `PhotosSection.astro` | `查看全部` | `th:text="${theme.config?.home?.home_label_view_all ?: '查看全部'}"` |
| `TimelineSection.astro` | `时间线` | `th:text="${theme.config?.home?.home_timeline_title ?: '时间线'}"` |
| `FriendsSection.astro` | `友链` | `th:text="${theme.config?.home?.home_friends_title ?: '友链'}"` |
| `MessageWallSection.astro` | `留言墙` | `th:text="${theme.config?.home?.home_message_wall_title ?: '留言墙'}"` |
| `archives.astro` | `归档` | `th:text="${theme.config?.basic?.label_archives_title ?: '归档'}"` |
| `archives.astro` | `较新`/`较旧` | 同 index.astro |
| `archives.astro` | `暂无文章。` | `th:text="${theme.config?.home?.home_label_no_posts ?: '暂无文章。'}"` |
| `category.astro` | `较新`/`较旧` | 同 index.astro |
| `category.astro` | `暂无文章。` | 同 archives.astro |
| `tag.astro` | `较新`/`较旧` | 同 index.astro |
| `tag.astro` | `暂无文章。` | 同 archives.astro |

### 3.3 index.astro 中 JS 硬编码字符串处理
在无限滚动 JS 中，"已加载全部文章" 是通过 JS 动态创建 DOM 的，需要通过 data 属性传递配置值：
- 在 sentinel 元素上添加 `data-all-loaded-text` 属性
- JS 中读取该属性值

---

## 步骤 4：首页模块化布局

### 4.1 在 settings.yaml 的 `home` 组中添加模块开关

```yaml
- $formkit: switch
  name: home_moments_enabled
  label: 首页显示瞬间模块
  value: false
- $formkit: switch
  name: home_photos_enabled
  label: 首页显示图库模块
  value: false
- $formkit: switch
  name: home_quote_enabled
  label: 首页显示语录模块
  value: false
- $formkit: switch
  name: home_timeline_enabled
  label: 首页显示时间线模块
  value: false
- $formkit: switch
  name: home_friends_enabled
  label: 首页显示友链模块
  value: false
- $formkit: switch
  name: home_message_wall_enabled
  label: 首页显示留言墙模块
  value: false
- $formkit: textarea
  name: home_quote_content
  label: 首页语录内容
  if: "$get(home_quote_enabled).value === true"
```

### 4.2 修改 index.astro 引入所有模块组件

在 `index.astro` 中：
1. 导入所有 Section 组件
2. 按照布局顺序排列：HeroSection → FeaturedSection → 文章列表 → QuoteSection → MomentsSection → PhotosSection → TimelineSection → FriendsSection → MessageWallSection
3. 每个 Section 组件内部已有 `th:if` 条件控制显隐

```astro
---
import Layout from "../layouts/Layout.astro";
import HeroSection from "../components/HeroSection.astro";
import FeaturedSection from "../components/FeaturedSection.astro";
import QuoteSection from "../components/QuoteSection.astro";
import MomentsSection from "../components/MomentsSection.astro";
import PhotosSection from "../components/PhotosSection.astro";
import TimelineSection from "../components/TimelineSection.astro";
import FriendsSection from "../components/FriendsSection.astro";
import MessageWallSection from "../components/MessageWallSection.astro";
---
```

---

## 步骤 5：构建部署与验证

1. 运行 `npm run build` 构建主题
2. Docker 部署到 Halo 实例
3. 使用浏览器验证：
   - 暗色模式切换是否有过渡动画
   - 首页文章列表是否为单栏（文字左图片右）
   - 首页模块是否正确显示/隐藏
   - 硬编码字符串是否已替换为可配置项
   - 移动端响应式是否正常

---

## 实施顺序

1. **步骤 1** - 暗色模式过渡动画（ThemeSwitcher.vue + MobileMenu.astro）
2. **步骤 2** - 首页文章列表单栏布局（index.astro）
3. **步骤 3** - 硬编码字符串改进（settings.yaml + 所有模板文件）
4. **步骤 4** - 首页模块化布局（settings.yaml + index.astro）
5. **步骤 5** - 构建部署验证
