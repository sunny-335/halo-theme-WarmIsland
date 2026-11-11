# Hero 首屏

Hero 首屏是 WarmIsland 主题的标志性区域，占据首页首屏的全部视口高度，以渐变背景、呼吸光球和动态文案营造沉浸式的第一印象。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `hero_enabled` | 开关 | `true` | 启用 Hero 模块 |
| `hero_title` | 文本 | — | 主标题（留空则使用站点标题） |
| `hero_subtitle` | 文本 | — | 副标题（留空则使用站点副标题） |
| `hero_description_mode` | 下拉 | `none` | 描述文案来源：`none` / `hitokoto` / `custom`，默认不显示描述文案 |
| `hero_hitokoto_api` | URL | `https://v1.hitokoto.cn/` | 选「一言」时自动填入官方接口；留空则使用内置本地句子库（零外部请求） |
| `hero_hitokoto_categories` | 多选 | `d, i, k` | 句子类型筛选，仅对自定义 API 生效 |
| `hero_custom_description` | 多行文本 | — | 自定义描述文案 |
| `hero_hitokoto_auto_refresh` | 开关 | `false` | 一言自动刷新 |
| `hero_hitokoto_refresh_interval` | 下拉 | `10000` | 一言刷新间隔（秒） |
| `hero_background_image` | 附件 | — | 背景图片 |
| `hero_background_image_dark` | 附件 | — | 深色模式背景图片 |
| `hero_title_color_light` | 颜色 | — | 大标题颜色（浅色模式），留空使用主题默认 |
| `hero_title_color_dark` | 颜色 | — | 大标题颜色（深色模式），留空使用主题默认 |
| `hero_subtitle_color_light` | 颜色 | — | 副标题颜色（浅色模式），留空使用主题默认 |
| `hero_subtitle_color_dark` | 颜色 | — | 副标题颜色（深色模式），留空使用主题默认 |
| `hero_quote_color_light` | 颜色 | — | 一言文字颜色（浅色模式），留空使用主题默认 |
| `hero_quote_color_dark` | 颜色 | — | 一言文字颜色（深色模式），留空使用主题默认 |
| `hero_text_effect` | 下拉 | `none` | 文字显示效果：`none` / `shadow` / `glow` / `scrim` / `gradient` / `frame` |

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

控制 Hero 区域主标题下方显示的描述文案，提供三种模式，**默认为「无」**：

| 值 | 说明 |
| --- | --- |
| `none` | **默认**。不显示描述文案，不渲染一言元素，也不发起任何请求 |
| `hitokoto` | 显示一句话文案；自动填入官方接口 `https://v1.hitokoto.cn/`，清空该字段则使用内置本地句子库 |
| `custom` | 显示自定义的描述文案（静态文本，不发起任何请求） |

### 一言模式（hitokoto）

默认 `none` 时一言元素不渲染。切换到 `hitokoto` 后，设置项「自定义一言 API」自动填入
`https://v1.hitokoto.cn/`，浏览器会向该地址发起 GET 请求获取句子（第三方可见访客 IP / User-Agent）。
若把该字段清空，则回退到主题内置的本地句子库 `assets/data/hitokoto.json`
（随主题自托管的静态 JSON，零外部请求），每次刷新随机展示一条，也不会因为第三方接口不可用而出现空白。
可直接编辑该 JSON 替换成自己喜欢的句子。

#### 自定义一言 API（hero_hitokoto_api）

选择「一言」或「自定义」后才会显示该设置项。选择「一言」时自动填入 `https://v1.hitokoto.cn/`；
**选择「一言」或「自定义」后若留空，则使用主题内置的本地句子库（零外部请求）**。
**只有填写后才会向该地址发起请求**，需自行在站点隐私说明中披露，详见 README「外部资源与隐私」。
也可换成自建实例或其他兼容接口。

::: warning
这是站点管理员主动开启的可选能力。把描述文案来源改回「无」、或清空该字段即可随时停止外部请求，无需重装主题。
:::

#### 一言句子类型（hero_hitokoto_categories）

仅在填写了自定义 API 时生效，用于筛选该接口返回的句子类型，支持多选：

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

### 文字颜色

标题、副标题、一言的颜色均可分别配置浅色 / 深色模式的取值，留空使用主题默认：

- **`hero_title_color_light` / `hero_title_color_dark`** — 大标题颜色。
- **`hero_subtitle_color_light` / `hero_subtitle_color_dark`** — 副标题颜色。
- **`hero_quote_color_light` / `hero_quote_color_dark`** — 一言文字颜色（`hero_description_mode` 为 `hitokoto` 或 `custom` 时生效）。

### 文字显示效果（hero_text_effect）

为 Hero 文字（标题 / 副标题 / 一言）叠加辅助可读效果。**默认 `none` 不使用任何效果**——v1.2.0 起，文字周围默认不再有淡淡的白色散光投影：

| 值 | 效果 | 说明 |
| --- | --- | --- |
| `none` | 无效果（默认） | 纯净文字，无任何附加投影与衬底 |
| `shadow` | 阴影 | 文字下方叠加柔和的深色投影，适合复杂背景图 |
| `glow` | 光晕 | 文字周围叠加白色光晕，暗色背景图上更醒目 |
| `scrim` | 半透明遮罩层 | 文字背后垫一块毛玻璃圆角衬底，整体提升可读性 |
| `gradient` | 渐变遮罩 | 文字背后垫斜向渐变衬底，左深右浅自然过渡 |
| `frame` | 容器 | 把文字"装"进一个带半透明边框的圆角矩形，加大内边距与字距留白 |

::: tip
遮罩类（`scrim` / `gradient`）与容器（`frame`）作用于整个文字区块，浅色模式为白色系衬底、深色模式为黑色系衬底；`frame` 会在浅色模式下使用墨色描边、深色模式下使用白色描边。
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
