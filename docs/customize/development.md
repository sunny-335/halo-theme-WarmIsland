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
git clone https://github.com/your-username/WarmIsland.git
cd WarmIsland
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
