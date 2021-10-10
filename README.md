# 全球新闻管理系统

## 项目功能点

- 游客系统
    - 新闻浏览
    - 新闻点赞

- 新闻管理系统
    - 登录功能
    - 首页
        - 数据可视化
    - 用户管理
        - 用户管理
    - 权限管理
        - 角色管理
        - 权限管理
    - 新闻管理
        - 撰写新闻
        - 草稿箱
        - 新闻分类
    - 审核管理
        - 审核列表
        - 审核新闻
    - 发布管理
        - 待发布
        - 已发布
        - 已下线

## 项目启动

```bash
## 全局安装 sjon-server
npm install json-server -g 
yarn global add json-server

## 安装项目依赖
npm install
yarn

## 启动 json-server 创建 API 服务器
npm run data
yarn data

## 启动项目
npm start
yarn start
```