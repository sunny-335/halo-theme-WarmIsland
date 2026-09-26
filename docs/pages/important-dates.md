# 记得页面

`/important-dates` 由 [plugin-important-dates](https://github.com/yyliucha/plugin-important-dates) 插件提供路由，主题提供同名模板 `templates/important-dates.html` 覆盖插件默认样式，使页面完全融入 WarmIsland 的外观（导航、页脚、暗色模式）。

## 页面结构

```
记得（标题 + 副标题 + 强调线）
├─ 生活 / 爱车 视图切换（插件开启「前台爱车模块」时出现）
├─ 到期提醒横幅（生活：重要日期；爱车：保险 / 年检 / 保养）
├─ 生活视图
│  ├─ 重要日期（便签卡片：倒计时、日期、农历标记、关联的人）
│  └─ 牵挂的人（大头贴、昵称、关系、脱敏生日与倒计时）
└─ 爱车视图
   ├─ 我的爱车（封面、分类品牌、脱敏车牌、到期徽章、车主/驾驶人）
   └─ 车主与驾驶人 / 其他重要的人
```

## 交互

- **视图切换**：点击「生活 / 爱车」即时切换，地址栏记忆 `?view=car`
- **相册**：点击车辆封面全屏浏览相册（只读），`Esc` 或点击空白处关闭；未上传照片时给出轻提示
- **忽略提醒**：横幅右侧 ✕ 表示「本次到期周期内不再提示」，记录在浏览器本地，到期日变化后自动恢复

## 模板覆盖机制

插件通过 Halo 的 `TemplateNameResolver` 解析模板名：

1. 主题存在 `templates/important-dates.html` → 使用主题模板
2. 否则回退插件自带默认模板（会用主题的 `layout.html` 页面布局契约）

删除主题内的 `important-dates.html` 即可回到插件默认样式；插件不会写入或修改任何主题文件。

## 可用模板变量

| 变量 | 说明 |
| --- | --- |
| `title` | 页面标题（插件默认「记得」） |
| `dates` / `people` | 重要日期、人员列表 |
| `reminders` | 即将到来的重要日期（提醒横幅） |
| `cars` / `carEvents` | 座驾列表、即将到期的座驾事项 |
| `carPeople` / `otherPeople` / `personCars` | 车主驾驶人、其他人员、人员与车辆关系 |
| `showCarSection` / `carSkinEnabled` / `showAvatar` / `showImportantTag` | 各展示开关 |
| `allowDismiss` | 是否允许逐条忽略提醒 |

## 注意事项

::: warning
`PersonVo` 没有 `gender` 字段，自定义模板时不要写 `${p.gender}`，否则会触发 SpEL `EL1008E` 导致页面 500。
:::

## 相关页面

- [记得配置](/config/important-dates) — 页面标题与副标题
- [扩展页面](/pages/extended) — 其它插件扩展页面
