# WarmIsland 暖屿 主题 Spec

## Why

Halo 默认主题及社区主题多为传统博客布局，缺乏品牌气质与情绪温度。WarmIsland 暖屿旨在打造一座"深夜里温暖、安静、治愈的小岛"——一个具有独特品牌记忆点、杂志化排版、情绪化 UI 的高端生活方式博客主题，而非普通博客模板。

## What Changes

- 基于 `halo-sigs/theme-astro-starter` 模板，从 0 重构全部页面与组件
- **BREAKING**: 完全替换现有 Astro 组件结构、样式系统、页面布局
- 新增 Hero 首屏模块（超大标题 + 情绪文案 + 岛屿氛围背景 + 呼吸动画）
- 新增杂志化首页布局（Editorial Design、不规则高级布局、大图排版）
- 新增悬浮毛玻璃导航栏（Apple/Raycast 风格、胶囊圆角、滚动吸附）
- 新增文章卡片设计（大封面图、毛玻璃、hover 微浮动、高级圆角）
- 新增低饱和暖色配色系统（奶油暖白、日落橘、焦糖棕、雾粉、海盐灰）
- 新增杂志排版字体方案与阅读舒适度优化
- 新增克制柔和动效系统（呼吸动画、hover 浮动、页面渐隐、光感移动）
- 新增移动端原生 App 级体验重新设计
- 新增 6 个 Halo 插件专属 UI 适配（友链、图库、瞬间、朋友圈、评论、搜索）
- 新增留言板自定义页面模板
- 新增完整 settings.yaml 配置系统（19 个分组、模块化首页系统）
- 新增深色模式完整适配
- 新增默认 Logo 与 favicon 资源
- 更新 theme.yaml 元数据与兼容版本至 Halo >= 2.24.0

## Impact

- Affected specs: 全部页面模板、全部组件、全部样式、主题配置系统
- Affected code:
  - `theme.yaml` — 元数据、customTemplates、requires 版本
  - `settings.yaml` — 新增（原模板无此文件）
  - `astro.config.mjs` — base 路径、插件配置
  - `src/layouts/Layout.astro` — 完全重写
  - `src/components/Header.astro` — 完全重写为悬浮毛玻璃导航
  - `src/components/Footer.astro` — 完全重写
  - `src/components/` — 新增大量组件
  - `src/pages/index.astro` — 完全重写为杂志化首页
  - `src/pages/post.astro` — 完全重写
  - `src/pages/page.astro` — 完全重写
  - `src/pages/` — 新增多个页面模板
  - `src/styles/` — 完全重写为 SCSS 模块化架构
  - `public/` — 新增资源文件与 Thymeleaf fragments
  - `package.json` — 新增依赖（SCSS 等）

---

## ADDED Requirements

### Requirement: 品牌识别系统

主题 SHALL 具有极强的品牌识别度，用户一眼即可辨识"WarmIsland 暖屿"的品牌气质。

#### Scenario: 品牌首屏印象
- **WHEN** 用户首次访问 WarmIsland 站点
- **THEN** 第一屏即传达"深夜、温暖、安静、治愈"的品牌氛围，包含品牌名称、情绪化文案、岛屿氛围视觉元素

#### Scenario: 品牌一致性
- **WHEN** 用户浏览站内任意页面
- **THEN** 所有页面保持统一的品牌视觉语言（配色、字体、动效、留白节奏）

---

### Requirement: Hero 首屏模块

系统 SHALL 提供全屏 Hero 区域作为首页第一视觉焦点。

#### Scenario: Hero 展示
- **WHEN** 用户访问首页
- **THEN** 显示全屏 Hero 区域，包含：超大品牌标题、情绪化副标题文案、岛屿氛围背景（柔和光斑 + 模糊层次）、呼吸动画、高级 CTA 按钮、页面滚动引导

#### Scenario: Hero 可配置
- **WHEN** 管理员在后台 settings 中配置 Hero 文案、背景图、按钮文字
- **THEN** 前端 Hero 区域相应更新

