import React, { useState, useEffect } from 'react'
import { Layout, Menu } from "antd"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
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
  "/publish-manage/sunset": <UserOutlined />,
  "/news-manage/category": <UserOutlined />
}


function SideMenu(props) {

  const [menu, setMenu] = useState([])
  const selectKey = [props.location.pathname]
  const openKeys = ["/"+ props.location.pathname.split("/")[1]]

  // 动态获取路由结构
  useEffect(() => {
    axios.get('http://localhost:8888/rights?_embed=children').then(res => {
      setMenu(res.data)
    })
  }, [])

  // 渲染判断 pagepermisson 是根据后端返回的判断页面路由的标识
  const checkPagePermission = (item) => {
    const {role: { rights }} = JSON.parse(localStorage.getItem('token'))
    return item.pagepermisson && rights.includes(item.key)
  }

  // 动态生成导航
  const renderMenu = (menuList) => {
    return menuList && menuList.map(item => {
      if (item.children?.length > 0 && checkPagePermission(item)) {
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
    <Sider trigger={null} collapsible collapsed={props.isCollapsed} className={style.sider} >
      <div className={style.menuSider}>
        <div className={style.logo}>{ props.isCollapsed ? '' : '全球新闻管理系统' }</div>
        <div className={style.menuSiderItem}>
          <Menu theme="dark" mode="inline" selectedKeys={selectKey} defaultOpenKeys={openKeys}>
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}

const mapStateToProps = ({ CollApsedReducer: { isCollapsed } }) => {
  return {
      isCollapsed: isCollapsed
  }
}

export default connect(mapStateToProps)(withRouter(SideMenu));