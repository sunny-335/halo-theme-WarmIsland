# 基础设置

基础设置是 WarmIsland 主题的核心配置区域，用于定义站点的基本信息和全局标签文案。这些配置项会影响导航栏、页脚、SEO 以及全站多处显示内容。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `owner_name` | 文本 | — | 站点名称，显示在导航栏、页脚等位置 |
| `site_description` | 多行文本 | — | 站点描述，用于 SEO meta 信息 |
| `logo` | 附件 | — | 自定义 Logo 图片 |
| `favicon` | 附件 | — | 自定义 Favicon 图标 |
| `label_search` | 文本 | `搜索` | 搜索按钮的标签文案 |
| `label_theme_switch` | 文本 | `切换主题` | 主题切换按钮的标签文案 |
| `label_archives_title` | 文本 | `归档` | 归档页面的标题文案 |

## 详细说明

### 站点名称（owner_name）

填写你的站点名称，该名称会出现在以下位置：

- 导航栏左侧（未设置 Logo 时作为文字 Logo 显示）
- 页脚版权信息区域
- 浏览器标签页标题（结合文章标题）

::: tip
如果未设置 `owner_name`，主题会尝试读取 Halo 后台的站点标题作为回退值。建议始终显式设置此项以确保显示一致。
:::

### 站点描述（site_description）

站点描述用于生成 HTML `<meta name="description">` 标签，对搜索引擎优化（SEO）至关重要。建议控制在 80–160 个字符之间，简洁地概括站点内容与定位。

```yaml
# 示例
site_description: "一个关于技术、生活与思考的个人博客，记录温暖与灵感。"
```

### 自定义 Logo（logo）

上传自定义 Logo 图片，支持 PNG、SVG、JPG 等常见格式。设置后，Logo 将替代站点名称显示在导航栏左侧。

::: tip
推荐使用 SVG 格式的 Logo，在任何分辨率下都能保持清晰。建议 Logo 高度不超过 40px，宽度按比例缩放。
:::

### 自定义 Favicon（favicon）

Favicon 是显示在浏览器标签页上的小图标。上传一个正方形图标（推荐 32×32 或 64×64 像素的 PNG/ICO 格式）。

::: warning
部分浏览器对 Favicon 有缓存机制，更换后可能需要清除浏览器缓存或使用无痕模式查看效果。
:::

### 标签文案自定义

WarmIsland 主题允许你自定义界面中出现的标签文案，方便进行多语言适配或个性化表达：

- **`label_search`** — 导航栏搜索按钮的显示文字，默认为「搜索」
- **`label_theme_switch`** — 导航栏主题切换按钮的显示文字，默认为「切换主题」
- **`label_archives_title`** — 归档页面的标题，默认为「归档」

```yaml
# 英文站点示例
label_search: "Search"
label_theme_switch: "Switch Theme"
label_archives_title: "Archives"
```

::: tip
标签文案的修改会即时生效，无需重启 Halo。如果使用多语言场景，可以配合 Halo 的多语言插件实现更完整的国际化。
:::

## 相关页面

- [样式设置](/config/style) — 调整配色、圆角、动画等视觉表现
- [导航栏](/config/navbar) — 配置导航栏样式与功能按钮
- [页脚](/config/footer) — 配置页脚版权信息与社交链接
- [快速开始](/guide/getting-started) — 主题安装与初始配置指南
