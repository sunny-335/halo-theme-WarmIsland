# Tasks

## Phase 1: 基础架构与设计系统

- [x] Task 1: 更新主题元数据与项目配置
  - [x] 更新 theme.yaml：metadata.name 改为 warm-island，displayName 改为 WarmIsland 暖屿，requires 改为 >=2.24.0，新增 settingName/configMapName/customTemplates
  - [x] 更新 astro.config.mjs：base 路径改为 /themes/warm-island
  - [x] 复制默认 Logo.png 和 Logo.ico 到 public/ 资源目录
  - [x] 更新 package.json：新增 sass 依赖

- [x] Task 2: 建立设计系统基础 — SCSS 架构与配色
  - [x] 创建 src/styles/ 目录结构：_variables.scss、_colors.scss、_typography.scss、_spacing.scss、_animations.scss、_mixins.scss、main.scss
  - [x] 定义 CSS 自定义属性：亮色模式配色（奶油暖白、日落橘、焦糖棕、雾粉、海盐灰）与深色模式配色
  - [x] 定义字体方案：标题字体、正文字体、字号层级、行高、letter-spacing
  - [x] 定义间距系统：留白节奏、组件间距
  - [x] 定义动效系统：呼吸动画、hover 浮动、页面渐隐、缓动曲线
  - [x] 定义圆角、阴影、毛玻璃等视觉 token

- [x] Task 3: 创建完整 settings.yaml 配置系统
  - [x] 创建 settings.yaml，包含 18 个分组：basic、hero、layout、style、animation、article、navbar、footer、home、moments、photos、friends、links、comment、search、messageboard、mobile、advanced
  - [x] 实现 basic 分组：站点 Logo、favicon、站点描述自定义
  - [x] 实现 hero 分组：Hero 文案、副标题、背景图、CTA 按钮文字与链接、开启/关闭
  - [x] 实现 home 分组：首页模块开启/关闭、排序、样式切换（Hero、Featured、Latest、Moments、Photos、Friends、Links、Quote、Timeline、About、Music、Message Wall）
  - [x] 实现 style 分组：主色调自定义、配色方案选择
  - [x] 实现 navbar 分组：导航栏样式配置
  - [x] 实现 footer 分组：页脚内容配置
  - [x] 实现 animation 分组：动效开启/关闭
  - [x] 实现其余分组的基础配置项

## Phase 2: 核心布局与组件

- [x] Task 4: 重写 Layout.astro 主布局
  - [x] 实现 HTML 基础结构：lang、meta、SEO 标签
  - [x] 实现深色模式初始化脚本（localStorage + 系统偏好）
  - [x] 实现 `<halo:footer />` 注入点
  - [x] 引入 SCSS 设计系统
  - [x] 实现全局平滑滚动

- [x] Task 5: 实现悬浮毛玻璃导航栏
  - [x] 创建 Navbar.astro 组件：悬浮定位、毛玻璃背景（backdrop-filter: blur）、胶囊圆角容器、半透明
  - [x] 实现滚动吸附效果：滚动时添加阴影与背景加深
  - [x] 实现导航菜单渲染：使用 menuFinder.getPrimary() 获取菜单项
  - [x] 实现品牌 Logo 展示：支持 settings 中的自定义 Logo
  - [x] 实现搜索按钮：调用 SearchWidget.open()
  - [x] 实现深色模式切换按钮
  - [x] 实现柔和 hover 动效

- [x] Task 6: 实现移动端导航
  - [x] 创建 MobileMenu.vue 组件（Vue Island）：汉堡菜单按钮、全屏/抽屉式导航、平滑动画
  - [x] 移动端导航栏适配：品牌感、沉浸式体验
  - [x] 触摸友好的交互设计

- [x] Task 7: 重写 Footer.astro 页脚
  - [x] 实现 WarmIsland 风格页脚：品牌信息、版权、社交链接
  - [x] 支持 settings 中的页脚内容配置
  - [x] 包含 `<halo:footer />` 注入点

## Phase 3: 首页模块化系统

- [x] Task 8: 实现 Hero 首屏模块
  - [x] 创建 HeroSection.astro 组件
  - [x] 实现超大品牌标题 + 情绪化副标题文案
  - [x] 实现岛屿氛围背景：柔和光斑（CSS radial-gradient 动画）、模糊层次
  - [x] 实现呼吸动画：光斑缓慢脉动
  - [x] 实现 CTA 按钮：高级圆角、柔和阴影、hover 微交互
  - [x] 实现页面滚动引导指示器
  - [x] 支持 settings 中的 Hero 配置

