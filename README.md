# WarmIsland 暖屿

暖如灯火，静如留白。暖屿以柔和的色调和舒缓的节奏回归内容本身，为记录与阅读留出一方安静从容的角落。

> 本项目由 AI 开发完成，人工仅进行部分功能测试及问题找寻

## 环境要求

- Halo **2.27.0 及以上**（页面布局契约、微信读书页面均依赖 2.27 的新能力）
- v1.2.0 起内置主题配色系统（纯 CSS 变量实现）；更低版本的 Halo 请使用主题 v1.1.x

## 特点

1. **响应式设计** — 适配桌面端与移动端，支持暗色模式，移动端使用动态视口单位适配地址栏
2. **插件兼容性** — 适配 11 款常用 Halo 插件，安装即用；提供页面布局契约，插件前台页面自动复用主题外观
3. **内置灯箱** — 主题内置 LightGallery 灯箱，支持 EXIF 信息展示；安装 lightgallery.js 插件后自动禁用
4. **可配置性** — 17 个设置分组、122 个配置项，几乎所有模块可独立开关
5. **性能优化** — 服务端字数统计（API 扩展包）、图片懒加载与响应式缩略图、首屏整屏吸附（仅首屏边界接管，内容区保留原生滚动）、Hero 离屏停绘、CSS/HTML 压缩；详见[开发指南 - 性能与滚动顺滑](docs/customize/development.md)
6. **页面布局契约** — 提供 `templates/layout.html`，插件页面不再回退到 Halo 内置布局

## 预览

![WarmIsland Preview](./WarmIsland%20Preview.webp)

## 已适配插件

