# WarmIsland 暖屿

一座深夜里温暖、安静、治愈的小岛 — 具有独特气质的生活博客主题。

> 本项目由AI开发完成，人工仅进行部分功能测试及问题找寻

## 已适配插件

| 插件名称 | 插件标识 | 适配页面路由 | 说明 |
|----------|---------|-------------|------|
| [瞬间](https://halo.run/store/apps/app-SnwWD) | `PluginMoments` | `/moments` | 瞬间动态页面，支持点赞、评论、标签筛选 |
| [图库](https://halo.run/store/apps/app-BmQJW) | `PluginPhotos` | `/photos` | 图片展示页面，支持分组、灯箱预览 |
| [友情链接](https://halo.run/store/apps/app-hqbe) | `PluginLinks` | `/links` | 友链展示页面，支持分组展示 |
| [朋友圈](https://github.com/halo-sigs/plugin-friends) | `plugin-friends` | `/friends` | RSS 订阅朋友圈页面 |
| [我的装备](https://github.com/halo-sigs/plugin-equipment) | `equipment` | `/equipment` | 装备展示页面，支持分组展示 |

> **注意**：插件需要单独安装，安装后主题会自动适配对应页面。若未安装某插件，对应页面会显示提示信息。

## 安装

1. 下载主题最新 Release 的 ZIP 包
2. 进入 Halo 后台 → 主题管理 → 安装主题 → 上传 ZIP 包
3. 安装完成后点击「启用」

或从源码构建：

```bash
git clone https://github.com/warm-island/theme-warm-island.git
cd theme-warm-island
npm install
npm run build
```

构建产物在 `templates/` 目录下，将其复制到 Halo 主题目录即可。

## lightgallery.js 灯箱插件集成

如果你使用 [lightgallery.js](https://www.lightgalleryjs.com/) 灯箱插件来为图片添加放大预览功能，以下是各页面的路径匹配规则和 DOM 节点选择器：

### 路径匹配与 DOM 节点

| 页面 | 路径匹配规则 | 匹配区域 DOM 节点 |
|------|-------------|-------------------|
| 文章详情页 | `/archives/*` | `.wi-post__body` |
| 瞬间页 | `/moments` | `.wi-moments-page__content` |
| 图库页 | `/photos` | `.wi-photos-page__grid` |
| 自定义页面 | 用户自定义 | `.wi-page__body` |

> **注意**：自定义页面的路径匹配由用户自行设定，此处仅提供 DOM 节点选择器 `.wi-page__body`。

## 开发

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 构建
npm run build
```

## 技术栈

- [Halo](https://halo.run) 2.24+
- [Astro](https://astro.build) + [vite-plugin-halo-theme](https://github.com/halo-sigs/vite-plugin-halo-theme)
- [Thymeleaf](https://www.thymeleaf.org) 模板引擎
- [Vue 3](https://vuejs.org) Islands 交互组件

## 许可

[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)
