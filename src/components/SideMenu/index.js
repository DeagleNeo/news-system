import React from 'react'
import { Layout, Menu } from "antd"
import {
  UserOutlined,
} from '@ant-design/icons';

import style from "./index.module.less"

const { Sider } = Layout
const { SubMenu } = Menu
const MenuItem = Menu.Item


export default function index() {
  return (
    <Sider trigger={null} collapsible collapsed={false} className={style.sider} >
      <div className={style.logo}>全球新闻管理系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <MenuItem key="1" icon={<UserOutlined />}>
          首页
        </MenuItem>
        <MenuItem key="2" icon={<UserOutlined />}>
          nav 2
        </MenuItem>
        <MenuItem key="3" icon={<UserOutlined />}>
          nav 3
        </MenuItem>
        <SubMenu key="sub4" icon={<UserOutlined />} title="内容管理">
          <MenuItem key="9">Option 9</MenuItem>
          <MenuItem key="10">Option 10</MenuItem>
          <MenuItem key="11">Option 11</MenuItem>
          <MenuItem key="12">Option 12</MenuItem>
        </SubMenu>
      </Menu>
    </Sider>
  )
}