---

### Requirement: 杂志化首页布局

首页 SHALL 采用 Editorial Design 杂志化布局，而非传统博客列表。

#### Scenario: 首页模块化展示
- **WHEN** 用户访问首页
- **THEN** 首页由可配置模块组成：Hero、Featured（置顶文章）、Latest（最新文章）、Moments（瞬间）、Photos（图库）、Friends（友链）、Links（链接）、Quote（语录）、Timeline（时间线）、About（关于）、Music（音乐）、Message Wall（留言墙）
- **AND** 每个模块可在后台独立开启/关闭、排序、配置样式

#### Scenario: 文章展示
- **WHEN** 首页展示文章列表
- **THEN** 采用杂志化大图排版，具有呼吸感留白、内容节奏感、不规则高级布局，而非密集信息流或普通卡片堆叠

---

### Requirement: 悬浮毛玻璃导航栏

导航栏 SHALL 采用悬浮毛玻璃设计，具有 Apple/Raycast/Linear/Arc 级别的高级导航体验。

#### Scenario: 导航栏展示
- **WHEN** 用户浏览任意页面
- **THEN** 导航栏呈现：悬浮效果、毛玻璃背景、胶囊圆角容器、半透明、滚动吸附顶部、柔和 hover 动效

#### Scenario: 移动端导航
- **WHEN** 用户在移动端访问
- **THEN** 导航栏适配为移动端菜单，保持品牌感与高级感

#### Scenario: 导航栏可配置
- **WHEN** 管理员在后台配置导航 Logo、菜单项
- **THEN** 导航栏相应更新，支持自定义 Logo 替换

---

### Requirement: 文章卡片设计

文章卡片 SHALL 采用杂志化高级设计。

#### Scenario: 卡片展示
- **WHEN** 文章以卡片形式展示
- **THEN** 卡片具有：大封面图、柔和阴影、半透明层次、毛玻璃效果、hover 微浮动、缓动动画、高级圆角、情绪化摘要

#### Scenario: 卡片交互
- **WHEN** 用户 hover 文章卡片
- **THEN** 卡片产生柔和上浮效果，封面图轻微放大，阴影加深

---

### Requirement: 低饱和暖色配色系统

主题 SHALL 使用低饱和暖色体系。

#### Scenario: 亮色模式配色
- **WHEN** 主题处于亮色模式
- **THEN** 使用奶油暖白背景、日落橘强调色、焦糖棕文字色、雾粉辅助色、海盐灰边框色

#### Scenario: 深色模式配色
- **WHEN** 主题处于深色模式
- **THEN** 配色自动切换为深色暖调版本，保持温暖感而非冰冷科技感

#### Scenario: 配色可自定义
- **WHEN** 管理员在后台 settings 中修改主色调
- **THEN** 前端配色系统相应更新

---

### Requirement: 杂志排版字体方案

主题 SHALL 采用高级生活杂志 / 日系 Editorial 级别的排版方案。

#### Scenario: 标题排版
- **WHEN** 页面渲染标题
- **THEN** 标题具有明确的视觉层级、合适的字重与字号、letter-spacing 调整、杂志排版感

#### Scenario: 正文阅读
- **WHEN** 用户阅读文章正文
- **THEN** 正文具有舒适的行高、段间距、留白节奏、呼吸感，阅读体验优于传统博客

---

### Requirement: 克制柔和动效系统

主题 SHALL 实现克制、柔和、高级的动效。

#### Scenario: 呼吸动画
- **WHEN** 页面加载完成
- **THEN** Hero 区域背景光斑呈现缓慢呼吸动画，营造"活着"的氛围感

#### Scenario: 页面过渡
- **WHEN** 用户在页面间导航
- **THEN** 页面切换呈现柔和渐隐渐显过渡

#### Scenario: 卡片交互动效
- **WHEN** 用户 hover 交互元素
- **THEN** 产生柔和缓动动画（浮动、阴影变化、颜色过渡），而非廉价炫酷动画

