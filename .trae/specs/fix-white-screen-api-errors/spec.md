# WarmIsland 主题白屏及 API 错误彻底修复 Spec

## Why
主题中使用了 Halo 2.24.2 不存在的 Finder API 方法（`momentFinder.list()`、`photoFinder.listGroups()`、`photoFinder.listByGroupName()`），以及 Thymeleaf 不支持的 Groovy 闭包语法（`.groupBy { ... }`），导致模板渲染时抛出 `SpelEvaluationException`，HTTP 响应流中断，产生 `ERR_INCOMPLETE_CHUNKED_ENCODING 200` 白屏错误。同时 `MomentSpec` 中不存在 `media` 字段，媒体数据实际在 `content.medium` 中。

## What Changes
- **修复 `momentFinder.list()` 调用**：改为 `momentFinder.list(1, 50)`（返回 `Mono<ListResult<MomentVo>>`），需通过 `.items` 获取列表
- **修复 `photoFinder.listGroups()` 调用**：改为 `photoFinder.groupBy()`（返回 `Flux<PhotoGroupVo>`），`PhotoGroupVo` 已包含 `photos` 列表
- **修复 `photoFinder.listByGroupName()` 调用**：改为 `photoFinder.listBy(groupName)`（返回 `Flux<PhotoVo>`），或直接使用 `groupBy()` 返回的 `PhotoGroupVo.photos`
- **修复 `moment.spec.media` 引用**：改为 `moment.spec.content.medium`（`MomentContent.medium` 是 `List<MomentMedia>`）
- **修复 `TimelineSection.astro` 中的 Groovy 闭包语法**：`.groupBy { it.spec.publishTime?.getYear() }` 在 Thymeleaf 中不可用，需改用 `postFinder.list({page: 1, size: 50})` 获取文章后手动按年分组
- **修复 `Navbar.astro` 和 `Header.astro` 中的 `menuItem.spec.target?.value`**：改为 `menuItem.spec.target`（`target` 是字符串而非对象）

## Impact
- Affected code:
  - `src/pages/moments.astro` - 瞬间页面（白屏根因）
  - `src/pages/photos.astro` - 图库页面（白屏根因）
  - `src/components/MomentsSection.astro` - 首页瞬间区块（首页白屏根因）
  - `src/components/PhotosSection.astro` - 首页图库区块
  - `src/components/TimelineSection.astro` - 首页时间线区块
  - `src/components/Navbar.astro` - 导航栏 target 属性
  - `src/components/Header.astro` - 头部导航 target 属性

## ADDED Requirements

### Requirement: 正确使用 momentFinder API
系统 SHALL 使用 `momentFinder.list(page, size)` 替代不存在的 `momentFinder.list()`，返回 `ListResult` 对象需通过 `.items` 获取列表数据。

#### Scenario: 瞬间页面正常渲染
- **WHEN** 用户访问 `/moments`
- **THEN** 页面正常显示瞬间列表，无 `ERR_INCOMPLETE_CHUNKED_ENCODING` 错误

#### Scenario: 首页瞬间区块正常渲染
- **WHEN** 用户访问首页且启用了瞬间区块
- **THEN** 首页正常显示，瞬间区块展示最近的瞬间

### Requirement: 正确使用 photoFinder API
系统 SHALL 使用 `photoFinder.groupBy()` 替代不存在的 `photoFinder.listGroups()`，`PhotoGroupVo` 已包含 `photos` 列表，无需额外调用 `listByGroupName`。

#### Scenario: 图库页面正常渲染
- **WHEN** 用户访问 `/photos`
- **THEN** 页面正常显示图库分组和照片，无白屏错误

### Requirement: 正确引用 Moment 媒体数据
系统 SHALL 使用 `moment.spec.content.medium` 替代不存在的 `moment.spec.media`，`MomentMedia` 对象包含 `type`、`url`、`originType` 字段。

#### Scenario: 瞬间包含媒体时正常显示
- **WHEN** 瞬间包含图片媒体
- **THEN** 图片正常显示在瞬间卡片中

### Requirement: 不使用 Thymeleaf 不支持的语法
系统 SHALL 不在 Thymeleaf 表达式中使用 Groovy 闭包语法（如 `.groupBy { ... }`），TimelineSection 需改用 `postFinder.list({...})` 获取文章列表。

#### Scenario: 首页时间线区块正常渲染
- **WHEN** 用户访问首页且启用了时间线区块
- **THEN** 首页正常显示，时间线区块按年展示文章

### Requirement: 正确引用菜单项 target 属性
系统 SHALL 使用 `menuItem.spec.target` 替代 `menuItem.spec.target?.value`，`target` 是字符串类型。

#### Scenario: 导航链接在新标签页打开
- **WHEN** 菜单项配置了在新标签页打开
- **THEN** 链接正确设置 target 属性
