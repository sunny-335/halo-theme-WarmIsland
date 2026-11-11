# WarmIsland 暖屿

暖如灯火，静如留白。暖屿以柔和的色调和舒缓的节奏回归内容本身，为记录与阅读留出一方安静从容的角落。

> 本项目使用 AI 辅助开发。开发者已按 Halo 主题规范完成代码审查、构建产物核验、外部资源审计与主要模板的回归检查清单（见[验证与回归测试](#验证与回归测试)）；主题不加载远程脚本、不动态下载代码、不进行未披露的数据收集。

## 环境要求

- Halo **2.27.0 及以上**（页面布局契约、微信读书页面均依赖 2.27 的新能力）
- v1.2.0 起内置主题配色系统（纯 CSS 变量实现）；更低版本的 Halo 请使用主题 v1.1.x

## 特点

1. **响应式设计** — 适配桌面端与移动端，支持暗色模式，移动端使用动态视口单位适配地址栏
2. **插件兼容性** — 适配 10 款常用 Halo 插件，安装即用；提供页面布局契约，插件前台页面自动复用主题外观
3. **内置灯箱** — 主题内置 LightGallery 灯箱（GPLv3，随主题自托管打包），支持 EXIF 信息展示；安装 lightgallery.js 插件后自动禁用
4. **可配置性** — 17 个设置分组、126 个配置项，几乎所有模块可独立开关
5. **性能优化** — 服务端字数统计（API 扩展包）、图片懒加载与响应式缩略图、首屏整屏吸附（仅首屏边界接管，内容区保留原生滚动）、Hero 离屏停绘、CSS/HTML 压缩；详见[开发指南 - 性能与滚动顺滑](https://nxxy335.top/WarmIsland/customize/development.html)
6. **零默认外部请求** — 所有脚本、样式、字体、图标、句子库、主题图标均随主题自托管，默认不向任何第三方发起自动请求；详见[外部资源与隐私](#外部资源与隐私)
7. **页面布局契约** — 提供 `templates/layout.html`，插件页面不再回退到 Halo 内置布局

## 预览

![WarmIsland Preview](https://git.nxxy335.top/nxxy335/halo-theme-WarmIsland/raw/branch/main/WarmIsland%20Preview.webp)

> 预览图同时随安装包分发（包根目录 `WarmIsland Preview.webp`），离线查看制品时也可打开。

## 外部资源与隐私

本章节对应 [Halo 应用市场审核指南](https://docs.halo.run/developer-guide/app-store/app-review-guidelines) 1.4 / 4.4.4 / 5.1，逐项说明服务名称、用途、数据类型、默认状态与关闭方法。

### 默认行为

**默认配置下，主题不会自动向任何第三方服务发起请求。** 页面加载的 CSS、JS、字体（LXGW WenKai 本地分片）、图标、主题 Logo、一言句子库全部来自站点自身的 `/themes/warm-island/assets/`，不经过 CDN，也不使用 `preconnect` / `dns-prefetch`。已移除的远程依赖见下方[自托管与许可](#自托管与许可)。

### 逐项说明

| 服务 / 资源 | 用途 | 涉及的数据类型 | 默认状态 | 关闭 / 替换方法 |
| --- | --- | --- | --- | --- |
| 主题自身静态资源 `/themes/warm-island/assets/*` | 样式、脚本、字体、图标、Logo、内置句子库 | 无（同域请求，不含用户数据） | 始终启用，渲染必需 | 不可关闭；均为随包自托管文件 |
| 自定义一言 API `hero_hitokoto_api` | Hero 首屏随机句子 | 无请求体；发起 GET 时第三方可见访客 IP / User-Agent | **默认不启用**：「描述文案来源」默认「无」，一言元素不渲染，零请求；该字段默认预填 `https://v1.hitokoto.cn/`，仅在「一言」模式生效 | 主题设置 → Hero 首屏 → 描述来源改为「无」或「自定义」，或清空该字段回退到 `assets/data/hitokoto.json` 内置本地句子库 |
| 自定义 IP 定位主 / 备选 API `welcome_popup_api` / `welcome_popup_fallback_api` | 欢迎弹窗显示「欢迎来自 XX 的朋友」 | **访客 IP** 与第三方返回的粗略地理位置 | **关闭**：两项均留空，弹窗只显示本地欢迎语；且欢迎弹窗开关本身默认关闭。可选接口见下方清单 | 主题设置 → 欢迎弹窗 → 关闭开关，或清空两个 API 字段 |
| 分享按钮：QQ / 微博 / X / Facebook / Telegram | 分享文章到对应平台 | 文章 URL 与标题（写在目标站 URL 参数中） | 默认开启 `qq,wechat,weibo`；**仅在访客点击后**跳转，页面加载时不请求 | 主题设置 → 文章 → 关闭「显示分享按钮」，或在「分享渠道」取消勾选 |
| 微信分享弹层 | 生成并复制文章链接 | 文章 URL（浏览器本地字符串，不发送） | 与分享按钮一致 | 同上；已移除二维码远程库，改为「复制链接」 |
| 页脚备案 / Halo / 应用市场外链 | 备案信息、致谢、插件安装提示 | 无（访客主动点击才跳转） | 由站点配置决定，默认仅显示 Halo 致谢 | 主题设置 → 页脚 → 关闭对应显示项 |
| 插件前台页面（豆瓣、Steam、微信读书、订阅动态等） | 展示插件提供的数据 | 由对应插件决定，主题不发起请求 | 安装并启用对应插件后才出现 | 卸载 / 停用对应插件；主题自动降级隐藏 |
| 内置 LightGallery 灯箱 | 图片放大预览、EXIF 展示 | 无（本地打包，不联网） | 默认启用 | 安装 lightgallery.js 插件后主题自动让位 |

#### 可选第三方接口地址（均为候选值，主题不预置请求）

| 能力 | 设置项 | 可选地址 |
| --- | --- | --- |
| Hero 一言 | `hero_hitokoto_api` | `https://v1.hitokoto.cn/`（默认预填，仅「一言」模式生效；清空则使用内置本地句子库） |
| IP 定位主接口 | `welcome_popup_api` | `https://myip.ipip.net/json` 或 `https://r.inews.qq.com/api/ip2city?otype=json` |
| IP 定位备选接口 | `welcome_popup_fallback_api` | 同上两个地址任选其一，主接口失败时兜底 |

**描述文案来源默认为「无」**，可选「一言」「自定义」，此时不渲染一言元素、不发起任何请求。API 字段默认预填
`https://v1.hitokoto.cn/`（仅「一言」模式生效）；选择「一言」或「自定义」后若把 API 留空，则使用主题内置的本地句子库（零外部请求）。
**只有填写后才会向该地址发起请求**，需自行在站点隐私说明中披露，详见本章节「逐项说明」与下方「隐私说明（5.1）」。

IP 定位接口同样默认留空；**填写后会把访客 IP 发送给该第三方服务换取地理位置**，
需自行在站点隐私说明中披露，详见本章节「逐项说明」与下方「隐私说明（5.1）」。主题不会代替站点做这项声明。

> 三个可选 API 配置项的 `help` 只保留功能说明（候选地址、留空回退规则）；完整的第三方数据流向与
> 隐私披露统一在 README「外部资源与隐私」章节和配置文档中说明，主题设置界面不重复展示冗长文案。
> 字段是否显示由对应功能开关决定，且字段可见不等于发起请求：默认值与模板的条件渲染共同保证默认零外部请求。

> 自定义 API 属于**站点管理员主动配置**的可选能力：一旦填写，浏览器会按设置向该第三方发起请求。请自行评估服务商的隐私政策，并在站点隐私说明中补充披露；主题不会代替站点做这项声明。

### 隐私说明（5.1）

| 项目 | 说明 |
| --- | --- |
| 收集的数据类型 | 默认配置下**无**。主题不读取、不上传用户信息、站点内容、访问日志或订单数据 |
| 数据用途 | 仅用于页面渲染；自定义 API 场景下由管理员自行决定 |
| 保存位置与期限 | 主题不写入数据库、不上传数据、不生成服务端日志。前端仅在访客本机使用 `sessionStorage`（欢迎弹窗「同会话仅显示一次」）与 `localStorage`（点赞状态），可随时清除浏览器站点数据 |
| 是否传输到第三方 | 默认**否**（描述文案来源为「无」、欢迎弹窗关闭、两个 API 字段留空）。仅当管理员显式填写「自定义一言 API」或「自定义 IP 定位 API」时才会向该服务发起请求，其中 IP 定位会暴露访客 IP |
| 关闭 / 撤销方式 | 见上表；清空相应设置项或关闭对应开关即可立即停止，无需重装主题 |
| 遥测 / 统计 / 崩溃上报 / 广告 / AI 分析 / 跨站追踪 | **均不存在**。主题不含任何埋点、指纹或第三方统计脚本 |

### 自托管与许可

- **已移除的远程依赖**：`cdn.jsdelivr.net` 预连接与预解析（原出现在全部模板）、PrismJS 1.29.0 核心与 `autoloader`（会按代码语言从 CDN 动态拉取并执行组件）、`qrcode-generator`、默认的一言与 IP 定位接口。
- **代码高亮**：主题不再自带 Prism.js 运行时。语法高亮请安装 Halo 应用市场的代码高亮插件，或启用「API 扩展包」的服务端代码高亮；主题只提供两套自托管的 `.token` 配色（`assets/vendor/prism-warm.css` / `prism-cold.css`），由「文章 → 代码高亮主题」切换。
- **字体**：[霞鹜文楷 LXGW WenKai](https://github.com/lxgw/LxgwWenKai) 以 [SIL OFL 1.1](https://openfontlicense.org/) 发布，由 `cn-font-split` 切分为本地 woff2 分片随主题分发；字体来源与版权声明保留在 `public/assets/fonts/LXGWWenKai/result.css`，上游完整的版权声明、保留字体名条款与 **OFL 1.1 许可证全文**随包存放于 `public/assets/fonts/LXGWWenKai/OFL.txt`（构建后为 `templates/assets/fonts/LXGWWenKai/OFL.txt`）。上游的附加许可明确允许把字体切分 / 转换为 WOFF2 仅用于网页字体交付，本主题的使用方式与之相符；无远程字体请求。
- **灯箱**：LightGallery 2.9.0 以 GPLv3 发布，本主题同样采用 GPL-3.0，按开源许可条款使用（非商业授权）；已去除占位 `licenseKey`，控制台不再出现 `license key is not valid for production use`。
- **图标**：来源与协议见[图标与字体来源](#图标与字体来源)。

## 内容渲染安全（4.4.2）

主题对「站点内容 / 用户生成内容」与「管理员显式配置」采取不同的渲染策略，避免把不可信字符串直接拼进可执行上下文：

| 场景 | 处理方式 |
| --- | --- |
| 文章标题、摘要、作者、封面（结构化数据） | 不再用 `th:utext` 把变量拼进 `application/ld+json` 脚本文本。字段先经 Thymeleaf 转义写入 `<meta>`，前端读取后用 `JSON.stringify` + `textContent` 生成 JSON-LD，内容里的尖括号不会被解析为标签 |
| 瞬间正文 | 插件已渲染的 `content.html` 用 `th:utext` 原样呈现；`html` 缺失时的 `content.raw` 兜底改用 `th:text` 转义输出，不再当作 HTML 执行 |
| 文章正文、单页正文、评论 | 使用 Halo 核心 / 评论插件输出的已处理 HTML，主题不二次拼接脚本 |
| 常规模板变量 | 统一用 `th:text` / `th:attr`（转义输出）；`th:utext` 仅用于上述受控 HTML 与管理员自定义内容 |
| 链接与图片 | `target="_blank"` 一律带 `rel="noopener noreferrer"`；所有 `<img>` 提供 `alt` / `th:alt` |

以下三类内容由**管理员在后台显式填写**，属于主题的设计能力，写入权限由 Halo 后台角色控制，不属于访客输入：

- `style.accent_color` 与 6 个 Hero 配色项：`settings.yaml` 中声明为 `$formkit: color`，由颜色选择器约束为 `#RRGGBB`，仅用于生成内联 CSS 变量；
- `style.custom_css`（自定义 CSS）、`footer.footer_custom_html`（页脚自定义 HTML，如统计代码）：按设计意图原样输出，用途已在设置项说明中标注。若站点允许多名作者或开放后台编辑权限，请自行评估这些字段的信任边界。

字符串截取前先判空（`#strings.substring('', 0, 1)` 会抛越界异常）已在全部 12 处友链 / 留言 / 订阅 / 插件页面兜底，避免空值导致页面 500；控制台无报错与键盘可达性、深浅色对比度一起列入下方人工回归清单。

## 已适配插件

| 插件名称 | 插件标识 | 适配页面路由 | 说明 |
|----------|---------|-------------|------|
| [瞬间](https://halo.run/store/apps/app-SnwWD) | `PluginMoments` | `/moments` | 瞬间动态页面，支持点赞、评论、标签筛选、顶部封面 |
| [图库](https://halo.run/store/apps/app-BmQJW) | `PluginPhotos` | `/photos` | 图片展示页面，支持分组、灯箱预览 |
| [友情链接（链接管理）](https://halo.run/store/apps/app-hfbQg) | `PluginLinks` | `/links` | 友链展示页面，支持随机排列、随机传送门、评论区开关；同一插件的 RSS 订阅驱动「订阅」页面 |
| [装备管理](https://github.com/chengzhongxue/plugin-equipment) | `equipment` | `/equipments` | 装备展示页面，按分组展示，支持封面图 |
| [豆瓣](https://github.com/chengzhongxue/plugin-douban) | `plugin-douban` | `/douban` | 豆瓣记录页面，支持类型/状态/标签筛选，默认音乐；需插件 **v1.2.6+**（SQLite 数据结构） |
| [Steam 信息展示](https://github.com/Tim0x0/halo-plugin-steam) | `PluginSteam` | `/steam` | Steam 游戏库页面，含用户资料、统计数据、最近游玩、游戏库分页 |
| [微信读书](https://github.com/yeora26/halo-weread-plugin) | `halo-weread-plugin` | 自定义页面 | 书架展示页面，见下方「自定义页面模板」 |
| [记得](https://github.com/yyliucha/plugin-important-dates) | `plugin-important-dates` | `/important-dates` | 重要日期 / 牵挂的人 / 爱车双视图页面，见下方「扩展页面」 |
| [文章组件](https://github.com/acanyo/plugin-content-widgets) | `plugin-content-widgets` | 文章内 | 提示框、标签页、时间线等内容组件，主题已映射 `--xhhao-com-*` 变量，自动跟随明暗模式 |
| [API 扩展包](https://github.com/HowieHz/halo-plugin-extra-api) | `extra-api` | 全站 | 服务端字数统计、中英文混排排版、可选服务端代码高亮 |

> **注意**：插件需要单独安装，安装后主题会自动适配对应页面。若未安装某插件，对应页面或功能自动隐藏/降级，不会报错。
>
> **「朋友圈」（`plugin-friends`）插件已不再提供**：原先的 feed / RSS 聚合能力由官方
> **「链接管理」（PluginLinks）插件的订阅**取代，对应下方的「订阅」自定义页面模板。
> 主题保留 `friends.html` 与「朋友圈」设置分组仅用于兼容旧站点，新站点请勿再依赖；
> 插件不可用时会显示空状态，不会报错。

## 自定义页面模板

在 Halo 后台「页面 → 新建 → 自定义模板」中选择使用（页面地址由 slug 决定，无固定路由）：

| 模板名 | 模板文件 | 说明 |
|--------|---------|------|
| 留言板 | `page_messageboard.html` | 留言墙页面，标题与副标题可配置 |
| 订阅 | `page_subscriptions.html` | 博友文章订阅动态，由官方链接管理插件的 RSS 订阅提供，支持分页 / 下滑加载与列表 / 网格布局 |
| 微信读书 | `weread.html` | 微信读书书架展示，依赖微信读书插件，访客免登录查看 |

## 主要功能

### 首页

- Hero 首屏：明暗双背景图、大标题/副标题独立配色、描述文案（默认「无」；API 字段默认预填 `https://v1.hitokoto.cn/`，仅「一言」模式生效，清空则使用内置本地句子库；可选自定义文案与自动刷新）、下滑箭头平滑滚动
- 欢迎弹窗：默认显示纯本地静态欢迎语，支持 5 种位置、会话去重开关；仅在显式配置自定义 IP 定位 API 时才显示访客所在地（见[外部资源与隐私](#外部资源与隐私)）
- 滚动吸附：首屏与内容区之间滚轮/触摸自动吸附，进入内容区后恢复原生自由滚动
- 文章卡片：可配置显示字数（依赖 API 扩展包）、阅读量、分类、标签、摘要行数

### 文章

- 目录（TOC）：桌面端侧栏 + 移动端抽屉，滚动高亮、展开模式可选
- 代码高亮：由代码高亮插件 / API 扩展包输出，主题提供 Warm / Cold 两套本地配色；主题不加载任何远程高亮脚本
- 上下篇导航、相关推荐、分享按钮、赞赏、版权声明可独立开关；微信分享改为复制文章链接，无需二维码库
- 字数与阅读时间：优先使用 API 扩展包的服务端统计，未安装时前端计算兜底

### 全局

- 点击特效：核心价值观 / 爱心 / 烟花 / 粒子等 8 种效果可选，也可关闭
- 页脚全站统计：文章、分类、评论、访问、点赞、总字数，支持开关与统计项选择（默认开启）
- 动效：呼吸动画、滚动渐入，可独立关闭
- 备案信息：ICP 与公网安备号，公网安备自动带徽标
- 鼠标光感跟随已移除（性能考量）

## 灯箱集成

主题内置 LightGallery 灯箱，为图片提供放大预览功能，并支持 EXIF 信息展示。该库以 GPLv3 发布，本主题以 GPL-3.0 开源，按开源许可条款自托管使用；控制台不会出现商业授权提示。

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
> 模板文件（从源码仓库打包时漏了构建步骤）。请换用完整安装包重新上传，详见 [FAQ 安装相关](https://nxxy335.top/WarmIsland/faq.html)。
>
> **升级后如果整站没了样式**：Halo 页面缓存或前置反向代理里可能还留着上一版本的 HTML，
> 它引用的 CSS 文件名带内容哈希，升级后已被删除，请求会直接 500。
> 先在 Halo 后台执行一次「清理缓存」（并刷新 CDN / Nginx 缓存）即可。
> 主题从 v1.2.1 起会把历史版本的哈希资源一并发进安装包，旧 HTML 也不会请求失败。
>
> **升级主题或修改配色后，部分页面不生效**：如果安装了「页面静态缓存」插件，
> 它只随文章变更自动刷新，主题层的变更需要手动点一次「刷新页面缓存」，
> 详见 [FAQ：升级主题或修改配色后部分页面不生效](https://nxxy335.top/WarmIsland/faq.html)。

或从源码构建：

```bash
git clone https://git.nxxy335.top/nxxy335/halo-theme-WarmIsland.git
cd halo-theme-WarmIsland
pnpm install
pnpm release    # build → snapshot → package（含外部资源审计）
```

`pnpm build` 只生成 `templates/`（模板 + 静态资源），不会产出 ZIP；
安装包由 `pnpm package` 生成到 `dist/warm-island-<version>.zip`。安装包同时包含 `docs/*.md` 与预览图，便于离线查阅上架说明中引用的文档。

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

# 外部资源 / 隐私 / README 链接审计（打包时也会自动执行）
pnpm audit:external

# 打包 dist/warm-island-<version>.zip
pnpm package

# 点击特效脚本 + 内容渲染安全（JSON-LD）冒烟测试
pnpm smoke
```

发版流程：`pnpm release`（等价于 `pnpm build` → `pnpm snapshot` → `pnpm package`），
并把 `compat/assets` 的新增文件一起提交。`pnpm package` 会校验模板、资源目录与版本号一致性，
并执行外部资源审计（禁止第三方预连接、远程脚本、动态加载、无效 README 链接、重复大图），
任一不通过都会直接报错，避免打出不合规或不含 `templates/` 的空壳安装包。

### 目录结构

```
├── src/
│   ├── components/    # 组件（导航、页脚、Hero、弹窗、特效等）
│   ├── layouts/       # Layout.astro（含页面布局契约渲染模式）
│   ├── pages/         # 页面模板（构建后输出到 templates/）
│   └── styles/        # SCSS 样式（正文样式在 _content.scss，全局生效）
├── public/
│   ├── assets/data/      # 内置本地一言句子库（静态 JSON）
│   ├── assets/fonts/      # LXGW WenKai 本地字体分片 + OFL.txt 许可证全文
│   ├── assets/vendor/     # 自托管的代码高亮配色 CSS
│   └── assets/logo.png    # 主题图标（唯一一份，256×256 压缩版）
├── compat/assets/     # 历史版本哈希静态资源，构建时合并进 templates/assets
├── scripts/           # 构建后置、资源快照、打包、外部资源与合规审计、冒烟测试
├── templates/         # 构建产物，Halo 实际加载的模板
├── settings.yaml      # 后台设置项定义
└── theme.yaml         # 主题清单与自定义页面模板注册
```

### 主题开发注意事项

- **静态资源文件名带内容哈希**：升级后旧文件被删除，被缓存的 HTML 仍会请求旧文件名并触发 500，
  所以每个版本的哈希文件都要留一份（见 `compat/assets` 与 `pnpm snapshot`）
- **不得引入远程脚本 / 样式 / 字体 / 预连接**：所有第三方资源必须自托管并标注许可，`pnpm package` 会拦截回归
- **不得把站点内容用 `th:utext` 拼进 `<script>`**：`<script>` 是原始文本元素，HTML 转义不生效且脚本闭合标签可提前结束元素；动态数据走「转义输出到 `<meta>` → `JSON.stringify` → `textContent`」，或未净化文本一律用 `th:text`
- **第三方字体必须随包携带许可证全文**：修改 / 切分字体时，`public/assets/fonts/LXGWWenKai/OFL.txt` 与 `result.css` 中的版权声明都要保留，`pnpm package` 会校验
- **Thymeleaf 字符串字面量必须加单引号**：`th:text="'文本'"`，裸中文遇到逗号/空格/emoji 会导致页面 500
- **`th:attr` 只用简单表达式**（取属性、Elvis 默认值、三元、拼接、等值比较），表达式对象方法调用会被受限求值器拒绝
- **凡是与后台开关绑定的模板表达式都要给默认值**：`?: '默认值'`，配置未落库时属性会被整体移除，功能会静默失效
- **截取首字符前先判空**：`#strings.substring('', 0, 1)` 会抛字符串越界异常，统一写成 `!#strings.isEmpty(x) ? #strings.substring(x, 0, 1) : '·'`
- **正文样式必须写在全局样式表**（`src/styles/_content.scss`）：Astro scoped 样式对 Thymeleaf 运行时注入的内容无效
- **内联脚本统一加 `th:inline="none"`**：避免 Thymeleaf 解析脚本中的 `[[` / `[(` / `${}`
- **新插入的动画元素要强制回流**（读一次 `offsetWidth`）：否则初态与终态在同一帧被合并，transition 不触发
- 修改主题外观无需单独维护 `layout.astro`：页面布局契约复用 `Layout.astro`，构建时自动生成

## 验证与回归测试

自动化覆盖（每次发版执行）：

- `pnpm build` 生成全部 21 个模板，构建后置脚本校验所有静态资源引用真实存在
- `pnpm audit:external` / `pnpm package` 审计第三方远程加载、预连接、动态加载、README 制品链接、Logo 去重，并校验字体许可证全文随包（5.2）、JSON-LD 不拼接站点内容（4.4.2）、README 设置项数字与 `settings.yaml` 一致（2.2）
- `pnpm smoke` 校验点击特效脚本，并用桩 DOM 验证文章 JSON-LD 合法性与脚本注入防护（4.4.2）；安装包内容校验模板数量、`theme.yaml` 版本与元数据一致性

上架前建议在真实 Halo ≥ 2.27 实例上做一次人工回归（主题声明为 AI 辅助开发，此项由站点管理员完成并留存结果）：

| 页面 | 检查要点 |
| --- | --- |
| 首页 | Hero（描述文案默认「无」）、三个可选 API 设置项（help 仅功能说明，隐私披露见 README）、一言 API 清空回退、滚动吸附、文章卡片、欢迎弹窗（默认本地文案） |
| 文章 | 正文 / 代码块配色、目录、分享按钮与微信复制链接、灯箱、点赞 |
| 分类 / 标签 / 归档 | 列表、分页、空状态、暗色模式 |
| 搜索 / 错误页 | 搜索页与空结果状态、404 / 500 兜底页、暗色模式（4.4.1） |
| 内容与表单 | 标题 / 瞬间正文含尖括号时不执行脚本、JSON-LD 合法、评论与表单校验（4.4.2） |
| 友链 / 留言板 / 订阅 | 空字段兜底（作者为空不报错）、表单与分页、订阅动态空状态与插件未安装提示 |
| 全局 | 导航栏、页脚、移动端抽屉、深浅色切换、键盘可达主要导航与搜索、正文对比度、控制台无报错 / 无外部请求（4.4.3 / 4.4.4） |

## 技术栈

- [Halo](https://halo.run) 2.27+
- [Astro](https://astro.build) 6（构建输出 Thymeleaf 模板）
- [Thymeleaf](https://www.thymeleaf.org) 模板引擎
- [Sass](https://sass-lang.com/) 样式

## 许可

[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)

## 原创声明（审核指南 4.2.1）

WarmIsland 暖屿为**完全原创**主题：视觉设计、页面结构、Astro 构建链路、Thymeleaf 模板与样式代码均由开发者独立编写，
**未基于任何已有 Halo 主题或插件进行 Fork、复制代码或二次开发**，不存在上游应用、上游仓库、派生版本或接续维护关系。
因此审核指南 **4.2.1（Fork 与派生应用）与 4.2.2（停止维护应用的接续维护）不适用于本主题**，无需提供上游贡献记录、上游差异说明或停止维护证明。

主题使用 AI 工具辅助编码与文档编写，全部产出已由开发者完成代码审查、功能验证、安全自查与 Halo 开发生态适配
（见[验证与回归测试](#验证与回归测试)）。第三方开源组件（字体、图标、灯箱）均自托管并保留许可证与署名，
来源见[图标与字体来源](#图标与字体来源)与[自托管与许可](#自托管与许可)；主题本体以 GPL-3.0 发布，
源码仓库为 https://git.nxxy335.top/nxxy335/halo-theme-WarmIsland 。

## 图标与字体来源

本主题使用的图标与字体来自以下开源项目，均随主题自托管分发、不使用远程 CDN：

| 来源 | 协议 | 用途 |
| --- | --- | --- |
| [霞鹜文楷 LXGW WenKai](https://github.com/lxgw/LxgwWenKai) | [SIL OFL 1.1](https://openfontlicense.org/) | 全站中文字体（本地 woff2 分片，含保留字体名与版权声明） |
| [Font Awesome](https://fontawesome.com/) Free v7.2.0 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) / [SIL OFL 1.1](https://scripts.sil.org/OFL) | QQ 分享图标 |
| [Simple Icons](https://simpleicons.org/) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | 微博、X、Facebook、Telegram 分享图标 |
| [Feather Icons](https://feathericons.com/) | [MIT](https://opensource.org/licenses/MIT) | 导航、界面交互图标 |
| [Halo](https://halo.run/) | [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) | 主题内置图标 |
| [LightGallery](https://www.lightgalleryjs.com/) 2.9.0 | GPLv3 | 图片灯箱（npm 依赖随构建打包，非远程加载） |
