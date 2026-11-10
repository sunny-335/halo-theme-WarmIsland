# 开发指南

本文档面向 WarmIsland 主题的开发者，介绍如何搭建开发环境、构建主题以及参与贡献。

## 环境要求

| 工具 | 最低版本 | 推荐版本 |
|------|----------|----------|
| Node.js | 22.12.x | 22.x LTS |
| pnpm | 12.x | 12.x |
| Git | 2.x | 最新 |

### 安装 pnpm

```bash
npm install -g pnpm
```

### 验证环境

```bash
node -v    # v22.x.x（需 >= 22.12.0）
pnpm -v    # 12.x.x
git --version  # git version 2.x.x
```

## 克隆与安装

```bash
git clone https://git.nxxy335.top/nxxy335/halo-theme-WarmIsland.git
cd halo-theme-WarmIsland
pnpm install
```

## 开发模式

`pnpm dev` 用 nodemon 监听 `src/`、`public/`、`settings.yaml` 等文件的变化，
每次变化自动执行一次 `astro build`，把结果写入 `templates/`。
本项目是「静态模板产物 + Halo 运行时渲染」模式，没有 Astro 开发服务器，
也不依赖 `vite-plugin-halo-theme`；本地预览请直接用 Halo 实例加载 `templates/`。

## 构建

### 生产构建

```bash
pnpm build
```

构建产物位于 **`templates/`**（21 个 `.html` 模板 + `assets/` 静态资源），
并由 `scripts/postbuild.mjs` 合并 `compat/assets` 中的历史哈希资源、校验资源引用。
注意：`pnpm build` **不会**生成 ZIP 安装包。

### 打包主题

```bash
pnpm release          # 推荐：build → snapshot → package
# 或分步：pnpm build && pnpm snapshot && pnpm package
```

生成 `dist/warm-island-<version>.zip`，可直接在 Halo 后台上传安装。
ZIP 根目录直接放 `theme.yaml` / `settings.yaml` / `templates/`，不要额外套一层目录。

> **`templates/` 被 `.gitignore` 忽略**，克隆仓库后默认不存在。若跳过 `pnpm build`
> 直接 `pnpm package`，过去会产出不含任何模板的空壳包，上传后 Halo 报
> `Template index was not found.` 并让首页 404。现在打包脚本会先校验
> `index.html` 等模板、资源目录与版本号，不满足即报错退出。

## 性能与滚动顺滑

首页滚动曾经卡顿，根因不是 DOM 数量，而是「每帧高成本绘制 + 劫持滚动输入」：

| 问题 | 原因 | 现在的做法 |
|------|------|------------|
| 全屏模糊逐帧重算 | 滚动回调每帧改写 `backdrop-filter: blur(Npx)`，Chromium 每帧重做一次全屏背景采样 + 高斯模糊 | 模糊半径固定，滚动只改整层 `opacity`（合成层操作） |
| 吸附吞掉滚动惯性 | 旧实现在 `wheel` / `touchend` 上 `preventDefault()` 并固定锁 800ms | 保留整屏吸附，但只在 `0 ↔ 内容区顶部` 边界接管一次；进入内容区后完全交给原生滚动。解锁用 `scrollend` + 600ms 兜底，已在目标位置时不再接管 |
| Hero 一直绘制 | 固定全屏 Hero 的光球动画与模糊层在滚过首屏后仍在跑 | 内容区盖满视口后加 `wi-hero--offscreen` 隐藏并暂停动画 |
| 状态反复写入 | 导航栏每个滚动帧都 `classList.add/remove` | 缓存状态，只在变化时写 |

**为什么吸附不用 CSS `scroll-snap`**：v1.2.5 初版试过 `html { scroll-snap-type: y proximity }`
加内容区 `scroll-snap-align: start`，实际几乎不吸附——只有内容区顶部一个吸附点，页面顶部
`0` 没有吸附点，`proximity` 只在滚动结束位置接近吸附点时才生效；换成 `mandatory` 则会在
长内容的每次滚动后把页面拉回内容区顶部，正文无法阅读。`prefers-reduced-motion` 下 CSS 方案
还会直接关闭吸附。因此改为脚本的边界吸附，CSS 侧不再设置 `scroll-snap`，避免与 `scrollTo`
平滑动画抢夺滚动位置。

