import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Avatar } from "antd"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';

import style from "./index.module.less"

const { Header } = Layout

const menu = (
    <Menu>
        <Menu.Item>超级管理员</Menu.Item>
        <Menu.Item danger>退出登录</Menu.Item>
    </Menu>
  );

export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(true)

    const changeCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {collapsed ? <MenuUnfoldOutlined onClick={changeCollapse} /> : <MenuFoldOutlined onClick={changeCollapse} />}
            <div style={{ float: "right" }}>
                <span className={style.tip}>欢迎 xxx 回来</span>
                <Dropdown overlay={menu}>
                    <span><Avatar size={32} icon={<UserOutlined />} /></span>
                </Dropdown>
            </div>
        </Header>
    )
}
