import React, { useEffect } from 'react'
import { Layout } from "antd"
import Nprogress from "nprogress";
import SideMenu from "../../components/SideMenu"
import TopHeader from "../../components/TopHeader"
import NewRouter from '../../components/NewRouter'

import "nprogress/nprogress.css"
import "./index.less"

const { Content } = Layout;

export default function NewsSandBox(props) {
    // 开启进度条
    Nprogress.start()
    useEffect(() => {
        // 关闭进度条
        Nprogress.done()
    })
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
                    <NewRouter />
                </Content>
            </Layout>
        </Layout>
    )
}