涉及文件：`src/pages/index.astro`（滚动渐隐 + 边界吸附脚本）、`src/components/HeroSection.astro`（模糊层与离屏规则）、
`src/components/Navbar.astro`（状态去重）、`src/styles/main.scss`（平滑滚动与 reduced-motion）。

**可调项**：后台「总体样式 → 启用动效」可一键关闭滚动渐入，「Hero 首屏」可关闭整个 Hero；
系统开启「减少动态效果」（`prefers-reduced-motion: reduce`）时，平滑滚动与光球 / 箭头动画停用，
吸附改为即时定位（仍然可用）。长列表使用 `content-visibility: auto` 跳过视口外渲染，
图片统一 `loading="lazy" decoding="async"`。

> 改动滚动逻辑后建议用浏览器 Performance 面板录制一次首页滚动：滚动帧里不应出现大面积
> `Paint` / `Update Layer Tree`；也不要在 `scroll` 回调里读取 `getBoundingClientRect()` 之类
> 会强制同步布局的属性（当前实现只在初始化 / resize 时测量内容区位置）。

## 项目结构

```
WarmIsland/
├── src/                          # 源代码
│   ├── components/               # Astro 组件
│   │   ├── HeroSection.astro     # Hero 首屏
│   │   ├── PostCard.astro        # 文章卡片
│   │   ├── Pagination.astro      # 分页组件
│   │   ├── TableOfContents.astro # 目录组件
│   │   ├── ReadingProgress.astro # 阅读进度条
│   │   ├── LikeButton.astro      # 点赞按钮
│   │   ├── CommentSection.astro  # 评论区
│   │   ├── Footer.astro          # 页脚
│   │   └── ...
│   ├── layouts/                  # 布局组件
│   │   ├── BaseLayout.astro      # 基础布局
│   │   └── PostLayout.astro      # 文章布局
│   ├── lib/                      # 工具库
│   │   ├── pages.ts              # 页面路由定义
│   │   └── utils.ts              # 工具函数
│   ├── pages/                    # 页面入口
│   │   ├── index.astro           # 首页
│   │   ├── post.astro            # 文章详情
│   │   ├── archives.astro        # 归档
│   │   ├── categories.astro      # 分类
│   │   ├── tags.astro            # 标签
│   │   ├── moments.astro         # 瞬间
│   │   ├── photos.astro          # 图库
│   │   ├── links.astro           # 友情链接
│   │   ├── friends.astro         # 朋友圈
│   │   ├── page.astro            # 自定义页面
│   │   ├── page_messageboard.astro # 留言板
│   │   ├── douban.astro          # 豆瓣
│   │   ├── equipments.astro      # 装备
│   │   ├── footprints.astro      # 足迹
│   │   └── steam.astro           # Steam
│   └── styles/                   # 样式文件
│       ├── main.scss             # 主样式入口
│       ├── _variables.scss       # SCSS 变量
│       ├── _colors.scss          # 颜色定义
│       ├── _typography.scss      # 排版
│       ├── _spacing.scss         # 间距
│       ├── _animations.scss      # 动画
│       ├── _mixins.scss          # 混入
│       └── components/           # 组件样式
├── templates/                    # Thymeleaf 模板（构建输出）
├── public/                       # 静态资源
│   └── assets/                   # 编译后的 CSS/JS
├── docs/                         # 文档
├── theme.yaml                    # 主题元信息
├── settings.yaml                 # 主题设置定义
├── astro.config.mjs              # Astro 配置
├── package.json                  # 项目依赖
├── tsconfig.json                 # TypeScript 配置
└── vite.config.ts                # Vite 配置
```

## 技术栈

### 核心框架

