# 需求文档
## 目标
该项目是能够通过electron搭建一个客户端安装程序，能够统计用户工时。
## 技术栈
- electron-vite: 构建工具
- vite + vue3: web页面构建工具

## web页面框架设计
web页面框架使用vite + vue3,框架中需要包含全局状态管理，路由，统一的请求库，我希望整体的目录结构采用前端FSD架构模式设计。

###  页面需求
Ui 原型参照./design/hours.pen
#### 登录页
- 路由: /login
- 页面原型： ./design/hours.pen中的 【登录页面】

#### 工时统计页面
- 路由：/hours
- 页面原型：./design/hours.pen中的 【主页-工时查询】

## 架构约束
- 前端需要使用element-plus
- 前端框架可以参考 FSD设计， 参考链接：https://feature-sliced.github.io/documentation/zh/docs/get-started/overview
- 前端接口请求库统一是用 axios.

## 检查清单
代码完成后需要完成以下检查
- web界面和路由渲染正确
- electon能支持本地开发调试运行