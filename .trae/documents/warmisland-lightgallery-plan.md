# lightGallery 图片灯箱集成 — 剩余工作计划

## 当前状态总结

大部分集成工作已在上一轮会话中完成：

- ✅ `lightgallery@2.9.0` 已通过 pnpm 安装
- ✅ `LightGallery.astro` 组件已创建（含暗色模式 CSS、冲突检测、自动包裹图片、初始化逻辑）
- ✅ `post.astro` 已引入 LightGallery 组件
- ✅ `settings.yaml` 已添加灯箱开关 `article_lightbox_enabled`
- ✅ 构建成功，字体/图标资源已正确处理（woff2 内联为 base64，ttf/woff/svg/gif 均正确引用 `/themes/warm-island/assets/` 路径）
- ✅ 已部署到 Docker 容器

## 发现的问题

### 关键 Bug：`selector: 'a'` 选择器过于宽泛

当前 `LightGallery.astro` 中使用 `selector: 'a'` 初始化 lightGallery，这会导致 `.wi-post__body` 内**所有** `<a>` 标签都被视为灯箱项目，包括：

1. **普通文本链接**（如 `<a href="https://example.com">链接文字</a>`）— 点击后不会正常跳转，而是尝试在灯箱中打开，导致加载失败
2. **已有 `<a>` 包裹的图片**（如 `<a href="/some-page"><img src="photo.jpg"></a>`）— 灯箱会使用 `href`（页面 URL）而非图片地址作为源，导致显示错误

### 修复方案

1. 为应加入灯箱的 `<a>` 标签添加专属类名 `wi-lightgallery-item`
2. 自动包裹图片时，给新创建的 `<a>` 标签添加此类名
3. 对已有 `<a>` 包裹的 `<img>`，也给其父 `<a>` 添加此类名，并设置 `data-src` 属性指向图片原图（确保灯箱使用图片地址而非链接地址）
4. 将 lightGallery 初始化的 `selector` 从 `'a'` 改为 `'.wi-lightgallery-item'`

## 实施步骤

### 步骤 1：修复 LightGallery.astro 的选择器和包裹逻辑

修改 `src/components/LightGallery.astro` 中的 `<script>` 部分：

**自动包裹逻辑改进：**
- 对没有 `<a>` 包裹的 `<img>`：创建 `<a class="wi-lightgallery-item" href="${src}">` 包裹
- 对已有 `<a>` 包裹的 `<img>`：给父 `<a>` 添加 `wi-lightgallery-item` 类名，并添加 `data-src="${src}"` 属性

**选择器改进：**
- `selector: 'a'` → `selector: '.wi-lightgallery-item'`

### 步骤 2：构建项目

运行 `pnpm build` 构建主题。

### 步骤 3：部署到 Docker

将构建产物复制到 Halo 容器并重启。

### 步骤 4：浏览器验证

使用 agent-browser 进行以下验证：
1. 打开文章详情页
2. 确认 lightGallery JS 模块加载成功（检查 `[data-lg-uid]` 属性）
3. 点击文章中的图片，验证灯箱正常打开
4. 验证缩放功能正常
5. 验证缩略图条显示
6. 验证暗色模式下样式正确
7. 验证普通文本链接仍可正常点击跳转（不被灯箱拦截）

### 步骤 5：修复验证中发现的问题（如有）

根据浏览器验证结果，修复任何发现的问题。
