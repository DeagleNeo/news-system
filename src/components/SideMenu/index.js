import React from 'react'
import { Layout, Menu } from "antd"
import {
  UserOutlined,
} from '@ant-design/icons';

import style from "./index.module.less"

const { Sider } = Layout
const { SubMenu } = Menu
const MenuItem = Menu.Item

// 模拟数组结构
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
      },{
        key: "/right-manage/right/list",
        title: "权限列表",
        icon: <UserOutlined />
      }
    ]
  }
]

export default function index() {
  return (
    <Sider trigger={null} collapsible collapsed={false} className={style.sider} >
      <div className={style.logo}>全球新闻管理系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {menuList && menuList.map(item=>{
          if(item.children){
            const children = item.children;
            return (
              <SubMenu key={item.key} title={item.title} icon={item.icon}>
                {children.map(item =><MenuItem key={item.key} icon={item.icon}>{item.title}</MenuItem>)}
              </SubMenu>
            )
          }
          return (<MenuItem key={item.key} icon={item.icon}>{item.title}</MenuItem>)
        })}
      </Menu>
    </Sider>
  )
}
