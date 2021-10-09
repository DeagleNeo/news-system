import React, { useState, useEffect, useRef } from 'react'
import { Card, Col, Row, List, Avatar } from 'antd';
import {
    UnorderedListOutlined, EditOutlined, EllipsisOutlined, PieChartOutlined, UserOutlined
} from '@ant-design/icons';
import * as Echarts from 'echarts';
import _ from 'lodash';

import axios from 'axios';

const { Meta } = Card;

export default function Home() {
    const barRef = useRef(null);
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

    // 获取已发布的全部新闻并渲染可视化图表
    useEffect(() => {
        axios.get(`/news?publishState=2&_expand=category`).then(res => {
            // 根据返回的字段中的 category.title 分组获取数据
            const data = _.groupBy(res.data, item => item.category.title)
            renderBarView(data)
        })
        return () => {
            // 销毁监听窗口改变事件
            window.onresize = null;
        }
    }, [])

    const renderBarView = (data) => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = Echarts.init(barRef.current);
        // 指定图表的配置项和数据
        const option = {
            title: {
                text: '新闻分类图示'
            },
            tooltip: {},
            legend: {
                data: ['数量']
            },
            xAxis: {
                data: Object.keys(data),
                axisLabel: {
                    interval: 0, // 强制显示所有标签
                    rotate: 45, // x 轴旋转角度
                }
            },
            yAxis: {
                minInterval: 1, // y 轴最小间隔
            },
            series: [
                {
                    name: '数量',
                    type: 'bar', // 图标类型
                    data: Object.values(data).map(item => item.length), // 数据
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        // 自适应图表大小
        window.onresize = () => {
            myChart.resize()
        }
    }

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
                        <PieChartOutlined key="" />,
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
            <div ref={barRef} style={{ width: '100%', height: 600, marginTop: 50 }}></div>
        </Row>
    )
}
