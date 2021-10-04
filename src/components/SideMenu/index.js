import React, { useState, useEffect } from 'react'
import { Layout, Menu } from "antd"
import { withRouter } from "react-router-dom"
import {
  UserOutlined,
} from '@ant-design/icons';

import style from "./index.module.less"
import axios from 'axios';

const { Sider } = Layout
const { SubMenu } = Menu
const MenuItem = Menu.Item

const iconList = {
  "/home": <UserOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <UserOutlined />,
  "/right-manage/role/list": <UserOutlined />,
  "/right-manage/right/list": <UserOutlined />,
  "/news-manage": <UserOutlined />,
  "/news-manage/add": <UserOutlined />,
  "/news-manage/draft": <UserOutlined />,
  "/audit-manage": <UserOutlined />,
  "/audit-manage/audit": <UserOutlined />,
  "/audit-manage/list": <UserOutlined />,
  "/publish-manage": <UserOutlined />,
  "/publish-manage/unpublished": <UserOutlined />,
  "/publish-manage/published": <UserOutlined />,
  "/publish-manage/published": <UserOutlined />,
  "/publish-manage/sunset": <UserOutlined />
}


function SideMenu(props) {

  const [menu, setMenu] = useState([])

  // 动态获取路由结构
  useEffect(() => {
    axios.get('http://localhost:8888/rights?_embed=children').then(res => {
      setMenu(res.data)
    })
  }, [])

  // 渲染判断 pagepermisson 是根据后端返回的判断页面路由的标识
  const checkPagePermission = (item) => {
    return item.pagepermisson === 1
  }

  // 动态生成导航
  const renderMenu = (menuList) => {
    return menuList && menuList.map(item => {
      if (item.children && checkPagePermission(item)) {
        return (
          <SubMenu key={item.key} title={item.title} icon={iconList[item.key]}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return checkPagePermission(item) && (<MenuItem key={item.key} icon={iconList[item.key]} onClick={() => {
        props.history.push(item.key)
      }}>{item.title}</MenuItem>)
    })
  }

  return (
    <Sider trigger={null} collapsible collapsed={false} className={style.sider} >
      <div className={style.logo}>全球新闻管理系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {renderMenu(menu)}
      </Menu>
    </Sider>
  )
}

export default withRouter(SideMenu);