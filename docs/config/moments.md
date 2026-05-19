# 瞬间

瞬间是 WarmIsland 主题支持的内容模块之一，用于发布简短的想法、动态和碎片化内容。类似于社交媒体的「朋友圈」或「微博」，适合记录日常灵感和即时想法。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `moments_page_title` | 文本 | `瞬间` | 页面标题 |
| `moments_style` | 下拉 | `timeline` | 展示样式：`timeline` / `cards` / `masonry` |
| `moments_loading_mode` | 下拉 | `infinite_scroll` | 加载方式：`infinite_scroll` / `pagination` |
| `moments_page_size` | 数字 | `10` | 每页显示数量 |

## 前置依赖

::: danger
瞬间功能依赖 Halo 的 **PluginMoments** 插件。如果未安装此插件，瞬间页面将无法正常工作。

安装方式：Halo 后台 → **插件** → **安装** → 搜索「Moments」→ 安装并启用。
:::

## 详细说明

### 页面标题（moments_page_title）

瞬间页面的标题，显示在页面顶部。可以根据个人偏好自定义：

```yaml
moments_page_title: "瞬间"       # 默认
moments_page_title: "动态"       # 替代方案
moments_page_title: "Moments"    # 英文站点
```

### 展示样式（moments_style）

| 值 | 说明 |
| --- | --- |
| `timeline` | 时间线样式，按时间顺序垂直排列，左侧有时间轴连线（默认） |
| `cards` | 卡片样式，以网格卡片形式展示，每条瞬间独立成卡 |
| `masonry` | 瀑布流样式，类似 Pinterest 的错落排列，适合图片较多的瞬间 |

::: tip
如果你的瞬间以文字为主，推荐 `timeline` 样式，时间感更强；如果图片较多，推荐 `masonry` 样式，能更好地展示图片内容。
:::

### 加载方式（moments_loading_mode）

| 值 | 说明 |
| --- | --- |
| `infinite_scroll` | 无限滚动，滚动到底部自动加载更多（默认） |
| `pagination` | 传统分页，页面底部显示分页导航 |

### 每页显示数量（moments_page_size）

每次加载/每页显示的瞬间数量。默认为 10 条。

- 设为较小值（5–8）可加快首屏加载速度
- 设为较大值（15–20）可减少翻页/加载次数

```yaml
moments_page_size: 10  # 默认
```

## 内置功能

### 图片网格

瞬间中包含的多张图片会以网格形式排列展示，自动计算列数和尺寸，确保图片不变形。

### 点赞与评论

每条瞬间支持点赞和评论功能，由 Halo 核心和 PluginMoments 插件提供。

### 图片灯箱

瞬间中的图片支持点击放大查看，基于 LightGallery 实现，与文章详情页的灯箱体验一致。

## 相关页面

- [图库](/config/photos) — 图库页面配置
- [评论](/config/comment) — 评论样式配置
- [瞬间页面](/pages/moments) — 瞬间模板与结构说明
