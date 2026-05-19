# Hero 首屏

Hero 首屏是 WarmIsland 主题的标志性区域，占据首页首屏的全部视口高度，以渐变背景、呼吸光球和动态文案营造沉浸式的第一印象。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `hero_enabled` | 开关 | `true` | 启用 Hero 模块 |
| `hero_title` | 文本 | — | 主标题（留空则使用站点标题） |
| `hero_subtitle` | 文本 | — | 副标题（留空则使用站点副标题） |
| `hero_description_mode` | 下拉 | `hitokoto` | 描述文案来源：`none` / `hitokoto` / `custom` |
| `hero_hitokoto_api` | URL | `https://v1.hitokoto.cn/` | 一言 API 地址 |
| `hero_hitokoto_categories` | 多选 | `d, i, k` | 一言句子类型 |
| `hero_custom_description` | 多行文本 | — | 自定义描述文案 |
| `hero_background_image` | 附件 | — | 背景图片 |

## 详细说明

### 启用 Hero 模块（hero_enabled）

关闭后，首页将不再显示 Hero 区域，直接展示文章列表。适合内容导向型站点或不需要首屏视觉冲击的场景。

### 主标题与副标题

- **`hero_title`** — Hero 区域的主标题，字体最大、最醒目。留空时自动使用 [基础设置](/config/basic) 中的 `owner_name` 作为回退。
- **`hero_subtitle`** — 主标题下方的副标题，字号较小。留空时自动使用 Halo 后台设置的站点副标题。

```yaml
# 示例
hero_title: "暖屿"
hero_subtitle: "记录温暖与灵感"
```

### 描述文案来源（hero_description_mode）

控制 Hero 区域主标题下方显示的描述文案，提供三种模式：

| 值 | 说明 |
| --- | --- |
| `none` | 不显示描述文案 |
| `hitokoto` | 从一言 API 实时获取随机句子（默认） |
| `custom` | 显示自定义的描述文案 |

### 一言模式（hitokoto）

选择 `hitokoto` 模式后，Hero 区域会从一言 API 获取随机句子，每次刷新页面都会展示不同的内容。

#### 一言 API 地址（hero_hitokoto_api）

默认使用官方 API `https://v1.hitokoto.cn/`。如果你部署了一言的私有实例，可以修改为自建 API 地址。

::: tip
自建一言 API 可以提升加载速度并避免第三方服务不稳定的问题。部署方式请参考 [hitokoto 官方文档](https://developer.hitokoto.cn/)。
:::

#### 一言句子类型（hero_hitokoto_categories）

通过勾选来筛选获取的句子类型，支持多选：

| 值 | 类型 | 说明 |
| --- | --- | --- |
| `a` | 动画 | 动画作品中的经典台词 |
| `b` | 漫画 | 漫画作品中的句子 |
| `c` | 游戏 | 游戏中的对白与文案 |
| `d` | 文学 | 文学作品中的名句（默认选中） |
| `e` | 原创 | 一言社区原创投稿 |
| `f` | 来自网络 | 网络流传的金句 |
| `g` | 其他 | 其他来源 |
| `h` | 影视 | 影视剧中的台词 |
| `i` | 诗词 | 古诗词名句（默认选中） |
| `k` | 哲学 | 哲学思辨类句子（默认选中） |
| `l` | 抖机灵 | 幽默风趣的句子 |

默认选中 `d`（文学）、`i`（诗词）、`k`（哲学），与暖屿的文艺气质相契合。

```yaml
# 示例：只获取文学和诗词类句子
hero_hitokoto_categories:
  - d
  - i
```

### 自定义模式（custom）

选择 `custom` 模式后，需要在 `hero_custom_description` 中填写自定义的描述文案。此配置项仅在 `hero_description_mode` 为 `custom` 时显示。

```yaml
hero_description_mode: custom
hero_custom_description: "用文字记录生活，用代码构建世界。"
```

::: tip
自定义描述支持多行文本，但建议控制在 1–2 行以内，过长的文案在移动端可能需要滚动才能完整显示。
:::

### 背景图片（hero_background_image）

上传自定义背景图片，将作为 Hero 区域的背景展示。未设置时，Hero 区域使用渐变色背景。

::: warning
背景图片会自动应用模糊和暗化处理，以确保前景文字的可读性。建议选择色彩柔和、不包含大量细节的图片作为背景，避免干扰文案阅读。
:::

## 视觉效果

Hero 区域包含以下精心设计的视觉效果：

### 渐变背景

基于强调色生成的多层渐变背景，在浅色和深色模式下分别适配不同的色调。渐变方向从左上到右下，营造温暖的视觉基调。

### 呼吸光球

多个半透明的光球在背景中缓慢浮动和脉动，产生「呼吸」般的节奏感。此效果可通过 [样式设置](/config/style) 中的 `animation_breath` 开关控制。

### 滚动模糊

当页面向下滚动时，Hero 区域会逐渐应用高斯模糊效果，使焦点自然过渡到下方的内容区域。

### 内容淡出

随着滚动距离增加，Hero 区域内的标题、副标题和描述文案会逐渐淡出并上移，形成视差效果。

### 滚动指示器

Hero 区域底部有一个向下滚动的指示动画（小箭头 + 弹跳动画），引导访客继续浏览下方内容。

::: tip
以上所有视觉效果均通过 CSS 和少量 JavaScript 实现，对性能影响极小。如果需要禁用动画效果，可在 [样式设置](/config/style) 中关闭对应的动画开关。
:::

## 相关页面

- [首页](/config/home) — 首页文章列表配置
- [样式设置](/config/style) — 动画效果与配色配置
- [基础设置](/config/basic) — 站点名称与描述配置
