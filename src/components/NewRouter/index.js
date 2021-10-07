import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import axios from 'axios'

import Home from "../../pages/NewsSandBox/Home/Home.js"
import UserList from "../../pages/NewsSandBox/UserManage/UserList.js"
import RoleList from "../../pages/NewsSandBox/RightManage/RoleList.js"
import RightList from "../../pages/NewsSandBox/RightManage/RightList.js"
import NotFount from "../../pages/NotFount/index.js"
import NewsAdd from '../../pages/NewsSandBox/NewsManage/Add.js'
import NewsDraft from '../../pages/NewsSandBox/NewsManage/Draft.js'
import NewsCategory from '../../pages/NewsSandBox/NewsManage/Category.js'
import Audit from "../../pages/NewsSandBox/AuditManage/Audit.js"
import AuditList from "../../pages/NewsSandBox/AuditManage/List.js"
import Unpublished from "../../pages/NewsSandBox/PublishManage/Unpublished.js"
import Published from "../../pages/NewsSandBox/PublishManage/Published.js"
import Sunset from "../../pages/NewsSandBox/PublishManage/Sunset.js"

// 路由 == 组件 映射表
const LocalRouterMap = {
    "/home": Home, // 首页
    "/user-manage/list": UserList, // 用户列表
    "/right-manage/role/list": RoleList, // 角色列表
    "/right-manage/right/list": RightList, // 权限列表
    "/news-manage/add": NewsAdd, // 撰写新闻
    "/news-manage/draft": NewsDraft, // 草稿箱
    "/news-manage/category": NewsCategory, // 新闻分类
    "/audit-manage/audit": Audit, // 审核新闻
    "/audit-manage/list": AuditList, // 审核列表
    "/publish-manage/unpublished": Unpublished, // 待发布
    "/publish-manage/published": Published, // 已发布
    "/publish-manage/sunset": Sunset, // 已下线
    "*": NotFount,
}

export default function NewRouter() {

    const [backRouterList, setBackRouterList] = useState([]);

    // 获取动态路由
    useEffect(() => {
        // 并发处理
        Promise.all([
            axios.get(`http://localhost:8888/rights`),
            axios.get(`http://localhost:8888/children`)
        ]).then(res => {
            setBackRouterList([...res[0].data, ...res[1].data])
        })

    })
    // 获取用户权限数据
    const { role: { rights } } = JSON.parse(localStorage.getItem('token'))
    
    const checkRoute = (item) => {
        return LocalRouterMap[item.key] && item.pagepermisson === 1
    }

    const checkUserPermission = (item) => {
        return rights.includes(item.key)
    }

    return (
        <Switch>
            {backRouterList.map(item => {
                // 权限判断
                if (checkRoute(item) && checkUserPermission(item)) {
                    return <Route path={item.key} key={item.key} component={LocalRouterMap[item.key]} exact />
                }
                return null;
            }
            )}
            <Redirect from="/" to="/home" exact />
            {backRouterList.length > 0 && <Route path="*" component={NotFount} />}
        </Switch>
    )
}
