import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import SideMenu from "../../components/SideMenu"
import TopHeader from "../../components/TopHeader"

import Home from "./Home/Home.js"
import UserList from "./UserManage/UserList.js"
import RoleList from "./RightManage/RoleList.js"
import RightList from "./RightManage/RightList.js"
import NotFount from "../NotFount"

export default function index(props) {
    return (
        <div>
            <SideMenu></SideMenu>
            <TopHeader></TopHeader>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/user-manage/list" component={UserList} />
                <Route path="/right-manage/role/list" component={RoleList} />
                <Route path="/right-manage/right/list" component={RightList} />
                <Redirect from="/" to="/home" exact />
                <Route path="*" component={NotFount} />
            </Switch>
        </div>
    )
}
