# WarmIsland 暖屿

暖如灯火，静如留白。暖屿以柔和的色调和舒缓的节奏回归内容本身，为记录与阅读留出一方安静从容的角落。

![WarmIsland Preview](https://git.nxxy335.top/nxxy335/halo-theme-WarmIsland/raw/branch/main/WarmIsland%20Preview.webp)

> 预览图随安装包分发（包根目录 `WarmIsland Preview.webp`）。

## 环境要求

- Halo **2.27.0 及以上**（页面布局契约与微信读书页面依赖 2.27 的新能力）
- 更低版本的 Halo 请使用主题 v1.1.x；v1.2.0 起内置纯 CSS 变量实现的主题配色系统

## 安装

1. 下载最新 Release 的 ZIP 安装包
2. Halo 后台 → 主题管理 → 安装主题 → 上传 ZIP
3. 点击「启用」

从源码构建：

```bash
git clone https://git.nxxy335.top/nxxy335/halo-theme-WarmIsland.git
cd halo-theme-WarmIsland
pnpm install
pnpm release    # build → snapshot → package
```

`pnpm build` 只生成 `templates/`，ZIP 由 `pnpm package` 输出到 `dist/warm-island-<version>.zip`；安装包同时含 `docs/*.md` 与预览图，便于离线查阅。

> **升级后首页 404「Template index was not found」**：ZIP 中缺少 `templates/`（源码打包时漏了构建步骤），请换用完整安装包重新上传，详见 [FAQ 安装相关](https://nxxy335.top/WarmIsland/faq.html)。
>
> **升级后整站没了样式**：Halo 页面缓存或反向代理仍留着上一版 HTML，其引用的哈希 CSS 已被删除。在后台执行一次「清理缓存」并刷新 CDN / Nginx 缓存即可；主题自 v1.2.1 起会把历史哈希资源一并打进安装包。
>
> **改了主题或配色后部分页面不生效**：若安装了「页面静态缓存」插件，需手动点一次「刷新页面缓存」，详见 [FAQ](https://nxxy335.top/WarmIsland/faq.html)。

## 特点

1. **响应式设计** — 桌面 / 移动端适配、暗色模式，移动端用动态视口单位适配地址栏
2. **插件兼容** — 适配 10 款常用 Halo 插件，提供页面布局契约，插件前台页面自动复用主题外观
3. **内置灯箱** — 随包自托管的 LightGallery（GPLv3），支持 EXIF 展示；安装 lightgallery.js 插件后自动让位
4. **可配置性** — 17 个设置分组、126 个配置项，几乎所有模块可独立开关
5. **性能优化** — 服务端字数统计（API 扩展包）、图片懒加载与响应式缩略图、首屏整屏吸附（仅边界接管，内容区保留原生滚动）、Hero 离屏停绘、CSS/HTML 压缩；详见[开发指南 - 性能与滚动顺滑](https://nxxy335.top/WarmIsland/customize/development.html)
6. **页面布局契约** — 提供 `templates/layout.html`，插件页面不再回退到 Halo 内置布局

## 主要功能

### 首页

- Hero 首屏：明暗双背景图、大标题 / 副标题独立配色、描述文案（默认「无」；API 字段默认预填 `https://v1.hitokoto.cn/`，仅「一言」模式生效，清空则使用内置本地句子库；可选自定义文案与自动刷新）、下滑箭头平滑滚动
- 欢迎弹窗：默认显示纯本地静态欢迎语，支持 5 种位置、会话去重开关；仅在显式配置自定义 IP 定位 API 时才显示访客所在地（见[外部资源与隐私](#外部资源与隐私)）
- 滚动吸附：首屏与内容区之间滚轮 / 触摸自动吸附，进入内容区后恢复原生自由滚动
- 文章卡片：可配置显示字数（依赖 API 扩展包）、阅读量、分类、标签、摘要行数

### 文章

- 目录（TOC）：桌面端侧栏 + 移动端抽屉，滚动高亮、展开模式可选
- 代码高亮：由代码高亮插件 / API 扩展包输出，主题提供 Warm / Cold 两套本地配色
- 上下篇导航、相关推荐、分享按钮、赞赏、版权声明可独立开关；微信分享改为复制文章链接
- 字数与阅读时间：优先使用 API 扩展包的服务端统计，未安装时前端计算兜底

### 全局

- 点击特效：核心价值观 / 爱心 / 烟花 / 粒子等 8 种效果可选，也可关闭
- 页脚全站统计：文章、分类、评论、访问、点赞、总字数，支持开关与统计项选择（默认开启）
- 动效：呼吸动画、滚动渐入，可独立关闭
- 备案信息：ICP 与公网安备号，公网安备自动带徽标

## 已适配插件

| 插件名称 | 插件标识 | 适配页面路由 | 说明 |
|----------|---------|-------------|------|
| [瞬间](https://halo.run/store/apps/app-SnwWD) | `PluginMoments` | `/moments` | 瞬间动态页面，支持点赞、评论、标签筛选、顶部封面 |
| [图库](https://halo.run/store/apps/app-BmQJW) | `PluginPhotos` | `/photos` | 图片展示页面，支持分组、灯箱预览 |
| [友情链接（链接管理）](https://halo.run/store/apps/app-hfbQg) | `PluginLinks` | `/links` | 友链展示页面，支持随机排列、随机传送门、评论区开关；同一插件的 RSS 订阅驱动「订阅」页面 |
| [装备管理](https://github.com/chengzhongxue/plugin-equipment) | `equipment` | `/equipments` | 装备展示页面，按分组展示，支持封面图 |
| [豆瓣](https://github.com/chengzhongxue/plugin-douban) | `plugin-douban` | `/douban` | 豆瓣记录页面，支持类型 / 状态 / 标签筛选，默认音乐；需插件 **v1.2.6+**（SQLite 数据结构） |
| [Steam 信息展示](https://github.com/Tim0x0/halo-plugin-steam) | `PluginSteam` | `/steam` | Steam 游戏库页面，含用户资料、统计数据、最近游玩、游戏库分页 |
| [微信读书](https://github.com/yeora26/halo-weread-plugin) | `halo-weread-plugin` | 自定义页面 | 书架展示页面，见下方「自定义页面模板」 |
| [记得](https://github.com/yyliucha/plugin-important-dates) | `plugin-important-dates` | `/important-dates` | 重要日期 / 牵挂的人 / 爱车双视图页面，见下方「扩展页面」 |
| [文章组件](https://github.com/acanyo/plugin-content-widgets) | `plugin-content-widgets` | 文章内 | 提示框、标签页、时间线等内容组件，主题已映射 `--xhhao-com-*` 变量，自动跟随明暗模式 |
| [API 扩展包](https://github.com/HowieHz/halo-plugin-extra-api) | `extra-api` | 全站 | 服务端字数统计、中英文混排排版、可选服务端代码高亮 |

> 插件需单独安装；未安装时对应页面或功能自动隐藏 / 降级，不会报错。
>
> **「朋友圈」（`plugin-friends`）插件已不再提供**：原先的 feed / RSS 聚合能力由官方「链接管理」（PluginLinks）插件的订阅取代，对应下方的「订阅」自定义页面模板。主题保留 `friends.html` 与「朋友圈」设置分组仅用于兼容旧站点，新站点请勿再依赖；插件不可用时会显示空状态。

## 自定义页面模板

在 Halo 后台「页面 → 新建 → 自定义模板」中选择使用（页面地址由 slug 决定，无固定路由）：

| 模板名 | 模板文件 | 说明 |
|--------|---------|------|
| 留言板 | `page_messageboard.html` | 留言墙页面，标题与副标题可配置 |
| 订阅 | `page_subscriptions.html` | 博友文章订阅动态，由官方链接管理插件的 RSS 订阅提供，支持分页 / 下滑加载与列表 / 网格布局 |
| 微信读书 | `weread.html` | 微信读书书架展示，依赖微信读书插件，访客免登录查看 |

## 灯箱集成

主题内置 LightGallery 2.9.0（GPLv3，与主题的 GPL-3.0 一致），为图片提供放大预览与 EXIF 展示。如安装 [lightgallery.js](https://www.lightgalleryjs.com/) 灯箱插件，内置灯箱自动禁用，改由插件接管。其路径匹配规则与 DOM 节点选择器：

| 页面 | 路径匹配规则 | 匹配区域 DOM 节点 |
|------|-------------|-------------------|
| 文章详情页 | `/archives/*` | `.wi-post__body` |
| 瞬间页 | `/moments` | `.wi-moments-page__content` |
| 图库页 | `/photos` | `.wi-photos-page__grid` |
| 自定义页面 | 用户自定义 | `.wi-page__body` |

> 自定义页面的路径匹配由用户自行设定，此处仅提供 DOM 节点选择器 `.wi-page__body`。

## 外部资源与隐私

默认配置下，主题不会自动向任何第三方服务发起请求：CSS、JS、字体（LXGW WenKai 本地分片）、图标、Logo 与一言句子库均来自站点自身的 `/themes/warm-island/assets/`，不经过 CDN，也不使用 `preconnect` / `dns-prefetch`。

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

**描述文案来源默认为「无」**，此时不渲染一言元素、不发起任何请求。API 字段默认预填 `https://v1.hitokoto.cn/`（仅「一言」模式生效）；选择「一言」或「自定义」后若留空，则回退到主题内置的本地句子库（零外部请求）。只有填写后才会向该地址发起请求，第三方可见访客 IP / User-Agent，需自行在站点隐私说明中披露。

两个 IP 定位接口同样默认留空；填写后会把**访客 IP**发送给该第三方服务换取粗略地理位置，需自行在站点隐私说明中披露。

### 隐私说明

| 项目 | 说明 |
| --- | --- |
| 收集的数据类型 | 默认配置下**无**。主题不读取、不上传用户信息、站点内容、访问日志或订单数据 |
| 数据用途 | 仅用于页面渲染；自定义 API 场景下由管理员自行决定 |
| 保存位置与期限 | 主题不写入数据库、不上传数据、不生成服务端日志。前端仅在访客本机使用 `sessionStorage`（欢迎弹窗「同会话仅显示一次」）与 `localStorage`（点赞状态），可随时清除浏览器站点数据 |
| 是否传输到第三方 | 默认**否**（描述文案来源为「无」、欢迎弹窗关闭、两个 API 字段留空）。仅当管理员显式填写「自定义一言 API」或「自定义 IP 定位 API」时才会向该服务发起请求，其中 IP 定位会暴露访客 IP |
| 关闭 / 撤销方式 | 见上表；清空相应设置项或关闭对应开关即可立即停止，无需重装主题 |
| 遥测 / 统计 / 崩溃上报 / 广告 / AI 分析 / 跨站追踪 | **均不存在**。主题不含任何埋点、指纹或第三方统计脚本 |

### 自托管与许可

- **代码高亮**：主题不自带 Prism.js 运行时。语法高亮请安装 Halo 应用市场的代码高亮插件，或启用「API 扩展包」的服务端代码高亮；主题只提供两套自托管的 `.token` 配色（`assets/vendor/prism-warm.css` / `prism-cold.css`），由「文章 → 代码高亮主题」切换。
- **字体**：[霞鹜文楷 LXGW WenKai](https://github.com/lxgw/LxgwWenKai) 以 [SIL OFL 1.1](https://openfontlicense.org/) 发布，由 `cn-font-split` 切分为本地 woff2 分片随主题分发；字体来源与版权声明保留在 `public/assets/fonts/LXGWWenKai/result.css`，上游完整的版权声明、保留字体名条款与 **OFL 1.1 许可证全文**随包存放于 `public/assets/fonts/LXGWWenKai/OFL.txt`（构建后为 `templates/assets/fonts/LXGWWenKai/OFL.txt`）。上游附加许可允许把字体切分 / 转换为 WOFF2 用于网页字体交付。
- **灯箱**：LightGallery 2.9.0 以 GPLv3 发布，本主题同样采用 GPL-3.0，按开源许可条款使用（非商业授权）。
- **图标**：来源与协议见[图标与字体来源](#图标与字体来源)。

## 开发

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 监听文件变化并构建到 `templates/` |
| `pnpm build` | 构建模板与静态资源，自动合并历史哈希资源 |
| `pnpm snapshot` | 把本次构建的哈希资源快照进 `compat/assets`（发版前执行） |
| `pnpm audit:external` | 外部资源、隐私与 README 链接审计（打包时自动执行） |
| `pnpm smoke` | 点击特效脚本与 JSON-LD 冒烟测试 |
| `pnpm package` | 打包 `dist/warm-island-<version>.zip` |
| `pnpm release` | 等价于 `build` → `snapshot` → `package` |

发版执行 `pnpm release`，并把 `compat/assets` 的新增文件一起提交。`pnpm package` 会校验模板、资源目录与版本号一致性并执行外部资源审计，任一不通过即报错。

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

- **静态资源文件名带内容哈希**：升级后旧文件被删除，被缓存的 HTML 仍会请求旧文件名并触发 500，所以每个版本的哈希文件都要留一份（见 `compat/assets` 与 `pnpm snapshot`）
- **第三方资源一律自托管并标注许可**，不得引入远程脚本 / 样式 / 字体 / 预连接，`pnpm package` 会拦截回归
- **常规变量统一用 `th:text` / `th:attr` 转义输出**，`th:utext` 仅用于 Halo 已处理的 HTML 与管理员自定义内容；`target="_blank"` 一律带 `rel="noopener noreferrer"`
- **不得把站点内容用 `th:utext` 拼进 `<script>`**：`<script>` 是原始文本元素，HTML 转义不生效且脚本闭合标签可提前结束元素；动态数据走「转义输出到 `<meta>` → `JSON.stringify` → `textContent`」
- **后台自定义字段按设计意图原样输出**：`style.custom_css` 与 `footer.footer_custom_html` 的写入权限由 Halo 后台角色控制，开放多人编辑时请自行评估信任边界
- **第三方字体必须随包携带许可证全文**：修改 / 切分字体时，`public/assets/fonts/LXGWWenKai/OFL.txt` 与 `result.css` 中的版权声明都要保留，`pnpm package` 会校验
- **Thymeleaf 字符串字面量必须加单引号**：`th:text="'文本'"`，裸中文遇到逗号 / 空格 / emoji 会导致页面 500
- **`th:attr` 只用简单表达式**（取属性、Elvis 默认值、三元、拼接、等值比较），表达式对象方法调用会被受限求值器拒绝
- **凡是与后台开关绑定的模板表达式都要给默认值**：`?: '默认值'`，配置未落库时属性会被整体移除，功能会静默失效
- **截取首字符前先判空**：`#strings.substring('', 0, 1)` 会抛字符串越界异常，统一写成 `!#strings.isEmpty(x) ? #strings.substring(x, 0, 1) : '·'`
- **正文样式必须写在全局样式表**（`src/styles/_content.scss`）：Astro scoped 样式对 Thymeleaf 运行时注入的内容无效
- **内联脚本统一加 `th:inline="none"`**：避免 Thymeleaf 解析脚本中的 `[[` / `[(` / `${}`
- **新插入的动画元素要强制回流**（读一次 `offsetWidth`）：否则初态与终态在同一帧被合并，transition 不触发
- 修改主题外观无需单独维护 `layout.astro`：页面布局契约复用 `Layout.astro`，构建时自动生成

## 技术栈

- [Halo](https://halo.run) 2.27+
- [Astro](https://astro.build) 6（构建输出 Thymeleaf 模板）
- [Thymeleaf](https://www.thymeleaf.org) 模板引擎
- [Sass](https://sass-lang.com/) 样式

## 原创声明

WarmIsland 暖屿为**完全原创**主题：视觉设计、页面结构、Astro 构建链路、Thymeleaf 模板与样式代码均由开发者独立编写，**未基于任何已有 Halo 主题或插件进行 Fork、复制代码或二次开发**，不存在上游应用、上游仓库、派生版本或接续维护关系。因此审核指南 **4.2.1（Fork 与派生应用）与 4.2.2（停止维护应用的接续维护）不适用于本主题**，无需提供上游贡献记录、上游差异说明或停止维护证明。

主题使用 AI 工具辅助编码与文档编写。第三方开源组件（字体、图标、灯箱）均自托管并保留许可证与署名，来源见[图标与字体来源](#图标与字体来源)与[自托管与许可](#自托管与许可)；主题本体以 GPL-3.0 发布，源码仓库为 https://git.nxxy335.top/nxxy335/halo-theme-WarmIsland 。

## 许可

[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)

## 图标与字体来源

本主题使用的图标与字体来自以下开源项目，均随主题自托管分发：

| 来源 | 协议 | 用途 |
| --- | --- | --- |
| [霞鹜文楷 LXGW WenKai](https://github.com/lxgw/LxgwWenKai) | [SIL OFL 1.1](https://openfontlicense.org/) | 全站中文字体（本地 woff2 分片，含保留字体名与版权声明） |
| [Font Awesome](https://fontawesome.com/) Free v7.2.0 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) / [SIL OFL 1.1](https://scripts.sil.org/OFL) | QQ 分享图标 |
| [Simple Icons](https://simpleicons.org/) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | 微博、X、Facebook、Telegram 分享图标 |
| [Feather Icons](https://feathericons.com/) | [MIT](https://opensource.org/licenses/MIT) | 导航、界面交互图标 |
| [Halo](https://halo.run/) | [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) | 主题内置图标 |
| [LightGallery](https://www.lightgalleryjs.com/) 2.9.0 | GPLv3 | 图片灯箱（npm 依赖随构建打包） |
