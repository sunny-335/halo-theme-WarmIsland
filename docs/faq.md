# 常见问题

## 安装相关

### 主题安装后页面空白？

检查以下几点：

1. 确认 Halo 版本 >= 2.24.0
2. 确认主题已启用
3. 清除浏览器缓存后重试（Ctrl+Shift+R 强制刷新）
4. 检查 Halo 后台日志是否有报错

### 主题设置保存后没有生效？

1. 清除浏览器缓存（Ctrl+Shift+R 强制刷新）
2. 如果使用 Docker 部署，尝试重启容器：`docker restart halo`
3. 检查 Halo 缓存设置

### Docker 部署后主题文件更新不生效？

手动更新主题文件后需要重启容器：

```bash
docker cp templates/ halo:/root/.halo2/themes/warm-island/
docker restart halo
```

## 功能相关

### 搜索按钮不显示？

搜索功能依赖 Halo 搜索插件：

1. 确认已安装 [搜索插件](https://www.halo.run/store/apps/app-DlacW)
2. 确认主题设置中「显示搜索按钮」已开启
3. 确认插件已启用
4. 支持快捷键 `Ctrl+K`（macOS 为 `⌘K`）唤起搜索

### 瞬间/图库/友链页面显示插件未安装？

这些页面需要安装对应的 Halo 插件：

| 页面 | 所需插件 |
|------|----------|
| 瞬间 | [PluginMoments](https://www.halo.run/store/apps/app-SnwWD) |
| 图库 | [PluginPhotos](https://www.halo.run/store/apps/app-BmQJW) |
| 友链 | [PluginLinks](https://www.halo.run/store/apps/app-hfbQg) |
| 朋友圈 | [PluginFriends](https://www.halo.run/store/apps/app-yISsV) |

安装并启用插件后，页面会自动显示内容。未安装插件时页面会显示友好的提示信息。

### 一言 API 加载失败？

1. 检查网络是否能访问 `https://v1.hitokoto.cn/`
2. 如果在国内服务器，可能存在网络延迟
3. 可以在主题设置中更换一言 API 地址为自建镜像

### 文章目录不显示？

1. 确认文章内容中包含标题（h2-h6）
2. 确认主题设置中「显示文章目录」已开启
3. 桌面端需要屏幕宽度 >= 1280px 才会显示侧边目录
4. 移动端通过右下角悬浮按钮打开目录抽屉

### 代码高亮不生效？

1. 确认代码块使用了正确的语言标记（如 \`\`\`python）
2. Prism.js 支持自动语言检测，但部分语言需要手动标记
3. 检查浏览器控制台是否有 Prism.js 加载错误

## 样式相关

### 如何更换强调色？

在主题设置 → 样式设置 → 强调色 中选择或输入颜色值。也可以通过自定义 CSS 覆盖 `--accent` 变量，详见 [自定义 CSS](/customize/custom-css)。

### 深色模式下某些元素颜色不对？

1. 尝试清除浏览器缓存
2. 检查是否有自定义 CSS 只设置了浅色模式的值
3. 确保深色模式的变量覆盖在 `html.dark` 选择器下

### 自定义 CSS 不生效？

1. 检查 CSS 语法是否正确
2. 确认选择器特异性足够覆盖默认样式
3. 使用浏览器开发者工具检查元素的实际样式
4. 尝试添加 `!important` 提高优先级

## 其他

### 浏览器控制台出现 Tracking Prevention 警告？

这是浏览器的追踪防护功能拦截了第三方脚本（如 Microsoft Clarity），不是主题代码问题，不影响网站功能。

### icon-192x192.png 404 错误？

这是 Halo 系统 PWA manifest 配置问题，需要在 Halo 后台设置 PWA 图标，与主题无关。

### 如何报告 Bug？

请在 [GitHub Issues](https://github.com/sunny-335/halo-theme-WarmIsland/issues) 中提交，包含以下信息：

- Halo 版本
- 主题版本
- 问题描述和复现步骤
- 浏览器和设备信息
- 相关截图
