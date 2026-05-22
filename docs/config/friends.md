# 朋友圈

朋友圈模块用于聚合展示你订阅的站点最新动态，类似于 RSS 阅读器的社交化呈现。访客可以在你的站点上浏览友站最新文章，发现更多优质内容。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `friends_page_title` | 文本 | `朋友圈` | 页面标题 |

## 前置依赖

::: danger
朋友圈功能依赖 Halo 的 **plugin-friends** 插件。如果未安装此插件，朋友圈页面将无法正常工作。

安装方式：Halo 后台 → **插件** → **安装** → 搜索「朋友圈」或从 [GitHub Releases](https://www.halo.run/store/apps/app-yISsV) 下载安装。
:::

## 详细说明

### 页面标题（friends_page_title）

朋友圈页面的标题，显示在页面顶部。

```yaml
friends_page_title: "朋友圈"     # 默认
friends_page_title: "友圈"       # 简称
friends_page_title: "Friends"    # 英文站点
```

## RSS 订阅说明

朋友圈的核心机制是通过 RSS 订阅聚合友站内容：

1. 在 Halo 后台的 Friends 插件设置中添加友站的 RSS 订阅地址
2. 插件会定期抓取这些 RSS 源的最新文章
3. 朋友圈页面按时间倒序展示所有订阅源的最新文章

### 添加订阅源

1. 登录 Halo 后台管理控制台
2. 进入 **链接** 管理页面
3. 点击 **新建** 或 **编辑** 填写：元数据 **RSS 地址** 友站的 RSS 订阅地址
4. 保存后，插件会在下次抓取周期自动拉取内容，亦可进入 **朋友圈** 自行同步

::: tip
大多数博客平台都提供 RSS 订阅功能。常见的 RSS 地址格式：
- WordPress：`/feed/`
- Halo：`/rss.xml` 或 `/feed/`
- Hexo：`/atom.xml` 或 `/rss2.xml`
- Typecho：`/feed/`
:::

::: warning
RSS 抓取频率取决于插件配置，通常为每 30 分钟到数小时一次。新添加的订阅源可能需要等待一个抓取周期才能在页面显示内容。
:::

## 相关页面

- [友情链接](/config/links) — 友情链接页面配置
- [页脚](/config/footer) — 页脚社交链接配置
- [朋友圈页面](/pages/friends) — 朋友圈模板与结构说明
