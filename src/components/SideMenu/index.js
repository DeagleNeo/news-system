import React from 'react'
import { Layout, Menu } from "antd"
import { withRouter } from "react-router-dom"
import {
  UserOutlined,
} from '@ant-design/icons';

import style from "./index.module.less"

const { Sider } = Layout
const { SubMenu } = Menu
const MenuItem = Menu.Item

// 模拟导航数据
const menuList = [
  {
    key: "/home",
    title: "首页",
    icon: <UserOutlined />
  }, {
    key: "/user-manage",
    title: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user-manage/list",
        title: "用户列表",
        icon: <UserOutlined />
      }
    ]
  }, {
    key: "/right-manage",
    title: "权限管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/right-manage/role/list",
        title: "角色列表",
        icon: <UserOutlined />
      }, {
        key: "/right-manage/right/list",
        title: "权限列表",
        icon: <UserOutlined />
      }
    ]
  }
]

function SideMenu(props) {  

  const routerIndex = props.history.location.pathname;

  // 动态生成导航
  const renderMenu = (menuList) => {
    return menuList && menuList.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title} icon={item.icon}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (<MenuItem key={item.key} icon={item.icon} onClick={() => {
        props.history.push(item.key)
      }}>{item.title}</MenuItem>)
    })
  }

  return (
    <Sider trigger={null} collapsible collapsed={false} className={style.sider} >
      <div className={style.logo}>全球新闻管理系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[routerIndex]}>
        {renderMenu(menuList)}
      </Menu>
    </Sider>
  )
}

export default withRouter(SideMenu);