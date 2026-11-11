# 扩展页面

WarmIsland 主题深度集成了多款 Halo 插件，提供了丰富的扩展页面。

## 支持的扩展页面

| 页面 | 所需插件 | 路由 |
|------|----------|------|
| 瞬间 | [PluginMoments](https://www.halo.run/store/apps/app-SnwWD) | `/moments` |
| 图库 | [PluginPhotos](https://www.halo.run/store/apps/app-BmQJW) | `/photos` |
| 友情链接 | [PluginLinks](https://www.halo.run/store/apps/app-hfbQg) | `/links` |
| 订阅动态 | [PluginLinks](https://www.halo.run/store/apps/app-hfbQg)（RSS 订阅） | 自定义页面，无固定路由 |
| 豆瓣 | [plugin-douban](https://www.halo.run/store/apps/app-srBOL) | `/douban` |
| 装备 | [equipment](https://www.halo.run/store/apps/app-ytygyqml) | `/equipments` |
| Steam | [steam](https://www.halo.run/store/apps/app-0ojqyzfh) | `/steam` |
| 记得 | [plugin-important-dates](https://github.com/yyliucha/plugin-important-dates) | `/important-dates` |

> 「朋友圈」（`plugin-friends`）插件已不再提供，其 feed / RSS 聚合能力由官方「链接管理」插件的订阅取代。
> 主题保留的 `friends.html` 仅供旧站点兼容，新站点请使用订阅模板，详见[订阅页面](/pages/subscriptions)。

## 订阅页面

订阅页面依赖官方「链接管理」插件的 RSS 订阅，展示博友们的最新文章，
支持分页 / 下滑加载与列表 / 网格布局。它属于自定义页面模板，地址由你创建页面时的 slug 决定。
使用前请在 Halo 后台 → 页面 → 新建 → 自定义模板中选择「订阅」。

详见[订阅页面](/pages/subscriptions)与[订阅配置](/config/subscriptions)。

## 豆瓣页面

[豆瓣插件](https://www.halo.run/store/apps/app-srBOL)展示豆瓣观影/读书/音乐记录，支持按类型和状态筛选。

## 装备页面

[装备管理插件](https://www.halo.run/store/apps/app-ytygyqml)展示个人装备清单，按分组分类展示。

## Steam 页面

[Steam](https://www.halo.run/store/apps/app-0ojqyzfh)展示 Steam 游戏资料，包括：

- 玩家头像和昵称
- 游戏统计
- 徽章展示
- 最近游戏

## 记得页面

[记得插件](https://github.com/yyliucha/plugin-important-dates)记录重要的日子、牵挂的人与座驾，「生活 / 爱车」双视图展示：

- 重要日期（含农历）与倒计时便签
- 牵挂的人：大头贴、昵称、关系与生日倒计时
- 座驾：脱敏车牌、到期事项徽章、车主与驾驶人
- 相册：点击车辆封面全屏只读浏览

详见 [记得页面](/pages/important-dates)。

::: info
扩展页面需要安装对应的 Halo 插件才能使用。如果插件未安装，页面会显示友好的提示信息。
:::