| 技术 | 版本 | 用途 |
|------|------|------|
| [Halo](https://www.halo.run/) | 2.27+ | 博客运行时，提供 Finder API 与主题渲染 |
| [Astro](https://astro.build) | 6.x | 组件开发，构建输出静态 `.html` 模板 |
| [Thymeleaf](https://www.thymeleaf.org/) | - | Halo 服务端模板引擎（源码里直接写 `th:*`） |

### 前端技术

| 技术 | 用途 |
|------|------|
| [SCSS](https://sass-lang.com/) | 样式预处理，CSS 变量驱动的配色系统 |
| 原生 JavaScript | 滚动、菜单、主题切换、无限滚动等交互，无前端框架运行时 |
| [LightGallery](https://www.lightgalleryjs.com/) | 图片灯箱（可选） |
| Halo 插件生态 | 评论、代码高亮、服务端字数统计等由 Halo 与可选插件提供 |

### 构建工具

| 技术 | 用途 |
|------|------|
| [Vite](https://vitejs.dev/)（Astro 内置） | 资源打包与内容哈希 |
| [pnpm](https://pnpm.io/) | 包管理 |
| [TypeScript](https://www.typescriptlang.org/) | 类型定义（`env.d.ts` / `pages.ts`） |

## 模板语法

WarmIsland 使用 Astro 编写组件，构建后输出为 Thymeleaf 模板供 Halo 使用。

### Astro 组件 → Thymeleaf 模板

Astro 组件里直接书写 Thymeleaf 属性（`th:*`），构建时原样保留并输出成 `.html` 模板，
由 Halo 在运行时渲染：

```astro
---
// Astro 前置脚本
const title = "Hello";
---
<h1>{title}</h1>
```

转换为 Thymeleaf：

```html
<h1 th:text="${title}">Hello</h1>
```

### Halo Finder API

在模板中使用 Halo 的 Finder API 获取数据：

```html
<!-- 获取文章列表 -->
<th:block th:each="post : ${postFinder.list(1, 10)}">
  <a th:href="@{${post.status.permalink}}" th:text="${post.spec.title}"></a>
</th:block>

<!-- 获取分类 -->
<th:block th:each="category : ${categoryFinder.listAll()}">
  <span th:text="${category.spec.displayName}"></span>
</th:block>

<!-- 获取标签 -->
<th:block th:each="tag : ${tagFinder.listAll()}">
  <span th:text="${tag.spec.displayName}"></span>
</th:block>
```

### Vue 3 交互组件

需要客户端交互的组件使用 Vue 3 编写，通过 `<script>` 标签引入：

```html
<div id="toc-app"></div>
<script type="module" src="/assets/js/toc.js"></script>
```

## Docker 部署

### 构建镜像

```bash
docker build -t warmisland-theme .
```

### 运行

```bash
docker run -d \
  --name warmisland \
  -p 8090:8090 \
  -v ~/.halo2:/root/.halo2 \
  warmisland-theme
```

### Docker Compose

```yaml
version: '3'
services:
  halo:
    image: warmisland-theme
    ports:
      - "8090:8090"
    volumes:
      - ./halo2:/root/.halo2
    restart: unless-stopped
```

## 贡献指南

### 提交 Issue

- 使用 GitHub Issues 提交 Bug 报告或功能建议
- 请提供详细的复现步骤和环境信息
- 附上截图或错误日志

### 提交 Pull Request

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'feat: add your feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 提交 Pull Request

### Commit 规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 Bug |
| `docs` | 文档更新 |
| `style` | 样式调整（不影响功能） |
| `refactor` | 代码重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具变更 |

## 代码规范

### BEM 命名

WarmIsland 使用 BEM（Block Element Modifier）命名规范，前缀为 `wi-`：

```
.wi-block
.wi-block__element
.wi-block__element--modifier
```

**示例**：

```css
.wi-post { }                    /* Block */
.wi-post__title { }             /* Element */
.wi-post__title--large { }      /* Modifier */
.wi-post__content { }           /* Element */
.wi-post__meta { }              /* Element */
.wi-post__meta-item { }         /* Element */
.wi-post__like { }              /* Element */
.wi-post__like--active { }      /* Modifier */
```

### SCSS 规范

- 使用 SCSS 变量（`$variable`）定义设计 token
- 使用 CSS 变量（`--variable`）暴露可覆盖的值
- 嵌套不超过 3 层
- 使用 `@mixin` 封装复用样式
- 使用 `@include` 引入混入

### Vue 组件规范

- 使用 Composition API
- 使用 `<script setup>` 语法
- Props 使用 TypeScript 类型定义
- 事件使用 `defineEmits`

### 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| Astro 组件 | PascalCase | `PostCard.astro` |
| Vue 组件 | PascalCase | `TableOfContents.vue` |
| SCSS 文件 | kebab-case | `_variables.scss` |
| 页面文件 | kebab-case | `page_messageboard.astro` |
| 工具文件 | camelCase | `utils.ts` |
