# 实施计划：Hero 一言、Footer 注入、瞬间计数修复、README 更新

## 任务概览

| # | 任务 | 状态 |
|---|------|------|
| 1 | Hero 首屏描述文案改为一言语句 | ✅ 已完成（settings.yaml + HeroSection.astro） |
| 2 | Footer 代码注入整合进主题页脚容器 | ✅ 已完成（Footer.astro + Layout.astro） |
| 3 | 瞬间页点赞/评论计数不更新 | 🔄 需修复 |
| 4 | README.md 增加已适配插件信息 | 🔄 待开始 |

---

## 任务 3：修复瞬间页点赞/评论计数不更新

### 问题分析

通过查阅 Halo 瞬间插件（plugin-moments）的官方文档，确认了 `MomentVo` 的 `stats` 字段定义为：

```json
"stats": {
  "upvote": 0,
  "totalComment": 0,
  "approvedComment": 0
}
```

因此 `moment.stats?.upvote` 和 `moment.stats?.approvedComment` 的字段名是**正确的**。

但当前主题使用的是 `momentFinder.list(1, 50)`，这是 Finder API。根据 Halo 核心源码分析：
- 核心的 `StatsVo` 只有 `visit`、`upvote`、`comment` 三个字段
- 瞬间插件自定义了 `stats` 对象，包含 `upvote`、`totalComment`、`approvedComment`
- **关键问题**：`momentFinder.list()` 返回的 `MomentVo` 对象中，`stats` 字段可能为 `null`，因为 Finder API 可能不会自动填充统计数据

### 根本原因推断

1. **点赞计数不更新**：点赞 API `/apis/api.halo.run/v1alpha1/trackers/upvote` 返回 200，但 `moment.stats.upvote` 始终为 0。可能原因：
   - Finder API 返回的 `MomentVo` 中 `stats` 对象存在但值为 0（未实时同步）
   - 或者 `stats` 对象为 `null`，`?: 0` 兜底显示 0

2. **评论计数不更新**：同理，`moment.stats.approvedComment` 始终为 0

3. **调试 div 未渲染**：之前添加的 `th:text="${moment.stats != null ? moment.stats.toString() : 'NULL'}"` 在浏览器中找不到，说明 Thymeleaf 在处理这个表达式时可能抛出了异常（`toString()` 在某些 VO 对象上可能不可用），导致整个元素被跳过

### 修复方案

#### 步骤 3.1：移除调试代码
- 删除 `moments.astro` 第 27 行的 `<div class="wi-debug-stats">` 调试元素

#### 步骤 3.2：改用瞬间插件的公开 API 获取统计数据
- 瞬间插件提供了公开 API：`/apis/api.moment.halo.run/v1alpha1/moments`
- 该 API 返回的 `MomentVo` 包含完整的 `stats` 对象
- 但由于页面使用 Thymeleaf 服务端渲染，无法在模板中直接调用 REST API
- **替代方案**：在客户端 JS 中，页面加载后通过 API 获取统计数据并更新 DOM

#### 步骤 3.3：实现客户端统计更新
- 页面加载后，调用 `/apis/api.moment.halo.run/v1alpha1/moments` 获取瞬间列表
- 遍历返回数据，根据 `moment.metadata.name` 匹配 DOM 元素
- 更新点赞数和评论数显示

#### 步骤 3.4：修复点赞后的计数更新逻辑
- 当前点赞成功后，JS 使用 `parseInt(countEl.textContent) + 1` 更新计数
- 如果初始值为 0（因为 stats 未加载），点赞后显示 1
- 需要确保点赞 API 调用正确，且点赞后计数正确更新

#### 步骤 3.5：验证点赞 API body 格式
- 当前使用 `{group: "moment.moment.halo.run", plural: "moments", name: momentName}`
- 参考 post.astro 中文章点赞使用 `{group: "content.halo.run", plural: "posts", name: postName}`
- 瞬间插件的 group 为 `moment.moment.halo.run`，plural 为 `moments`，格式正确
- 但需要确认 Halo 的 trackers upvote API 是否支持瞬间插件的 group

### 具体代码修改

**文件：`src/pages/moments.astro`**

1. 移除第 27 行调试 div
2. 保留 Thymeleaf 中的 `moment.stats?.upvote ?: 0` 和 `moment.stats?.approvedComment ?: 0` 作为初始值
3. 在 `<script is:inline>` 中添加页面加载后获取统计数据的逻辑：

```javascript
function loadMomentStats() {
  fetch("/apis/api.moment.halo.run/v1alpha1/moments")
    .then(function(res) {
      if (!res.ok) return;
      return res.json();
    })
    .then(function(data) {
      if (!data || !data.items) return;
      data.items.forEach(function(moment) {
        var name = moment.metadata.name;
        var stats = moment.stats || {};
        
        var likeCountEls = document.querySelectorAll('.wi-moments-page__like-count');
        var commentCountEls = document.querySelectorAll('.wi-moments-page__comment-count');
        
        likeCountEls.forEach(function(el) {
          var btn = el.closest('.wi-moments-page__like-btn');
          if (btn && btn.getAttribute('data-moment-name') === name) {
            el.textContent = stats.upvote || 0;
          }
        });
        
        commentCountEls.forEach(function(el) {
          var btn = el.closest('.wi-moments-page__comment-btn');
          if (btn && btn.getAttribute('data-moment-name') === name) {
            el.textContent = stats.approvedComment || 0;
          }
        });
      });
    })
    .catch(function(err) {
      console.error("Failed to load moment stats:", err);
    });
}

loadMomentStats();
```

4. 优化点赞逻辑，点赞成功后重新加载统计数据确保准确性

---

## 任务 4：README.md 增加已适配插件信息

### 已适配插件列表

通过代码搜索 `pluginFinder.available()` 确认以下已适配插件：

| 插件名称 | 插件标识 | 适配页面路由 | 说明 |
|----------|---------|-------------|------|
| 瞬间 | PluginMoments | `/moments` | 瞬间动态页面 |
| 图库 | PluginPhotos | `/photos` | 图片展示页面 |
| 友情链接 | PluginLinks | `/links` | 友链展示页面 |
| 朋友圈 | plugin-friends | `/friends` | RSS 订阅朋友圈 |
| 装备 | equipment | `/equipment` | 装备展示页面 |
| 搜索 | PluginSearchWidget | 导航栏集成 | 搜索弹窗组件 |
| 评论 | PluginComment | 文章页/瞬间页/留言板 | 评论组件集成 |

### 具体修改

在 README.md 的"特性"部分之后添加"已适配插件"章节，包含插件名称、路由和简要说明。

---

## 执行顺序

1. 修复 moments.astro（移除调试代码 + 添加客户端统计加载）
2. 更新 README.md
3. 构建部署
4. 浏览器验证