- [x] Task 9: 实现文章卡片组件
  - [x] 创建 PostCard.astro 组件：大封面图、柔和阴影、半透明层次、高级圆角
  - [x] 实现 hover 微浮动效果：translateY + 阴影加深 + 封面图轻微 scale
  - [x] 实现情绪化摘要展示
  - [x] 使用 thumbnail.gen() 实现响应式图片

- [x] Task 10: 实现首页 Featured 与 Latest 模块
  - [x] 创建 FeaturedSection.astro：置顶文章大图展示
  - [x] 创建 LatestSection.astro：最新文章杂志化网格布局
  - [x] 实现不规则高级布局：大图 + 小卡混排
  - [x] 实现呼吸感留白与内容节奏感

- [x] Task 11: 实现首页辅助模块
  - [x] 创建 MomentsSection.astro：瞬间模块（条件渲染，依赖 plugin-moments）
  - [x] 创建 PhotosSection.astro：图库模块（条件渲染，依赖 plugin-photos）
  - [x] 创建 FriendsSection.astro：友链模块（条件渲染，依赖 plugin-friends-new / plugin-links）
  - [x] 创建 QuoteSection.astro：语录模块
  - [x] 创建 TimelineSection.astro：时间线模块
  - [x] 创建 MessageWallSection.astro：留言墙模块

- [x] Task 12: 重写首页 index.astro
  - [x] 整合所有首页模块组件
  - [x] 根据 settings 配置控制模块开启/关闭与排序
  - [ ] 实现模块间过渡动画（未实现动态排序，模块顺序硬编码）
  - [x] 实现分页导航

## Phase 4: 内容页面

- [x] Task 13: 重写文章详情页 post.astro
  - [x] 实现文章头部：标题、发布日期、分类、标签、封面图
  - [x] 实现正文排版：prose 样式、阅读舒适度优化、杂志排版感
  - [x] 实现文章底部：上下篇导航、相关文章推荐
  - [x] 集成评论组件：`<halo:comment>` + WarmIsland 风格美化
  - [x] 实现页面渐入动画

- [x] Task 14: 重写独立页面 page.astro
  - [x] 实现页面头部与正文排版
  - [x] 集成评论组件
  - [x] 实现留言板自定义模板 page_messageboard.astro
  - [x] 在 theme.yaml customTemplates.page 中注册留言板模板

- [x] Task 15: 重写归档页 archives.astro
  - [x] 实现时间线式归档布局
  - [x] WarmIsland 风格的年份/月份分组
  - [x] 分页导航

- [x] Task 16: 重写分类与标签页
  - [x] 重写 categories.astro：WarmIsland 风格分类列表
  - [x] 重写 category.astro：分类归档 + 文章列表
  - [x] 重写 tags.astro：标签云 WarmIsland 风格
  - [x] 重写 tag.astro：标签归档 + 文章列表

## Phase 5: 插件页面专属 UI

- [x] Task 17: 实现友链页面（plugin-links）
  - [x] 创建 links.astro 页面模板
  - [x] 实现友链卡片网格：毛玻璃效果、柔和阴影、hover 微交互
  - [x] 条件渲染：`th:if="${pluginFinder.available('PluginLinks')}"`

- [x] Task 18: 实现图库页面（plugin-photos）
  - [x] 创建 photos.astro 页面模板
  - [x] 实现瀑布流 / 杂志化网格布局
  - [x] 实现灯箱预览效果
  - [x] 条件渲染：`th:if="${pluginFinder.available('PluginPhotos')}"`

- [x] Task 19: 实现瞬间页面（plugin-moments）
  - [x] 创建 moments.astro 页面模板
  - [x] 实现时间线 + 卡片形式展示
  - [x] 情绪化排版、呼吸感留白
  - [x] 条件渲染：`th:if="${pluginFinder.available('PluginMoments')}"`

- [x] Task 20: 实现朋友圈页面（plugin-friends-new）
  - [x] 创建 friends.astro 页面模板
  - [x] 实现 WarmIsland 风格卡片流
  - [x] 条件渲染：`th:if="${pluginFinder.available('PluginFriendsNew')}"`

