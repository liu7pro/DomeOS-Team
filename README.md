# DomeOS Team 官网

DomeOS Team 是一个专注于精简与优化 Windows 的团队，是 DomeOS Technology 的前身。作品包括 FireflyOS、DomeOS-Next 与 DomeOS AI。

本仓库为团队官网页面，使用纯静态 HTML / CSS / JavaScript 构建，部署于 GitHub Pages。

- 线上地址：https://liu7pro.github.io/DomeOS-Team/
- 联系邮箱：DomeOS-Team@outlook.com

## 目录结构

```
.
├── index.html          首页
├── 404.html            404 页面
├── .nojekyll           关闭 Jekyll 处理
└── assets/
    ├── style.css       公共样式
    ├── theme.css       站点配色
    ├── main.js         交互与入场动画
    ├── logo.svg        团队图标
    ├── fireflyos.svg   FireflyOS 图标
    ├── domeos-next.svg DomeOS-Next 图标
    └── domeos-ai.svg   DomeOS AI 图标
```

## 本地预览

在仓库根目录启动任意静态服务器，例如：

```powershell
python -m http.server 8080
```

然后访问 http://localhost:8080/。

## 维护

- 成员与鸣谢信息以团队确认为准。
- 产品入口统一指向各项目官网，站点之间保持互链。

© 2026 DomeOS Team
