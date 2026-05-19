# 首页

首页是访客进入站点后看到的第一个内容页面（Hero 区域下方），以文章卡片列表为核心展示形式。WarmIsland 提供了丰富的首页配置选项，涵盖卡片信息展示、摘要行数、加载方式以及各种文案自定义。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `home_pinned_title` | 文本 | `置顶` | 置顶模块标题 |
| `home_posts_title` | 文本 | `文章` | 文章模块标题 |
| `home_card_show_visit` | 开关 | `true` | 文章卡片显示阅读量 |
| `home_card_show_wordcount` | 开关 | `true` | 文章卡片显示字数 |
| `home_card_show_category` | 开关 | `true` | 文章卡片显示分类 |
| `home_card_show_tags` | 开关 | `true` | 文章卡片显示标签 |
| `home_excerpt_lines` | 数字 | `3` | 文章简介显示行数 |
| `home_post_loading` | 下拉 | `pagination` | 文章加载方式：`pagination` / `infinite_scroll` |
| `home_label_newer` | 文本 | `较新` | 分页-较新标签 |
| `home_label_older` | 文本 | `较旧` | 分页-较旧标签 |
| `home_label_loading` | 文本 | `加载中...` | 无限滚动-加载中文案 |
| `home_label_all_loaded` | 文本 | `已加载全部文章` | 无限滚动-全部加载文案 |
| `home_label_no_posts` | 文本 | `暂无文章。` | 暂无文章文案 |
| `home_label_post_count` | 文本 | `共 {total} 篇文章` | 文章数量文案（`{total}` 为占位符） |

## 详细说明

### 模块标题

首页文章列表分为两个模块区域，各自拥有独立的标题：

- **`home_pinned_title`** — 置顶文章区域的标题，默认为「置顶」。只有存在置顶文章时此区域才会显示。
- **`home_posts_title`** — 普通文章区域的标题，默认为「文章」。

```yaml
# 英文站点示例
home_pinned_title: "Pinned"
home_posts_title: "Posts"
```

::: tip
置顶文章需要在 Halo 后台编辑文章时手动设置置顶属性。置顶文章会显示在列表最前方的独立区域中，与普通文章区域以标题分隔。
:::

### 文章卡片信息展示

通过四个开关控制文章卡片上显示的元信息：

| 配置项 | 说明 |
| --- | --- |
| `home_card_show_visit` | 显示文章阅读量（依赖 Halo 统计功能） |
| `home_card_show_wordcount` | 显示文章字数统计 |
| `home_card_show_category` | 显示文章所属分类 |
| `home_card_show_tags` | 显示文章标签列表 |

::: tip
关闭不需要的元信息可以让卡片更简洁，在移动端尤其有效。建议至少保留分类或标签中的一项，帮助访客快速了解文章主题。
:::

### 文章简介显示行数（home_excerpt_lines）

控制文章卡片中摘要文本的最大显示行数。超出部分会被截断并显示省略号。

- 设为 `0` 时不显示摘要
- 设为 `2`–`3` 适合紧凑布局
- 设为 `4`–`5` 适合需要更多预览内容的场景

```yaml
home_excerpt_lines: 3  # 默认，显示 3 行摘要
```

::: warning
此设置使用 CSS `-webkit-line-clamp` 实现多行截断，在所有现代浏览器中均可正常工作。摘要内容来自 Halo 后台文章编辑时的「摘要」字段，如未填写则自动从正文提取。
:::

### 文章加载方式（home_post_loading）

| 值 | 说明 |
| --- | --- |
| `pagination` | 传统分页，页面底部显示「较新/较旧」导航按钮（默认） |
| `infinite_scroll` | 无限滚动，滚动到底部自动加载下一页文章 |

#### 分页模式文案

选择 `pagination` 模式时，可自定义分页按钮的文案：

- **`home_label_newer`** — 指向较新文章的按钮文案，默认「较新」
- **`home_label_older`** — 指向较旧文章的按钮文案，默认「较旧」

#### 无限滚动模式文案

选择 `infinite_scroll` 模式时，可自定义加载状态的文案：

- **`home_label_loading`** — 正在加载时的提示文案，默认「加载中...」
- **`home_label_all_loaded`** — 所有文章加载完毕后的提示文案，默认「已加载全部文章」

```yaml
# 英文站点示例
home_post_loading: pagination
home_label_newer: "Newer"
home_label_older: "Older"

# 或使用无限滚动
home_post_loading: infinite_scroll
home_label_loading: "Loading..."
home_label_all_loaded: "All posts loaded"
```

### 暂无文章文案（home_label_no_posts）

当站点没有任何已发布文章时，首页文章区域显示的提示文案。

### 文章数量文案（home_label_post_count）

显示在文章列表上方的文章总数统计文案。`{total}` 是占位符，会被替换为实际的文章数量。

```yaml
# 默认
home_label_post_count: "共 {total} 篇文章"
# 显示效果：共 12 篇文章

# 英文示例
home_label_post_count: "{total} posts in total"
# 显示效果：12 posts in total
```

::: tip
`{total}` 占位符是必须的，如果文案中不包含此占位符，文章数量将无法正确显示。
:::

## 页面布局结构

首页的整体布局从上到下依次为：

```
┌─────────────────────────────┐
│         Hero 首屏区域        │  ← 可选，参见 Hero 配置
├─────────────────────────────┤
│     置顶模块标题（置顶）      │  ← home_pinned_title
│  ┌─────┐ ┌─────┐ ┌─────┐   │
│  │置顶1 │ │置顶2 │ │置顶3 │   │  ← 置顶文章卡片
│  └─────┘ └─────┘ └─────┘   │
├─────────────────────────────┤
│     文章模块标题（文章）      │  ← home_posts_title
│  ┌─────┐ ┌─────┐ ┌─────┐   │
│  │文章1 │ │文章2 │ │文章3 │   │  ← 普通文章卡片
│  └─────┘ └─────┘ └─────┘   │
│  ┌─────┐ ┌─────┐ ┌─────┐   │
│  │文章4 │ │文章5 │ │文章6 │   │
│  └─────┘ └─────┘ └─────┘   │
├─────────────────────────────┤
│     较新 ← → 较旧           │  ← 分页导航（或无限滚动）
└─────────────────────────────┘
```

::: tip
文章卡片在桌面端以多列网格排列，在平板和移动端自动调整为单列或双列布局，确保在各种屏幕尺寸下的阅读体验。
:::

## 相关页面

- [Hero 首屏](/config/hero) — Hero 区域配置
- [文章](/config/article) — 文章详情页配置
- [样式设置](/config/style) — 容器宽度与动画效果配置
- [首页页面](/pages/home) — 首页模板与结构说明
