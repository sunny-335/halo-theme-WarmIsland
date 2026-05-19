# 留言板

留言板是 WarmIsland 主题提供的互动页面，访客可以在此留下评论和祝福。留言板基于 Halo 的评论系统实现，拥有独立的标题和副标题配置。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `messageboard_title` | 文本 | `留言板` | 留言板标题 |
| `messageboard_subtitle` | 多行文本 | `在这里留下你的足迹吧 🌙` | 留言板副标题 |

## 详细说明

### 留言板标题（messageboard_title）

留言板页面的主标题，显示在页面顶部最醒目的位置。

```yaml
messageboard_title: "留言板"        # 默认
messageboard_title: "留言"          # 简称
messageboard_title: "Guestbook"     # 英文站点
```

### 留言板副标题（messageboard_subtitle）

标题下方的副标题，用于引导访客留言。默认为「在这里留下你的足迹吧 🌙」，支持 Emoji 和多行文本。

```yaml
messageboard_subtitle: "在这里留下你的足迹吧 🌙"    # 默认
messageboard_subtitle: "说点什么吧 ✨"              # 替代方案
messageboard_subtitle: "Leave a message 🌙"         # 英文站点
```

::: tip
副标题是营造留言板氛围的重要元素，建议使用温暖、亲切的措辞，配合 Emoji 效果更佳。
:::

## 自定义模板使用步骤

留言板页面需要通过 Halo 后台创建自定义页面来使用，具体步骤如下：

1. 登录 Halo 后台管理控制台
2. 进入 **页面** → **新建**
3. 填写页面基本信息：
   - **标题** — 建议与 `messageboard_title` 保持一致
   - **别名** — 如 `messageboard` 或 `guestbook`
4. 在页面模板选择中，选择 **留言板**（messageboard）模板
5. 发布页面
6. 将页面链接添加到导航菜单中

::: warning
如果未选择留言板模板，页面将使用默认模板渲染，不会显示留言板专属的标题、副标题和评论组件。请务必在创建页面时选择正确的模板。
:::

::: tip
留言板的评论功能依赖 Halo 的评论系统。确保已在 Halo 后台 → **设置** → **评论** 中开启评论功能，并在页面设置中允许评论。
:::

## 相关页面

- [评论](/config/comment) — 评论样式配置
- [导航栏](/config/navbar) — 将留言板添加到导航菜单
- [自定义页面](/pages/custom-page) — 自定义页面创建指南