| 插件名称 | 插件标识 | 适配页面路由 | 说明 |
|----------|---------|-------------|------|
| [瞬间](https://halo.run/store/apps/app-SnwWD) | `PluginMoments` | `/moments` | 瞬间动态页面，支持点赞、评论、标签筛选、顶部封面 |
| [图库](https://halo.run/store/apps/app-BmQJW) | `PluginPhotos` | `/photos` | 图片展示页面，支持分组、灯箱预览 |
| [友情链接](https://halo.run/store/apps/app-hfbQg) | `PluginLinks` | `/links` | 友链展示页面，支持随机排列、随机传送门、评论区开关 |
| [朋友圈](https://github.com/halo-sigs/plugin-friends) | `plugin-friends` | `/friends` | RSS 订阅朋友圈页面 |
| [装备管理](https://github.com/chengzhongxue/plugin-equipment) | `equipment` | `/equipments` | 装备展示页面，按分组展示，支持封面图 |
| [豆瓣](https://github.com/chengzhongxue/plugin-douban) | `plugin-douban` | `/douban` | 豆瓣记录页面，支持类型/状态/标签筛选，默认音乐；需插件 **v1.2.6+**（SQLite 数据结构） |
| [Steam 信息展示](https://github.com/Tim0x0/halo-plugin-steam) | `PluginSteam` | `/steam` | Steam 游戏库页面，含用户资料、统计数据、最近游玩、游戏库分页 |
| [微信读书](https://github.com/yeora26/halo-weread-plugin) | `halo-weread-plugin` | 自定义页面 | 书架展示页面，见下方「自定义页面模板」 |
| [记得](https://github.com/yyliucha/plugin-important-dates) | `plugin-important-dates` | `/important-dates` | 重要日期 / 牵挂的人 / 爱车双视图页面，见下方「扩展页面」 |
| [文章组件](https://github.com/acanyo/plugin-content-widgets) | `plugin-content-widgets` | 文章内 | 提示框、标签页、时间线等内容组件，主题已映射 `--xhhao-com-*` 变量，自动跟随明暗模式 |
| [API 扩展包](https://github.com/HowieHz/halo-plugin-extra-api) | `extra-api` | 全站 | 服务端字数统计、中英文混排排版、可选服务端代码高亮 |

> **注意**：插件需要单独安装，安装后主题会自动适配对应页面。若未安装某插件，对应页面或功能自动隐藏/降级，不会报错。

## 自定义页面模板

在 Halo 后台「页面 → 新建 → 自定义模板」中选择使用：

| 模板名 | 模板文件 | 说明 |
|--------|---------|------|
| 留言板 | `page_messageboard.html` | 留言墙页面，标题与副标题可配置 |
| 订阅 | `page_subscriptions.html` | 博友文章订阅动态，依赖链接管理插件的 RSS 订阅，支持分页/下滑加载与列表/网格布局 |
| 微信读书 | `weread.html` | 微信读书书架展示，依赖微信读书插件，访客免登录查看 |

## 主要功能

### 首页

- Hero 首屏：明暗双背景图、大标题/副标题独立配色、一言（支持自动刷新与淡入淡出过渡）、下滑箭头平滑滚动
- 欢迎弹窗：基于访客 IP 地理定位的欢迎提示，支持 5 种位置、自定义 API 与会话去重开关
- 滚动吸附：首屏与内容区之间滚轮/触摸自动吸附，进入内容区后恢复原生自由滚动
- 文章卡片：可配置显示字数（依赖 API 扩展包）、阅读量、分类、标签、摘要行数

### 文章

- 目录（TOC）：桌面端侧栏 + 移动端抽屉，滚动高亮、展开模式可选
- 上下篇导航：悬停反馈与方向箭头动画
- 相关推荐、分享按钮、赞赏、版权声明可独立开关
- 字数与阅读时间：优先使用 API 扩展包的服务端统计，未安装时前端计算兜底

### 全局

- 点击特效：核心价值观 / 爱心 / 烟花 / 粒子等 9 种可选
- 页脚全站统计：文章、分类、评论、访问、点赞、总字数，支持开关与统计项选择（默认开启）
- 动效：呼吸动画、滚动渐入，可独立关闭
- 备案信息：ICP 与公网安备号，公网安备自动带徽标
- 鼠标光感跟随已移除（性能考量）

## 灯箱集成

主题内置 LightGallery 灯箱，为图片提供放大预览功能，并支持 EXIF 信息展示。

### lightgallery.js 插件兼容

如安装 [lightgallery.js](https://www.lightgalleryjs.com/) 灯箱插件，主题内置灯箱将自动禁用，改由插件接管灯箱功能。以下为 lightgallery.js 插件的路径匹配规则和 DOM 节点选择器：

| 页面 | 路径匹配规则 | 匹配区域 DOM 节点 |
|------|-------------|-------------------|
| 文章详情页 | `/archives/*` | `.wi-post__body` |
| 瞬间页 | `/moments` | `.wi-moments-page__content` |
| 图库页 | `/photos` | `.wi-photos-page__grid` |
| 自定义页面 | 用户自定义 | `.wi-page__body` |

> **注意**：自定义页面的路径匹配由用户自行设定，此处仅提供 DOM 节点选择器 `.wi-page__body`。

## 安装

1. 下载主题最新 Release 的 ZIP 包
2. 进入 Halo 后台 → 主题管理 → 安装主题 → 上传 ZIP 包
3. 安装完成后点击「启用」

> **升级后首页 404「资源不存在 / Template index was not found」**：说明上传的 ZIP 里没有 `templates/`
> 模板文件（从源码仓库打包时漏了构建步骤）。请换用完整安装包重新上传，详见 [FAQ 安装相关](docs/faq.md)。
>
> **升级后如果整站没了样式**：Halo 页面缓存或前置反向代理里可能还留着上一版本的 HTML，
> 它引用的 CSS 文件名带内容哈希，升级后已被删除，请求会直接 500。
> 先在 Halo 后台执行一次「清理缓存」（并刷新 CDN / Nginx 缓存）即可。
> 主题从 v1.2.1 起会把历史版本的哈希资源一并发进安装包，旧 HTML 也不会请求失败。
>
> **升级主题或修改配色后，部分页面不生效**：如果安装了「页面静态缓存」插件，
> 它只随文章变更自动刷新，主题层的变更需要手动点一次「刷新页面缓存」，
> 详见 [FAQ：升级主题或修改配色后部分页面不生效](docs/faq.md#升级主题或修改配色后部分页面的新样式配色不生效)。

或从源码构建：

```bash
git clone https://git.nxxy335.top/nxxy335/halo-theme-WarmIsland.git
cd halo-theme-WarmIsland
pnpm install
pnpm release    # build → snapshot → package
```

`pnpm build` 只生成 `templates/`（模板 + 静态资源），不会产出 ZIP；
安装包由 `pnpm package` 生成到 `dist/warm-island-<version>.zip`。

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式（监听文件变化，自动构建到 templates/）
pnpm dev

# 构建（输出到 templates/，并自动合并历史版本的静态资源）
pnpm build

# 把本次构建的哈希资源快照进 compat/assets（发版前必做）
pnpm snapshot

# 打包 dist/warm-island-<version>.zip
pnpm package

# 点击特效脚本冒烟测试
pnpm smoke
```

发版流程：`pnpm release`（等价于 `pnpm build` → `pnpm snapshot` → `pnpm package`），
并把 `compat/assets` 的新增文件一起提交。`pnpm package` 会校验模板、资源目录与版本号一致性，
产物缺失时直接报错，避免打出不含 `templates/` 的空壳安装包。

### 目录结构

```
├── src/
│   ├── components/    # 组件（导航、页脚、Hero、弹窗、特效等）
│   ├── layouts/       # Layout.astro（含页面布局契约渲染模式）
│   ├── pages/         # 页面模板（构建后输出到 templates/）
│   └── styles/        # SCSS 样式（正文样式在 _content.scss，全局生效）
├── compat/
│   └── assets/        # 历史版本哈希静态资源，构建时合并进 templates/assets
├── scripts/           # 构建后置、资源快照、打包、冒烟测试
├── templates/         # 构建产物，Halo 实际加载的模板
├── settings.yaml      # 后台设置项定义
└── theme.yaml         # 主题清单与自定义页面模板注册
```

### 主题开发注意事项

- **静态资源文件名带内容哈希**：升级后旧文件被删除，被缓存的 HTML 仍会请求旧文件名并触发 500，
  所以每个版本的哈希文件都要留一份（见 `compat/assets` 与 `pnpm snapshot`）
- **Thymeleaf 字符串字面量必须加单引号**：`th:text="'文本'"`，裸中文遇到逗号/空格/emoji 会导致页面 500
- **`th:attr` 只用简单表达式**（取属性、Elvis 默认值、三元、拼接、等值比较），表达式对象方法调用会被受限求值器拒绝
- **凡是与后台开关绑定的模板表达式都要给默认值**：`?: '默认值'`，配置未落库时属性会被整体移除，功能会静默失效
- **正文样式必须写在全局样式表**（`src/styles/_content.scss`）：Astro scoped 样式对 Thymeleaf 运行时注入的内容无效
- **内联脚本统一加 `th:inline="none"`**：避免 Thymeleaf 解析脚本中的 `[[` / `[(` / `${}`
- **新插入的动画元素要强制回流**（读一次 `offsetWidth`）：否则初态与终态在同一帧被合并，transition 不触发
- 修改主题外观无需单独维护 `layout.astro`：页面布局契约复用 `Layout.astro`，构建时自动生成

## 技术栈

- [Halo](https://halo.run) 2.27+
- [Astro](https://astro.build) 6（构建输出 Thymeleaf 模板）
- [Thymeleaf](https://www.thymeleaf.org) 模板引擎
- [Sass](https://sass-lang.com/) 样式

## 许可

[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)

## 图标来源

本主题使用的图标来自以下开源项目：

| 来源 | 协议 | 用途 |
| --- | --- | --- |
| [Font Awesome](https://fontawesome.com/) Free v7.2.0 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) / [SIL OFL 1.1](https://scripts.sil.org/OFL) | QQ 分享图标 |
| [Simple Icons](https://simpleicons.org/) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | 微博、X、Facebook、Telegram 分享图标 |
| [Feather Icons](https://feathericons.com/) | [MIT](https://opensource.org/licenses/MIT) | 导航、界面交互图标 |
| [Halo](https://halo.run/) | [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) | 主题内置图标 |
