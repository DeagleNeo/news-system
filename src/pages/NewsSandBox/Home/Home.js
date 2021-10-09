import React, { useState, useEffect } from 'react'
import { Card, Col, Row, List, Avatar } from 'antd';
import {
    UnorderedListOutlined, EditOutlined, EllipsisOutlined, PieChartOutlined, UserOutlined
} from '@ant-design/icons';

import axios from 'axios';

const { Meta } = Card;

export default function Home() {

    const [viewDataSource, setViewDataSource] = useState([])
    const [starDataSource, setStarDataSource] = useState([])
    const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem('token'))

    // 获取用户最常浏览的数据
    useEffect(() => {
        axios.get(`/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6`).then(res => {
            setViewDataSource(res.data)
        })
    }, [])

    // 获取点赞最多的数据
    useEffect(() => {
        axios.get(`/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6`).then(res => {
            setStarDataSource(res.data)
        })
    }, [])

    return (
        <Row gutter={16}>
            <Col span={8}>
                <Card title={<span>用户最常浏览&nbsp;<UnorderedListOutlined /></span>} bordered={true}>
                    <List
                        size="large"
                        dataSource={viewDataSource}
                        renderItem={item => <List.Item><a href={`/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card title={<span>用户点赞最多&nbsp;<UnorderedListOutlined /></span>} bordered={false}>
                    <List
                        size="large"
                        dataSource={starDataSource}
                        renderItem={item => <List.Item><a href={`/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card
                    cover={
                        <img
                            alt="example"
                            src="/admin.png"
                        />
                    }
                    actions={[
                        <PieChartOutlined onClick={()=>{
                            console.log('PieChartOutlined')
                        }} key="" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar size={32} icon={<UserOutlined />} />}
                        title={username}
                        description={<div><b>{region ? region : '全球'}</b><span style={{ paddingLeft: 30 }}>{roleName}</span></div>}
                    />
                </Card>
            </Col>
        </Row>
    )
}
