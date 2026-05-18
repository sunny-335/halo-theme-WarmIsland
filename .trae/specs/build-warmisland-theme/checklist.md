# WarmIsland 暖屿 主题 Checklist

## 基础架构

- [x] theme.yaml 元数据正确：metadata.name 为 warm-island，displayName 为 WarmIsland 暖屿，requires 为 >=2.24.0
- [x] astro.config.mjs base 路径为 /themes/warm-island
- [x] 默认 Logo.png 和 Logo.ico 已复制到 public/ 目录
- [x] package.json 包含 sass 依赖

## 设计系统

- [x] SCSS 架构完整：_variables.scss、_colors.scss、_typography.scss、_spacing.scss、_animations.scss、_mixins.scss、main.scss
- [x] 亮色模式配色正确：奶油暖白背景、日落橘强调色、焦糖棕文字、雾粉辅助、海盐灰边框
- [x] 深色模式配色正确：深色暖调版本，保持温暖感
- [x] 字体方案完整：标题层级、正文阅读舒适度、letter-spacing
- [x] 间距系统定义：留白节奏、组件间距
- [x] 动效 token 定义：呼吸动画、hover 浮动、缓动曲线

## 配置系统

- [ ] settings.yaml 包含 19 个配置分组（实际只有 18 个：basic、hero、home、style、animation、navbar、footer、article、layout、moments、photos、friends、links、comment、search、messageboard、mobile、advanced）
- [x] basic 分组支持 Logo/favicon 自定义替换
- [x] hero 分组支持文案、背景图、CTA 按钮配置
- [x] home 分组支持模块开启/关闭、排序、样式切换
- [x] style 分组支持主色调自定义
- [x] animation 分组支持动效开关
- [x] settings.yaml 中 settingName 与 theme.yaml 中一致
- [x] 模板中通过 theme.config.[group].[name] 正确读取配置

## 导航栏

- [x] 导航栏悬浮效果：position sticky、backdrop-filter blur
- [x] 胶囊圆角容器
- [x] 半透明背景
- [x] 滚动时添加阴影与背景加深
- [x] 菜单项使用 menuFinder.getPrimary() 渲染
- [x] 品牌 Logo 展示，支持 settings 自定义
- [x] 搜索按钮调用 SearchWidget.open()
- [x] 深色模式切换按钮
- [x] 柔和 hover 动效
- [x] 移动端导航菜单适配

## Hero 首屏

- [x] 超大品牌标题展示
- [x] 情绪化副标题文案
- [x] 岛屿氛围背景：柔和光斑 + 模糊层次
- [x] 呼吸动画：光斑缓慢脉动
- [x] CTA 按钮：高级圆角、柔和阴影、hover 微交互
- [x] 页面滚动引导指示器
- [x] 支持 settings 中的 Hero 配置

## 首页布局

- [x] 杂志化布局，非传统博客列表
- [x] Editorial Design 风格
- [x] 呼吸感留白
- [x] 内容节奏感
- [x] 不规则高级布局
- [x] 大图排版
- [ ] 模块根据 settings 配置控制开启/关闭与排序（开启/关闭已实现，排序未实现——模块顺序在 index.astro 中硬编码）

## 文章卡片

- [x] 大封面图展示
- [x] 柔和阴影
- [x] 半透明层次
- [x] hover 微浮动效果（translateY + 阴影加深 + 封面图 scale）
- [x] 缓动动画
- [x] 高级圆角
- [x] 情绪化摘要
- [x] 使用 thumbnail.gen() 响应式图片

## 内容页面

- [x] 文章详情页：标题、日期、分类、标签、封面图、正文排版、上下篇导航
- [x] 正文排版阅读舒适度优化
- [x] 独立页面模板正常工作
- [x] 留言板自定义页面模板已注册在 theme.yaml customTemplates.page
- [x] 归档页时间线式布局
- [x] 分类页与标签页 WarmIsland 风格
- [x] 分页导航正常工作

## 插件适配

- [x] plugin-links 友链页面专属 UI，条件渲染
- [x] plugin-photos 图库页面专属 UI，条件渲染
- [x] plugin-moments 瞬间页面专属 UI，条件渲染
- [x] plugin-friends-new 朋友圈页面专属 UI，条件渲染
- [x] plugin-comment-widget 评论区美化，保留默认输入框结构
- [x] plugin-search-widget 搜索弹层 Spotlight/Raycast 风格
- [x] 搜索快捷键 Cmd/Ctrl + K 可用
- [x] 所有插件页面使用 pluginFinder.available() 条件渲染

## 动效

- [x] 呼吸动画正常工作
- [x] hover 浮动效果正常
- [x] 页面滚动渐入效果（Intersection Observer）
- [x] 光感移动效果
- [ ] 页面过渡动画（未实现页面间过渡动画）
- [x] 动效可通过 settings 关闭

## 深色模式

- [x] 全站深色模式配色正确
- [x] 导航栏深色模式适配
- [x] 文章卡片深色模式适配
- [x] 评论区深色模式适配
- [x] 搜索组件深色模式适配
- [x] 插件页面深色模式适配
- [x] html 元素设置 data-color-scheme 属性供官方插件适配
- [x] 系统偏好跟随正常工作

## 移动端

- [x] 导航栏移动端适配
- [x] 首页移动端布局
- [x] 文章卡片移动端布局
- [x] 文章详情页移动端阅读体验
- [x] 插件页面移动端适配
- [x] 移动端保持品牌感与高级感

## SEO 与性能

- [x] 正确的 meta 标签
- [x] 语义化 HTML
- [x] 合理的标题层级
- [x] `<halo:footer />` 注入点存在于所有页面
- [ ] 关键 CSS 优先加载（未实现 critical CSS 提取策略）

## 构建验证

- [ ] `pnpm build` 构建成功（未验证）
- [ ] templates/ 目录输出正确（未验证）
- [x] 所有页面模板文件存在
- [ ] 静态资源路径正确（未验证）
