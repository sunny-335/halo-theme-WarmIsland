# 订阅

订阅模块用于展示博友们的最新文章动态（feed / RSS 聚合）。这项能力由 **Halo 官方「链接管理」（PluginLinks）插件的订阅**提供，主题只负责把插件抓取到的订阅动态渲染成页面。

> `plugin-friends`（朋友圈）插件已不再提供，原来的 feed 聚合功能由链接管理插件的订阅取代。
> 主题中的 `friends.html` 模板与「朋友圈」设置分组仅用于兼容旧站点，新站点请使用订阅页面模板，
> 详见[历史兼容说明](#历史兼容说明)。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `subscriptions_page_title` | 文本 | `订阅` | 页面标题 |
| `subscriptions_subtitle` | 文本 | `博友们的最新文章` | 页面副标题 |
| `subscriptions_page_size` | 数字 | `20` | 每页展示的动态条数，范围 1–100 |
| `subscriptions_loading_mode` | 下拉 | `pagination` | `pagination` 分页 / `infinite_scroll` 下滑加载 |
| `subscriptions_layout` | 下拉 | `list` | `list` 列表卡片 / `grid` 网格卡片 |

## 前置依赖

::: danger
订阅页面依赖 Halo 官方 **「链接管理」（PluginLinks）** 插件的 RSS 订阅能力，
可在[应用市场](https://www.halo.run/store/apps/app-hfbQg)安装。未安装或未启用订阅时，
页面会显示空状态提示，不会报错。
:::

订阅源由链接管理插件维护（为博友链接配置 RSS 订阅地址、按插件自身的周期抓取），
主题通过 Halo 的 `linkFeedFinder` 读取已抓取的动态列表，不自行抓取、不缓存、不向第三方发起请求。
订阅源的添加入口与抓取频率以所安装插件版本的说明为准。

## 详细说明

### 加载方式（subscriptions_loading_mode）

- `pagination`：页面底部显示「较新 / 较旧」翻页链接，按时间游标分页。
- `infinite_scroll`：滚动到列表底部时自动加载下一页，并显示加载状态与「没有更多了」提示。

### 布局样式（subscriptions_layout）

- `list`：单列宽卡片，默认布局，适合长摘要阅读。
- `grid`：一行三列（窄屏自动降为两列 / 一列），卡片内容垂直排列。

两种方式下每条动态都展示作者头像 / 名称、发布日期、文章标题与摘要，标题与作者链接均带
`rel="noopener noreferrer"`；作者名为空时会显示占位字符，不会因字符串截取报错。

## 历史兼容说明

主题仍保留 `templates/friends.html` 与设置中的「朋友圈」分组（`friends_page_title`），
它们只读取旧 `plugin-friends` 插件的数据。该插件已不再提供，因此：

- 新站点**不要**再创建 `/friends` 页面或依赖这个分组；
- 旧站点若已停用该插件，`friends.html` 会显示空状态而不会报错；
- 需要 feed 聚合时，请改用 `page_subscriptions.html` 订阅模板。

## 相关页面

- [订阅页面](/pages/subscriptions) — 页面结构、模板选择与迁移说明
- [友情链接配置](/config/links) — 同一插件的友链展示配置
- [自定义页面](/pages/custom-page) — 全部自定义页面模板
