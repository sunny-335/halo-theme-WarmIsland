# 自定义 CSS

WarmIsland 主题提供了灵活的自定义 CSS 能力，让你无需修改源码即可调整主题外观。

## 两种方法

### 方法一：主题设置（推荐）

在 Halo 后台 → **外观** → **主题** → **样式设置** 中找到「自定义 CSS」字段，直接输入 CSS 代码。

**优点**：
- 随主题数据保存，升级主题不丢失
- 无需额外的网络请求
- 实时生效

**缺点**：
- 不适合大量 CSS 代码
- 没有语法高亮和自动补全

### 方法二：外部 CSS 文件

在 Halo 后台 → **外观** → **主题** → **页脚设置** 中的「自定义 HTML」字段引入外部 CSS：

```html
<link rel="stylesheet" href="https://your-cdn.com/custom.css" />
```

**优点**：
- 可以使用代码编辑器编写，有完整的开发体验
- 适合大量自定义样式
- 可以版本控制

**缺点**：
- 需要额外的网络请求
- 需要自己托管 CSS 文件
- 主题升级后需要检查兼容性

## 实用示例

### 更改强调色

将默认的赤陶橙改为玫瑰粉：

```css
:root {
  --accent: #e85d75;
  --accent-hover: #d44a64;
  --accent-bg: #fdf0f3;
}

html.dark {
  --accent: #f07090;
  --accent-hover: #f5889f;
  --accent-bg: #2a1a1e;
}
```

改为薄荷绿：

```css
:root {
  --accent: #3d9970;
  --accent-hover: #2d8060;
  --accent-bg: #edf7f2;
}

html.dark {
  --accent: #5cb895;
  --accent-hover: #72c8a8;
  --accent-bg: #1a2a22;
}
```

改为靛蓝：

```css
:root {
  --accent: #5b6abf;
  --accent-hover: #4a59ae;
  --accent-bg: #eef0f8;
}

html.dark {
  --accent: #7b8ad0;
  --accent-hover: #95a0dd;
  --accent-bg: #1e1e2a;
}
```

::: tip
更改强调色时，需要同时修改 `--accent`、`--accent-hover` 和 `--accent-bg` 三个变量，并分别为浅色和深色模式设置。
:::

### 更改字体

#### 使用 Google Fonts CDN 引入字体

在「自定义 HTML」中添加：

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=LXGW+WenKai:wght@400;700&display=swap" rel="stylesheet" />
```

在「自定义 CSS」中覆盖字体变量：

```css
:root {
  --font-sans: 'LXGW WenKai', serif;
  --font-body: 'LXGW WenKai', sans-serif;
}
```

#### 使用国内 CDN 镜像

如果 Google Fonts 访问不稳定，可以使用国内镜像：

```html
<link href="https://fonts.loli.net/css2?family=LXGW+WenKai:wght@400;700&display=swap" rel="stylesheet" />
```

其他可用的国内镜像：

| 镜像 | 地址 |
|------|------|
| loli.net | `https://fonts.loli.net` |
| fonts.font.im | `https://fonts.font.im` |

#### 仅更改标题字体

```css
:root {
  --font-sans: 'LXGW WenKai', serif;
}
```

#### 仅更改正文字体

```css
:root {
  --font-body: 'LXGW WenKai', sans-serif;
}
```

### 增加行高

如果觉得正文行高偏小，可以增加：

```css
:root {
  --leading-relaxed: 2;
}
```

或直接针对文章正文：

```css
.wi-post__content {
  line-height: 2;
}
```

### 隐藏元素

#### 隐藏阅读进度条

```css
.wi-reading-progress {
  display: none !important;
}
```

#### 隐藏文章点赞按钮

```css
.wi-post__like {
  display: none !important;
}
```

#### 隐藏文章上下篇导航

```css
.wi-post__nav {
  display: none !important;
}
```

#### 隐藏 Hero 区域

```css
.wi-hero {
  display: none !important;
}
```

#### 隐藏页脚

```css
.wi-footer {
  display: none !important;
}
```

### 自定义卡片样式

#### 增加卡片圆角

```css
.wi-card {
  border-radius: 20px !important;
}
```

#### 卡片添加边框

```css
.wi-card {
  border: 1px solid var(--rule) !important;
}
```

#### 卡片悬停变色

```css
.wi-card:hover {
  background: var(--accent-bg) !important;
}
```

### 自定义 Hero 区域

#### 更改 Hero 背景渐变

```css
.wi-hero {
  background: linear-gradient(135deg, #faf7f2 0%, #e8d5c4 50%, #d4a98e 100%) !important;
}

html.dark .wi-hero {
  background: linear-gradient(135deg, #1a1614 0%, #2a2018 50%, #3a2e22 100%) !important;
}
```

#### 隐藏 Hero 光球动画

```css
.wi-hero__orb {
  display: none !important;
}
```

#### 调整 Hero 标题大小

```css
.wi-hero__title {
  font-size: clamp(2.5rem, 2rem + 4vw, 4.5rem) !important;
}
```

## 注意事项

### 特异性问题

主题的 CSS 经过构建后具有较高的特异性。如果你的自定义样式不生效，可以：

1. **使用 `!important`**：简单粗暴但有效
2. **增加选择器特异性**：如 `body .wi-card` 代替 `.wi-card`
3. **使用 `:where()` 降权**：如果主题使用了 `:where()`，你可以直接覆盖

### 深色模式兼容

::: warning 重要
自定义 CSS 时务必同时考虑深色模式！使用 `html.dark` 选择器为深色模式提供对应的样式。
:::

```css
.wi-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
}

html.dark .wi-card {
  background: #242018;
  border: 1px solid #2e2822;
}
```

### 主题升级兼容

- 优先使用 CSS 变量覆盖而非直接修改元素样式
- 避免依赖主题内部的类名结构（可能随版本变化）
- 使用 `!important` 时添加注释说明原因

### 性能考虑

- 避免使用过多的 `!important`
- 外部 CSS 文件建议压缩后部署
- 避免使用 `*` 通配符选择器
