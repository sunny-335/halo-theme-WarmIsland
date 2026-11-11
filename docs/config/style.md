# 样式设置

样式设置控制 WarmIsland 主题的全局视觉表现，包括配色方案、强调色、圆角风格、容器宽度、动画效果以及自定义 CSS。通过这些配置，你可以快速打造出独一无二的站点外观。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `color_scheme` | 单选 | `system` | 配色方案：`system` / `light` / `dark` |
| `color_palette` | 下拉 | `warm-island` | 主题配色（官方预设调色板，含深浅两套色板） |
| `accent_color` | 颜色 | — | 自定义强调色；留空跟随所选主题配色 |
| `border_radius` | 下拉 | `medium` | 圆角风格：`small` / `medium` / `large` |
| `layout_container_width` | 下拉 | `medium` | 容器宽度：`narrow` / `medium` / `wide` |
| `animation_enabled` | 开关 | `true` | 全局动画总开关 |
| `animation_breath` | 开关 | `true` | 呼吸动画效果 |
| `animation_scroll_reveal` | 开关 | `true` | 滚动渐入动画 |
| `click_effect_enabled` | 开关 | `false` | 鼠标点击效果总开关 |
| `click_effect_type` | 下拉 | `values` | 点击效果类型（8 种效果 + 关闭，仅在总开关开启时显示） |
| `custom_css` | 代码 | — | 自定义 CSS 代码 |

## 详细说明

### 配色方案（color_scheme）

控制站点的明暗模式，提供三种选择：

| 值 | 说明 |
| --- | --- |
| `system` | 跟随系统偏好，自动适配用户操作系统的深色/浅色模式设置 |
| `light` | 始终使用浅色模式 |
| `dark` | 始终使用深色模式 |

::: tip
选择 `system` 时，主题会监听操作系统的 `prefers-color-scheme` 媒体查询，实时响应用户的系统设置变化。访问者也可以通过导航栏的主题切换按钮手动覆盖当前模式。
:::

### 主题配色（color_palette）

v1.2.0 起主题内置配色系统，提供 11 套官方预调配色，每套均包含浅色与深色两套完整色板（背景、文字、分隔线、强调色、玻璃拟态、阴影色调等会整体联动）：

| 值 | 名称 | 色彩倾向 |
| --- | --- | --- |
| `warm-island` | 暖屿 · 赤陶（默认） | 暖橘陶土，米白纸感 |
| `matcha` | 抹茶 | 清新草绿，米绿纸感 |
| `indigo` | 黛蓝 | 沉稳蓝调，冷白纸感 |
| `sakura` | 樱粉 | 柔和粉调，樱白纸感 |
| `violet` | 暮紫 | 温柔紫调，淡紫纸感 |
| `sea` | 海盐 | 青碧蓝绿，浅青纸感 |
| `amber` | 琥珀 | 蜂蜜金黄，暖黄纸感 |
| `plum` | 梅酒 | 酒红梅紫，粉白纸感 |
| `graphite` | 石墨 | 中性灰黑，极简无彩 |
| `cocoa` | 可拿铁 | 咖啡可可，奶咖纸感 |
| `azure` | 天青 | 明快天蓝，浅蓝纸感 |

::: warning
下方「强调色」留空时，将使用所选配色自带的强调色。**老站点升级前如果保存过强调色（默认 `#d4764e`），切换配色后强调色不会变化——清空强调色并保存即可恢复跟随配色。**
:::

### 强调色（accent_color）

强调色是 WarmIsland 主题的灵魂，它会影响全站以下元素的颜色：

- 链接悬停色
- 按钮背景色
- 标签高亮色
- 进度条颜色
- 选中状态颜色
- Hero 区域渐变色的组成部分

留空时跟随上方「主题配色」自带的强调色（暖屿·赤陶配色即 `#d4764e` 暖橘色）。

::: tip
选择强调色时，建议同时考虑浅色和深色模式下的可读性。可以在 [CSS 变量](/customize/css-variables) 页面查看所有受影响的变量，进行更精细的调整。
:::

```yaml
# 常见强调色参考
accent_color: "#d4764e"  # 暖橘（默认）
accent_color: "#6366f1"  # 靛蓝
accent_color: "#10b981"  # 翠绿
accent_color: "#f43f5e"  # 玫红
accent_color: "#8b5cf6"  # 紫罗兰
```

### 圆角风格（border_radius）

控制全站组件的圆角大小，影响卡片、按钮、输入框等元素：

| 值 | 说明 | 适用场景 |
| --- | --- | --- |
| `small` | 小圆角，偏硬朗风格 | 技术博客、极简风格 |
| `medium` | 中等圆角，平衡美观与严谨 | 通用场景（默认） |
| `large` | 大圆角，柔和亲切 | 生活博客、个人日记 |

### 容器宽度（layout_container_width）

控制页面主内容区域的最大宽度：

| 值 | 说明 |
| --- | --- |
| `narrow` | 窄容器，适合以文字阅读为主的站点 |
| `medium` | 中等宽度，兼顾阅读体验与信息密度（默认） |
| `wide` | 宽容器，适合图片较多的站点或需要更大展示空间的场景 |

### 动画效果

WarmIsland 提供了丰富的动画效果，所有动画都可以独立开关：

#### 全局动画总开关（animation_enabled）

关闭后，以下所有动画效果将一并禁用。适合追求极致性能或偏好静态页面的用户。

#### 呼吸动画（animation_breath）

启用后，Hero 区域的背景光球会产生缓慢的呼吸脉动效果，营造温暖柔和的氛围感。光球的大小和透明度会周期性变化。

#### 滚动渐入（animation_scroll_reveal）

启用后，页面元素在滚动进入视口时会以淡入+上移的方式渐次出现，增强浏览的节奏感。

::: tip
滚动渐入动画基于 Intersection Observer API 实现，对性能影响极小。如果页面内容较多，建议保持开启以提升浏览体验。
:::

#### 鼠标点击效果（click_effect_enabled / click_effect_type）

`click_effect_enabled` 默认关闭；开启后 `click_effect_type` 才会显示，可选 8 种效果：
社会主义核心价值观、随机彩色爱心、烟花、烟花波纹、粒子、星星、星星拖尾、粒子拖尾，
另可选「关闭」。特效在访客点击时由浏览器本地绘制，不加载远程脚本、不发送任何数据。

### 自定义 CSS（custom_css）

在此处编写自定义 CSS 代码，会注入到全站所有页面的 `<style>` 标签中。可以用来覆盖主题默认样式或添加全新样式。

```css
/* 示例：自定义卡片悬停效果 */
.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* 示例：隐藏特定元素 */
.hero-scroll-indicator {
  display: none;
}
```

::: tip
如需更系统地自定义样式，推荐使用 [CSS 变量](/customize/css-variables) 方式，只需修改变量值即可影响全站，无需逐个覆盖选择器。详见 [自定义 CSS](/customize/custom-css) 页面。
:::

## 相关页面

- [CSS 变量](/customize/css-variables) — 全部可用的 CSS 变量列表
- [自定义 CSS](/customize/custom-css) — 深入了解自定义样式的方法
- [基础设置](/config/basic) — 站点名称、Logo 等基础信息配置
- [导航栏](/config/navbar) — 导航栏样式与功能配置
