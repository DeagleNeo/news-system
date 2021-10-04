import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import SideMenu from "../../components/SideMenu"
import TopHeader from "../../components/TopHeader"

import Home from "./Home/Home.js"
import UserList from "./UserManage/UserList.js"
import RoleList from "./RightManage/RoleList.js"
import RightList from "./RightManage/RightList.js"
import NotFount from "../NotFount"

import "./index.less"

import { Layout } from "antd"
const { Content } = Layout;

export default function NewsSandBox(props) {
    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/user-manage/list" component={UserList} />
                        <Route path="/right-manage/role/list" component={RoleList} />
                        <Route path="/right-manage/right/list" component={RightList} />
                        <Redirect from="/" to="/home" exact />
                        <Route path="*" component={NotFount} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}
