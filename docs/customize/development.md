# 开发指南

本文档面向 WarmIsland 主题的开发者，介绍如何搭建开发环境、构建主题以及参与贡献。

## 环境要求

| 工具 | 最低版本 | 推荐版本 |
|------|----------|----------|
| Node.js | 18.x | 20.x LTS |
| pnpm | 8.x | 9.x |
| Git | 2.x | 最新 |

### 安装 pnpm

```bash
npm install -g pnpm
```

### 验证环境

```bash
node -v    # v20.x.x
pnpm -v    # 9.x.x
git --version  # git version 2.x.x
```

## 克隆与安装

```bash
git clone https://github.com/your-username/WarmIsland.git
cd WarmIsland
pnpm install
```

## 开发模式

### 启动开发服务器

```bash
pnpm dev
```

启动后，Astro 开发服务器会在 `http://localhost:4321` 运行，支持热更新。

### 使用 Halo DevTools

WarmIsland 使用 `vite-plugin-halo-theme` 插件，可以与 Halo 实例联动开发：

1. 确保本地 Halo 实例正在运行
2. 在 Halo 后台安装主题的开发版本
3. 修改源码后，主题会自动重新构建并推送到 Halo

```bash
pnpm dev:halo
```

## 构建

### 生产构建

```bash
pnpm build
```

构建产物位于 `dist/` 目录，包含所有模板文件和静态资源。

### 打包主题

```bash
pnpm package
```

生成 `.zip` 主题包，可直接在 Halo 后台上传安装。

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
| [Astro](https://astro.build) | 5.x | 静态站点生成，组件开发 |
| [vite-plugin-halo-theme](https://github.com/halo-sigs/vite-plugin-halo-theme) | - | Halo 主题开发集成 |
| [Thymeleaf](https://www.thymeleaf.org/) | - | Halo 服务端模板引擎 |

### 前端技术

| 技术 | 用途 |
|------|------|
| [Vue 3](https://vuejs.org/) | 交互组件（目录、点赞、无限滚动等） |
| [SCSS](https://sass-lang.com/) | 样式预处理 |
| [Prism.js](https://prismjs.com/) | 代码高亮 |
| [LightGallery](https://www.lightgalleryjs.com/) | 图片灯箱 |

### 构建工具

| 技术 | 用途 |
|------|------|
| [Vite](https://vitejs.dev/) | 构建打包 |
| [pnpm](https://pnpm.io/) | 包管理 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |

## 模板语法

WarmIsland 使用 Astro 编写组件，构建后输出为 Thymeleaf 模板供 Halo 使用。

### Astro 组件 → Thymeleaf 模板

Astro 组件中的前端代码会被 `vite-plugin-halo-theme` 转换为 Thymeleaf 模板：

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
