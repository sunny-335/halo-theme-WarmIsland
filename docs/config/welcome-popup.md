# 欢迎弹窗

欢迎弹窗在首页以浮层形式向访客打招呼。**默认关闭**，开启后也只显示主题内置的本地静态欢迎语，
不会自动向任何第三方发起请求。

## 配置项一览

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `welcome_popup_enabled` | 开关 | `false` | 启用欢迎弹窗 |
| `welcome_popup_position` | 下拉 | `top-center` | 弹窗位置，共 5 种 |
| `welcome_popup_duration` | 数字 | `5` | 自动消失时间（秒），范围 3–60 |
| `welcome_popup_show_once` | 开关 | `true` | 同一浏览器会话内仅显示一次 |
| `welcome_popup_api` | URL | 留空 | 自定义 IP 定位主 API（可选） |
| `welcome_popup_fallback_api` | URL | 留空 | 自定义 IP 定位备选 API（可选） |

## 弹窗位置

| 值 | 位置 |
| --- | --- |
| `top-center` | 顶端居中（默认） |
| `top-left` / `top-right` | 左上 / 右上 |
| `bottom-left` / `bottom-right` | 左下 / 右下 |

`welcome_popup_show_once` 使用浏览器 `sessionStorage` 记录同会话已显示状态；
关闭该开关后每次访问首页都会弹出。清除浏览器站点数据即可重置。

## 可选的 IP 定位能力（默认关闭）

两个 API 字段仅在「启用欢迎弹窗」开关打开时显示，`help` 只说明候选地址与留空规则；
第三方数据流向与隐私披露由本文档下方条目及 README「外部资源与隐私」章节承载。
字段**默认留空**，此时弹窗只显示本地欢迎语，不发起任何外部请求。
只有管理员显式填写后，浏览器才会向该地址请求并把**访客 IP**暴露给第三方服务以换取粗略地理位置：

- 候选主 / 备选接口：`https://myip.ipip.net/json`、`https://r.inews.qq.com/api/ip2city?otype=json`
- 数据流向与隐私披露要求见 README「外部资源与隐私」章节
- 清空字段或关闭弹窗即可立即停止，无需重装主题

> 主题不预置、不代理这些接口，也不保存访客位置数据；填写前请自行评估服务商的隐私政策。

## 相关页面

- [基础设置](/config/basic) — 站点名称、Logo 等
- [首页](/pages/home) — 首页模块说明