#### Scenario: 动效可配置
- **WHEN** 管理员在后台关闭动效
- **THEN** 所有动画效果禁用，保持静态展示

---

### Requirement: 移动端原生 App 级体验

移动端 SHALL 重新设计为原生 App 级体验，而非简单缩放。

#### Scenario: 移动端导航
- **WHEN** 用户在移动端访问
- **THEN** 导航栏变为沉浸式移动菜单，具有品牌感

#### Scenario: 移动端阅读
- **WHEN** 用户在移动端阅读文章
- **THEN** 排版适配移动端，保持高级感、品牌感、情绪感

#### Scenario: 移动端卡片
- **WHEN** 移动端展示文章卡片
- **THEN** 卡片布局适配竖屏，保持大图氛围与留白节奏

---

### Requirement: 插件适配 — plugin-links（友链）

主题 SHALL 完整适配 plugin-links 友链插件，并提供专属 UI。

#### Scenario: 友链页面展示
- **WHEN** 用户访问友链页面且 plugin-links 已安装
- **THEN** 友链以 WarmIsland 风格的卡片网格展示，具有毛玻璃效果、柔和阴影、hover 微交互

---

### Requirement: 插件适配 — plugin-photos（图库）

主题 SHALL 完整适配 plugin-photos 图库插件，并提供专属 UI。

#### Scenario: 图库页面展示
- **WHEN** 用户访问图库页面且 plugin-photos 已安装
- **THEN** 图库以瀑布流 / 杂志化网格展示，具有大图预览、柔和过渡、灯箱效果

---

### Requirement: 插件适配 — plugin-moments（瞬间）

主题 SHALL 完整适配 plugin-moments 瞬间插件，并提供专属 UI。

#### Scenario: 瞬间页面展示
- **WHEN** 用户访问瞬间页面且 plugin-moments 已安装
- **THEN** 瞬间以时间线 + 卡片形式展示，具有情绪化排版、呼吸感留白

---

### Requirement: 插件适配 — plugin-friends-new（朋友圈）

主题 SHALL 完整适配 plugin-friends-new 朋友圈插件，并提供专属 UI。

#### Scenario: 朋友圈页面展示
- **WHEN** 用户访问朋友圈页面且 plugin-friends-new 已安装
- **THEN** 朋友圈以 WarmIsland 风格的卡片流展示，具有品牌统一感

---

### Requirement: 插件适配 — plugin-comment-widget（评论组件）

主题 SHALL 适配 plugin-comment-widget，评论区风格与 WarmIsland 保持统一。

#### Scenario: 评论区展示
- **WHEN** 文章/页面下方显示评论区
- **THEN** 评论区具有：毛玻璃层次、半透明背景、柔和阴影、hover 微交互、深色模式适配

#### Scenario: 评论功能兼容
- **WHEN** 用户使用评论功能
- **THEN** 保留插件默认评论输入框结构，不破坏插件功能逻辑与兼容性

---

### Requirement: 插件适配 — plugin-search-widget（搜索组件）

主题 SHALL 适配 plugin-search-widget，搜索体验设计为"WarmIsland 的内容探索空间"。

#### Scenario: 搜索触发
- **WHEN** 用户点击搜索按钮或使用快捷键（Cmd/Ctrl + K）
- **THEN** 弹出 Spotlight/Raycast 风格的悬浮搜索层，具有毛玻璃弹层、模糊背景、平滑动画

#### Scenario: 搜索结果展示
- **WHEN** 搜索结果返回
- **THEN** 结果以情绪化方式展示，保持 WarmIsland 品牌风格

---

### Requirement: 留言板自定义页面模板

主题 SHALL 提供留言板自定义页面模板。

#### Scenario: 留言板模板注册
- **WHEN** 主题安装后
- **THEN** 在 theme.yaml 的 customTemplates.page 中注册留言板模板

