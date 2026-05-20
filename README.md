# WarmIsland 暖屿

暖如灯火，静如留白。暖屿以柔和的色调和舒缓的节奏回归内容本身，为记录与阅读留出一方安静从容的角落。

> 本项目由 AI 开发完成，人工仅进行部分功能测试及问题找寻

## 特点

1. **响应式设计** — 适配桌面端与移动端，支持暗色模式
2. **插件兼容性** — 适配 8 款常用 Halo 插件，安装即用
3. **内置灯箱** — 主题内置 LightGallery 灯箱，支持 EXIF 信息展示；安装 lightgallery.js 插件后自动禁用内置灯箱
4. **可配置性** — 丰富的后台设置项，支持自定义首页模块、文章卡片、导航栏样式等
5. **性能优化** — 图片懒加载、CSS/HTML 压缩、requestAnimationFrame 节流、Vue 组件按需加载

## 预览

![WarmIsland Preview](./public/WarmIsland%20Preview.webp)

## 已适配插件

| 插件名称 | 插件标识 | 适配页面路由 | 说明 |
|----------|---------|-------------|------|
| [瞬间](https://halo.run/store/apps/app-SnwWD) | `PluginMoments` | `/moments` | 瞬间动态页面，支持点赞、评论、标签筛选 |
| [图库](https://halo.run/store/apps/app-BmQJW) | `PluginPhotos` | `/photos` | 图片展示页面，支持分组、灯箱预览 |
| [友情链接](https://halo.run/store/apps/app-hqbe) | `PluginLinks` | `/links` | 友链展示页面，支持分组展示 |
| [朋友圈](https://github.com/halo-sigs/plugin-friends) | `plugin-friends` | `/friends` | RSS 订阅朋友圈页面 |
| [装备管理](https://github.com/chengzhongxue/plugin-equipment) | `equipment` | `/equipments` | 装备展示页面，按分组展示，支持封面图 |
| [豆瓣](https://github.com/chengzhongxue/plugin-douban) | `plugin-douban` | `/douban` | 豆瓣记录页面，支持类型/状态/标签筛选，默认电影 |
| [Steam 信息展示](https://github.com/Tim0x0/halo-plugin-steam) | `PluginSteam` | `/steam` | Steam 游戏库页面，含用户资料、统计数据、最近游玩、游戏库分页 |

> **注意**：插件需要单独安装，安装后主题会自动适配对应页面。若未安装某插件，对应页面不会出现。

## 灯箱集成

主题内置 LightGallery 灯箱，为图片提供放大预览功能，并支持 EXIF 信息展示。

### lightgallery.js 插件兼容

如安装 [lightgallery.js](https://www.lightgalleryjs.com/) 灯箱插件，主题内置灯箱将自动禁用，改由插件接管灯箱功能。以下为 lightgallery.js 插件的路径匹配规则和 DOM 节点选择器：

| 页面 | 路径匹配规则 | 匹配区域 DOM 节点 |
|------|-------------|-------------------|
| 文章详情页 | `/archives/*` | `.wi-post__body` |
| 瞬间页 | `/moments` | `.wi-moments-page__content` |
| 图库页 | `/photos` | `.wi-photos-page__grid` |
| 自定义页面 | 用户自定义 | `.wi-page__body` |

> **注意**：自定义页面的路径匹配由用户自行设定，此处仅提供 DOM 节点选择器 `.wi-page__body`。

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
