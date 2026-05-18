# Tasks

- [x] Task 1: 修复 moments.astro 页面 - 替换 `momentFinder.list()` 为 `momentFinder.list(1, 50)`，修复 `moment.spec.media` 为 `moment.spec.content.medium`
  - [x] 将 `th:with="moments = ${momentFinder.list()}"` 改为 `th:with="momentsResult = ${momentFinder.list(1, 50)}"`
  - [x] 将 `th:each="moment : ${moments}"` 改为 `th:each="moment : ${momentsResult.items}"`
  - [x] 将 `th:if="${moments != null and not #lists.isEmpty(moments)}"` 改为 `th:if="${momentsResult != null and not #lists.isEmpty(momentsResult.items)}"`
  - [x] 将 `moment.spec?.media` 改为 `moment.spec.content.medium`
  - [x] 将 `moment.spec.media` 改为 `moment.spec.content.medium`
  - [x] 将 `media.type == 'PHOTO'` 保持不变（MomentMediaType.PHOTO 对应字符串 'PHOTO'）
  - [x] 将 `media.url` 保持不变
  - [x] 将 `media.displayName ?: ''` 改为 `''`（MomentMedia 没有 displayName 字段）

- [x] Task 2: 修复 MomentsSection.astro 组件 - 替换 `momentFinder.list()` 为 `momentFinder.list(1, limit)`
  - [x] 将 `th:with="moments = ${momentFinder != null ? momentFinder.list() : null}, limit = ..."` 改为 `th:with="momentsResult = ${momentFinder.list(1, limit)}"`
  - [x] 将 `th:each="moment, stat : ${moments}"` 改为 `th:each="moment : ${momentsResult.items}"`
  - [x] 移除 `th:if="${stat.index < limit}"` 限制（已通过 list 的 size 参数限制）
  - [x] 修复 `moment.spec?.content?.html ?: moment.spec?.content?.raw ?: moment.spec?.content` 保持不变（正确）
  - [x] 修复 `moment.spec?.releaseTime` 保持不变（正确）

- [x] Task 3: 修复 photos.astro 页面 - 替换 `photoFinder.listGroups()` + `listByGroupName()` 为 `photoFinder.groupBy()`
  - [x] 将 `th:with="groups = ${photoFinder.listGroups()}"` 改为使用 `photoFinder.groupBy()`
  - [x] 使用 `th:each="group : ${photoFinder.groupBy()}"` 遍历分组
  - [x] `group` 是 `PhotoGroupVo`，包含 `metadata`、`spec`、`status`、`photos` 字段
  - [x] 移除 `th:with="photos = ${photoFinder.listByGroupName(group.metadata?.name)}"` 内部调用
  - [x] 直接使用 `group.photos` 遍历照片
  - [x] 照片字段：`photo.spec.url`、`photo.spec.displayName`、`photo.spec.description`

- [x] Task 4: 修复 PhotosSection.astro 组件 - 替换 `photoFinder.listGroups()` + `listByGroupName()` 为 `photoFinder.groupBy()`
  - [x] 将 `th:with="groups = ${photoFinder != null ? photoFinder.listGroups() : null}"` 改为使用 `photoFinder.groupBy()`
  - [x] 使用 `th:each="group : ${photoFinder.groupBy()}"` 获取第一个分组
  - [x] 使用 `group.photos` 获取照片列表
  - [x] 限制显示数量使用 `th:each="photo, stat : ${group.photos}" th:if="${stat.index < limit}"`

- [x] Task 5: 修复 TimelineSection.astro - 移除 Groovy 闭包语法
  - [x] 将 `${postFinder.listAll().groupBy { it.spec.publishTime?.getYear() }}` 改为 `${postFinder.list({page: 1, size: 50})}`
  - [x] 使用 `th:each="post : ${posts.items}"` 遍历文章
  - [x] 按年份分组改用 Thymeleaf 的方式：先获取所有文章，再在模板中按年分组展示

- [x] Task 6: 修复 Navbar.astro 和 Header.astro 中的 `menuItem.spec.target?.value`
  - [x] 将 `th:target="${menuItem.spec.target?.value}"` 改为 `th:target="${menuItem.spec.target}"`

- [x] Task 7: 构建并部署验证
  - [x] 执行 `pnpm build`
  - [x] 部署到 Docker 容器
  - [x] 重启 Halo 容器
  - [x] 通过浏览器访问所有页面验证无白屏

# Task Dependencies
- [Task 7] depends on [Task 1, Task 2, Task 3, Task 4, Task 5, Task 6]
- [Task 1] and [Task 2] can be parallelized
- [Task 3] and [Task 4] can be parallelized
