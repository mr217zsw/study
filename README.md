# Vue3 后台管理系统

基于 Vue3 + Vite + Element Plus 的后台管理系统模板，支持动态菜单、权限管理、Mock 数据、响应式布局，适合学习和二次开发。[项目访问地址](https://mr217zsw.github.io/study/)

## 特性

- 🚀 Vue3 + Vite 极速开发
- 🎨 Element Plus 高颜值组件库
- 🗂️ 动态路由与菜单权限
- 🛠️ Pinia 状态管理
- 📦 Mock 数据，前后端分离开发
- 📊 Echarts 数据可视化
- 💡 支持自动导入与组件按需加载
- 🌈 响应式布局，适配主流屏幕

## 项目结构

```
├── src/
│   ├── api/           # 接口与mock数据
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── config/        # 配置文件
│   ├── router/        # 路由
│   ├── stores/        # 状态管理
│   ├── utils/         # 工具函数
│   ├── views/         # 页面视图
│   └── main.js        # 入口文件
├── public/            # 公共资源
├── package.json       # 项目依赖
├── vite.config.js     # Vite 配置
└── README.md          # 项目说明
```

## 安装与运行

1. 克隆项目

   ```sh
   git clone https://github.com/mr217zsw/study.git
   cd study
   ```

2. 安装依赖

   ```sh
   npm install
   ```

3. 启动开发环境

   ```sh
   npm run dev
   ```

4. 打包构建

   ```sh
   npm run build
   ```

## 如何将自己的项目部署到 GitHub Pages

1. 初始化 git 仓库，添加你的远程仓库

   ```sh
   git init
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   ```

2. 推送代码到 GitHub

   ```sh
   git add .
   git commit -m "init"
   git push -u origin main
   ```

3. 将 dist/ 部署到 GitHub Pages(推荐用 gh-pages 插件部署)

   - 安装插件

   ```sh
   npm install gh-pages -D
   ```

   - 修改 vite.config.js

   ```js
   export default defineConfig({
     // 注意修改成你的仓库名
     base: "/your-project/",
     plugins: [vue()],
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
   });
   ```

   - package.json 添加脚本

   ```json
   "scripts": {
   "deploy": "gh-pages -d dist"
   }
   ```

   - 最后执行脚本

   ```sh
   npm run build
   npm run deploy
   ```

## 技术栈

- [Vue3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Element Plus](https://element-plus.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Echarts](https://echarts.apache.org/)
- [Mock.js](https://github.com/nuysoft/Mock)

## 账号与权限（Mock）

- 管理员账号：admin / admin
- 普通用户账号：user / 123

不同账号登录后菜单权限不同。

## 目录说明

- `src/api/`：统一接口管理，支持 mock 数据
- `src/views/`：页面视图，按需动态加载
- `src/components/`：公共组件
- `src/stores/`：Pinia 状态管理
- `src/router/`：路由与权限控制

## 贡献

欢迎提 issue 或 PR，完善功能与文档！

## License

MIT
