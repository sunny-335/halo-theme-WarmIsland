# 记得

「记得」模块对应 [plugin-important-dates](https://github.com/yyliucha/plugin-important-dates) 插件的前台页面 `/important-dates`，用于展示重要日期、牵挂的人与座驾（爱车）信息。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `idates_page_title` | 文本 | `记得` | 页面标题，留空时使用插件自带标题 |
| `idates_page_subtitle` | 文本 | `记着重要的日子、惦记的人，还有陪你跑的爱车` | 页面副标题 |

```yaml
idates_page_title: "记得"          # 默认
idates_page_title: "纪念日"        # 自定义
idates_page_subtitle: "记着重要的日子、惦记的人，还有陪你跑的爱车"
```

## 前置依赖

::: danger
本页依赖 Halo 的 **plugin-important-dates**（记得）插件。未安装插件时 `/important-dates` 路由不存在，页面不会显示。

安装方式：Halo 后台 → **插件** → **安装** → 上传 jar，或直接前往 [GitHub Releases](https://github.com/yyliucha/plugin-important-dates/releases) 下载。
:::

## 数据来源

页面数据全部由插件提供，主题不读取任何隐私字段：

- `dates` — 重要日期（名称、日期、农历标记、关联人员、倒计时）
- `people` — 牵挂的人（昵称、关系、脱敏生日、生日倒计时、大头贴）
- `cars` — 座驾（分类、品牌型号、脱敏车牌、到期事项、相册）
- `reminders` / `carEvents` — 顶部到期提醒横幅

是否展示「重要」标记、大头贴、爱车视图等，均由插件自己的「设置」控制，主题侧只负责呈现。

## 相关页面

- [扩展页面](/pages/extended) — 全部插件扩展页面一览
- [记得页面](/pages/important-dates) — 页面结构与模板覆盖说明
