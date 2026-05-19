# 页脚

页脚是站点全局可见的底部区域，用于展示版权信息、备案号、社交链接以及自定义 HTML 内容。WarmIsland 提供了灵活的页脚配置，满足法律合规、社交推广和数据分析等多种需求。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `footer_copyright` | 文本 | — | 版权信息（留空则使用默认格式 © 年份 站点标题） |
| `footer_icp` | 文本 | — | ICP 备案号 |
| `footer_socials` | 重复器 | — | 社交链接（平台名称 / 图标类名 / 链接地址） |
| `footer_show_powered` | 开关 | `true` | 显示「Powered by Halo」 |
| `footer_show_theme` | 开关 | `true` | 显示主题版本 |
| `footer_custom_html` | 代码 | — | 自定义 HTML（统计代码等） |

## 详细说明

### 版权信息（footer_copyright）

自定义页脚版权信息文本。留空时，主题会自动生成默认格式的版权信息：`© 当前年份 站点标题`。

```yaml
# 自定义版权信息
footer_copyright: "© 2024 暖屿 All Rights Reserved"

# 留空使用默认格式
footer_copyright: ""
# 自动生成：© 2026 暖屿
```

::: tip
如果需要更复杂的版权信息（如包含链接），可以使用 `footer_custom_html` 配置项通过 HTML 实现。
:::

### ICP 备案号（footer_icp）

填写你的 ICP 备案号，显示在页脚版权信息下方。如果站点部署在中国大陆的服务器上，根据法规要求需要展示备案号。

```yaml
footer_icp: "京ICP备12345678号-1"
```

::: warning
ICP 备案号通常需要链接到工信部的备案查询页面。主题会自动为备案号添加指向 `https://beian.miit.gov.cn/` 的链接。
:::

### 社交链接（footer_socials）

通过重复器（Repeater）添加多个社交链接，每条链接包含三个字段：

| 字段 | 说明 |
| --- | --- |
| `platform` | 平台名称，如 GitHub、微博、Twitter 等 |
| `icon` | 图标类名，使用 Font Awesome 图标类名 |
| `url` | 链接地址 |

#### Font Awesome 图标类名示例

社交链接的图标使用 Font Awesome 图标库，以下是常用平台的图标类名：

| 平台 | 图标类名 |
| --- | --- |
| GitHub | `fa-brands fa-github` |
| 微博 | `fa-brands fa-weibo` |
| Twitter / X | `fa-brands fa-x-twitter` |
| 微信 | `fa-brands fa-weixin` |
| Bilibili | `fa-brands fa-bilibili` |
| 知乎 | `fa-brands fa-zhihu` |
| 邮箱 | `fa-solid fa-envelope` |
| RSS | `fa-solid fa-rss` |
| 抖音 | `fa-brands fa-tiktok` |
| 小红书 | `fa-solid fa-book-open` |
| Telegram | `fa-brands fa-telegram` |
| Discord | `fa-brands fa-discord` |
| YouTube | `fa-brands fa-youtube` |
| Spotify | `fa-brands fa-spotify` |

```yaml
# 社交链接配置示例
footer_socials:
  - platform: GitHub
    icon: fa-brands fa-github
    url: https://github.com/your-username
  - platform: 微博
    icon: fa-brands fa-weibo
    url: https://weibo.com/your-username
  - platform: 邮箱
    icon: fa-solid fa-envelope
    url: mailto:your@email.com
  - platform: RSS
    icon: fa-solid fa-rss
    url: /rss.xml
```

::: tip
你可以在 [Font Awesome 官网](https://fontawesome.com/icons) 搜索更多图标。WarmIsland 主题内置了 Font Awesome 图标库，无需额外引入。
:::

### 显示「Powered by Halo」（footer_show_powered）

开启后，页脚会显示「Powered by Halo」文字，链接到 Halo 官网。这是对 Halo 开源项目的支持与致谢。

### 显示主题版本（footer_show_theme）

开启后，页脚会显示当前 WarmIsland 主题的名称和版本号，如「Theme WarmIsland v0.1.0」。

::: tip
保持开启主题版本显示有助于访客了解你使用的主题，也可能帮助你在遇到问题时快速确认当前版本号。
:::

### 自定义 HTML（footer_custom_html）

在此处编写自定义 HTML 代码，会注入到页脚区域的末尾。最常见的用途是添加网站统计代码。

```html
<!-- 百度统计 -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?your-site-id";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- 自定义页脚内容 -->
<p style="text-align:center;margin-top:1rem;">
  Made with ❤️ by WarmIsland
</p>
```

::: warning
自定义 HTML 会直接注入到页面中，请确保代码安全可靠。不要在此处添加可能影响页面性能或安全性的代码。统计代码建议放置在 `<script>` 标签中，并使用 `async` 属性以避免阻塞页面渲染。
:::

## 页脚布局

页脚区域从上到下依次为：

```
┌─────────────────────────────────────┐
│         社交链接图标区域              │  ← footer_socials
├─────────────────────────────────────┤
│  © 2026 暖屿  |  京ICP备xxxxx号     │  ← 版权信息 + 备案号
├─────────────────────────────────────┤
│  Powered by Halo  |  Theme 暖屿     │  ← 可选的引擎与主题信息
├─────────────────────────────────────┤
│         自定义 HTML 区域             │  ← footer_custom_html
└─────────────────────────────────────┘
```

## 相关页面

- [基础设置](/config/basic) — 站点名称配置
- [导航栏](/config/navbar) — 导航栏配置
- [样式设置](/config/style) — 强调色与圆角配置
