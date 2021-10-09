import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Avatar } from "antd"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';

import style from "./index.module.less"

const { Header } = Layout

function TopHeader(props) {

    const userInfo = JSON.parse(localStorage.getItem('token'));

    const menu = (
        <Menu>
            <Menu.Item key="admin">{userInfo.role.roleName}</Menu.Item>
            <Menu.Item key='logout' danger onClick={() => logoutMethod()}>退出登录</Menu.Item>
        </Menu>
    );

    // 折叠按钮点击事件
    const changeCollapse = () => {
        // 改变 state 的 isCollapsed
        props.changeCollapsed()
    }

    // 退出登陆
    const logoutMethod = () => {
        localStorage.removeItem('token')
        props.history.replace('/login')
    }

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapse} /> : <MenuFoldOutlined onClick={changeCollapse} />}
            <div style={{ float: "right" }}>
                <span className={style.tip}>欢迎 <span style={{ color: "#1890ff" }}>{userInfo.username}</span> 回来</span>
                <Dropdown overlay={menu}>
                    <span><Avatar size={32} icon={<UserOutlined />} /></span>
                </Dropdown>
            </div>
        </Header>
    )
}

/**
 * connect(
 *  // mapStateToProps
 *  // mapDispatchToProps
 * )(被包装的组件)
 */
const mapStateToProps = ({ CollApsedReducer: { isCollapsed } }) => {
    return {
        isCollapsed: isCollapsed
    }
}
const mapDispatchToProps = {
    changeCollapsed(){
        return {
            type: "change_collapsed",
            // payload: 
        } // action
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader))