- [x] Task 21: 美化评论组件（plugin-comment-widget）
  - [x] 创建 comment-style.scss：评论区整体氛围美化
  - [x] 评论卡片样式：毛玻璃层次、半透明背景、柔和阴影
  - [x] hover 微交互
  - [x] 深色模式适配
  - [x] 保留插件默认评论输入框结构，不破坏功能逻辑

- [x] Task 22: 美化搜索组件（plugin-search-widget）
  - [x] 创建 SearchOverlay.vue 组件（Vue Island）
  - [x] 实现 Spotlight/Raycast 风格搜索弹层：毛玻璃、模糊背景、平滑动画
  - [x] 实现快捷键呼出（Cmd/Ctrl + K）
  - [x] 情绪化搜索结果展示
  - [x] 条件渲染：`th:if="${pluginFinder.available('PluginSearchWidget')}"`

## Phase 6: 动效、深色模式与收尾

- [x] Task 23: 实现全局动效系统
  - [x] 创建 Animations.vue（Vue Island）或纯 CSS 动画方案
  - [x] 实现页面滚动渐入效果（Intersection Observer）
  - [x] 实现光感移动效果（鼠标跟随光斑）
  - [ ] 实现页面过渡动画（未实现）
  - [x] 支持动效开关（settings.animation 配置）

- [x] Task 24: 完善深色模式
  - [x] 确保所有组件深色模式适配
  - [x] 评论区深色模式适配
  - [x] 搜索组件深色模式适配
  - [x] 插件页面深色模式适配
  - [x] 设置 `data-color-scheme` 属性供官方插件适配

- [x] Task 25: 更新 Thymeleaf fragments 与资源
  - [x] 更新 public/fragments/post-list.html 为杂志化卡片布局
  - [x] 确保所有静态资源路径正确
  - [x] 添加 error 页面模板（404、500 等）

- [ ] Task 26: 构建验证与最终调整
  - [ ] 执行 `pnpm build` 确保构建成功
  - [ ] 检查所有页面模板输出正确
  - [ ] 检查 settings.yaml 在 Halo Console 中正确渲染
  - [ ] 检查移动端适配
  - [ ] 检查深色模式切换
  - [ ] 检查插件条件渲染

# Task Dependencies

- [Task 2] depends on [Task 1] (SCSS 架构需要项目配置就绪)
- [Task 3] depends on [Task 1] (settings.yaml 需要 theme.yaml 中的 settingName)
- [Task 4] depends on [Task 2] (Layout 需要设计系统)
- [Task 5] depends on [Task 4] (导航栏需要 Layout)
- [Task 6] depends on [Task 5] (移动端导航需要桌面导航)
- [Task 7] depends on [Task 4] (页脚需要 Layout)
- [Task 8] depends on [Task 4] (Hero 需要 Layout)
- [Task 9] depends on [Task 2] (卡片需要设计系统)
- [Task 10] depends on [Task 9] (Featured/Latest 需要卡片组件)
- [Task 11] depends on [Task 4] (辅助模块需要 Layout)
- [Task 12] depends on [Task 8, Task 10, Task 11] (首页整合所有模块)
- [Task 13] depends on [Task 4, Task 9] (文章页需要 Layout 和卡片)
- [Task 14] depends on [Task 4] (独立页面需要 Layout)
- [Task 15] depends on [Task 4] (归档页需要 Layout)
- [Task 16] depends on [Task 4] (分类标签页需要 Layout)
- [Task 17-22] depends on [Task 4] (插件页面需要 Layout)
- [Task 23] depends on [Task 12] (全局动效需要首页完成)
- [Task 24] depends on [Task 12, Task 13] (深色模式需要核心页面完成)
- [Task 25] depends on [Task 12] (fragments 更新需要首页完成)
- [Task 26] depends on [all previous tasks]

# Parallelizable Work

- Task 3 (settings.yaml) 可与 Task 2 (SCSS 架构) 并行
- Task 5 (导航栏) 与 Task 7 (页脚) 与 Task 8 (Hero) 可并行
- Task 9 (文章卡片) 可与 Task 8 (Hero) 并行
- Task 13-16 (内容页面) 可并行
- Task 17-22 (插件页面) 可并行
