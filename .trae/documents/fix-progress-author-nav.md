# 修复阅读进度条、作者信息、导航高亮 + 最终验证计划

## 问题分析

上一轮部署后浏览器验证发现三个功能 DOM 元素未渲染：
- `progressBar: false` — 阅读进度条 `#wi-reading-progress` 未出现
- `author: false` — 作者信息 `.wi-post__author` 未出现
- `navActive: false` — 导航高亮 `.wi-navbar__link--active` 未生效

### 根因分析

1. **阅读进度条**：HTML 在 `post.astro` 第 10 行，位于 `<Layout>` 内部但不在 `<article>` 内。`position: fixed` 的元素不应受布局影响。可能原因：构建产物中该 div 被正确输出，但浏览器验证脚本查找时页面可能未完全渲染，或验证脚本的选择器有误。需要检查构建产物确认。

2. **作者信息**：`th:if="${post.contributors != null and !#lists.isEmpty(post.contributors)}"` — 在 Halo WebFlux 环境中，`#lists.isEmpty()` 对 `post.contributors` 可能抛出类型转换异常（类似之前的 `#request` 问题），导致整个 `th:block` 渲染失败。需要简化条件判断，移除 `#lists.isEmpty()` 调用，改用安全访问方式。

3. **导航高亮**：`Navbar.astro` 和 `MobileMenu.astro` 中的 `<script>` 标签**缺少 `is:inline`**。没有 `is:inline` 时，Astro 会将脚本打包/转换，在 Thymeleaf 模板输出中可能无法正确内联，导致 JS 代码不执行。需要添加 `is:inline`。

## 实施步骤

### 步骤 1：修复 Navbar.astro — 添加 `is:inline`
- 将 `<script>` 改为 `<script is:inline>`
- 确保 JS 导航高亮代码在模板中正确内联输出

### 步骤 2：修复 MobileMenu.astro — 添加 `is:inline`
- 将 `<script>` 改为 `<script is:inline>`
- 确保 JS 导航高亮代码在模板中正确内联输出

### 步骤 3：修复 post.astro 作者信息条件判断
- 将 `th:if="${post.contributors != null and !#lists.isEmpty(post.contributors)}"` 改为更安全的写法
- 改为 `th:if="${post.contributors != null and !post.contributors.isEmpty()}"` 或直接用 `th:if="${post.contributors}"`（Halo 的 contributors 是 List 类型，空 List 在 Thymeleaf 中 truthy 检查可能不够，但 `#lists.isEmpty` 在 WebFlux 中可能有问题）
- 最安全的写法：`th:if="${post.contributors != null}"` + 内部用 `th:if` 过滤空列表

### 步骤 4：验证阅读进度条 HTML 输出
- 检查构建产物 `templates/post.html` 中是否包含 `wi-reading-progress` div
- 如果缺失，检查是否是 Astro 构建过程中被移除

### 步骤 5：构建并部署
- 运行 `npm run build`
- 将 templates 复制到 Docker 容器
- 重启 Halo

### 步骤 6：浏览器验证
- 使用 agent-browser 验证阅读进度条、作者信息、导航高亮是否正常工作

## 涉及文件

| 文件 | 修改内容 |
|------|---------|
| `src/components/Navbar.astro` | `<script>` → `<script is:inline>` |
| `src/components/MobileMenu.astro` | `<script>` → `<script is:inline>` |
| `src/pages/post.astro` | 修复 `post.contributors` 的 `th:if` 条件 |