#### Scenario: 留言板页面展示
- **WHEN** 用户访问使用留言板模板的页面
- **THEN** 显示 WarmIsland 风格的留言板，具有情绪化排版、评论组件集成

---

### Requirement: 完整 settings.yaml 配置系统

主题 SHALL 基于 Halo 2.x 的 FormKit Schema 提供完整配置系统。

#### Scenario: 配置分组
- **WHEN** 管理员进入主题设置页面
- **THEN** 可见以下配置分组：basic、hero、layout、style、animation、article、navbar、footer、home、moments、photos、friends、links、comment、search、messageboard、mobile、advanced

#### Scenario: 首页模块化配置
- **WHEN** 管理员在 home 分组中配置首页模块
- **THEN** 可对每个模块进行：开启/关闭、排序、独立配置、样式切换

#### Scenario: 配置生效
- **WHEN** 管理员保存配置
- **THEN** 前端通过 `theme.config.[group].[name]` 读取配置并相应渲染

---

### Requirement: 默认主题资源

主题 SHALL 包含默认 Logo 与 favicon 资源。

#### Scenario: 默认资源加载
- **WHEN** 主题首次安装
- **THEN** 使用默认 Logo（Logo.png）与 favicon（Logo.ico）

#### Scenario: 资源可替换
- **WHEN** 管理员在后台 settings 中上传自定义 Logo/favicon
- **THEN** 前端使用自定义资源替代默认资源

---

### Requirement: Astro 架构

主题 SHALL 基于 Astro 架构实现现代化开发。

#### Scenario: 组件化开发
- **WHEN** 开发主题功能
- **THEN** 使用 Astro Components + Vue Islands 架构，动态组件拆分，SCSS 模块化

#### Scenario: 构建输出
- **WHEN** 执行 `astro build`
- **THEN** 输出到 `templates/` 目录，静态资源输出到 `templates/assets/`

---

### Requirement: 深色模式

主题 SHALL 完整支持深色模式。

#### Scenario: 深色模式切换
- **WHEN** 用户切换深色模式
- **THEN** 全站配色切换为深色暖调版本，所有组件（导航、卡片、评论区、搜索等）适配深色模式

#### Scenario: 系统偏好跟随
- **WHEN** 用户未手动设置主题模式
- **THEN** 主题跟随系统深色/亮色偏好

---

### Requirement: Halo 版本兼容

主题 SHALL 兼容 Halo >= 2.24.0。

#### Scenario: 版本声明
- **WHEN** 主题安装
- **THEN** theme.yaml 中 `spec.requires` 声明为 `">=2.24.0"`

#### Scenario: API 使用
- **WHEN** 主题调用 Halo API
- **THEN** 使用 Halo 2.24+ 最新主题开发规范和 API，不使用过时 API

---

### Requirement: SEO 与性能

主题 SHALL 具备良好的 SEO 与首屏性能。

#### Scenario: SEO 基础
- **WHEN** 页面渲染
- **THEN** 包含正确的 meta 标签、语义化 HTML、合理的标题层级

#### Scenario: 首屏性能
- **WHEN** 用户首次访问
- **THEN** 首屏内容快速渲染，关键 CSS 内联，非关键资源延迟加载

---

## MODIFIED Requirements

### Requirement: 主题元数据

theme.yaml 元数据更新为 WarmIsland 暖屿品牌信息。

- `metadata.name`: `warm-island`
- `spec.displayName`: `WarmIsland 暖屿`
- `spec.requires`: `>=2.24.0`
- `spec.settingName`: `warm-island-setting`
- `spec.configMapName`: `warm-island-configMap`
- `spec.customTemplates.page`: 新增留言板模板

---

## REMOVED Requirements

### Requirement: 原始 Astro Starter 模板 UI

**Reason**: 完全替换为 WarmIsland 品牌化 UI，原始模板 UI 不再使用
**Migration**: 所有原始组件、样式、页面布局将被完全重写，无需迁移
