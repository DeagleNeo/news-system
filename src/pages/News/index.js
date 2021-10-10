import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { PageHeader, Row, Col, Card, List } from "antd"
import _ from "lodash"

export default function NewsIndex() {
    const [dataSource, setDataSource] = useState([])

    // 获取已经发布的新闻数据
    useEffect(() => {
        axios.get(`/news?publishState=2&_expand=category`).then(res => {
            setDataSource(Object.entries(_.groupBy(res.data, item => item.category.title)))
        })
    }, [])

    return (
        <div style={{
            padding: "0 20px"
        }}>
            <PageHeader
                title="全球新闻"
                subTitle="查看新闻"
            />
            <Row gutter={[16, 16]}>
                {dataSource && dataSource.map(item => {
                    const title = item[0];
                    const data = item[1]
                    return <Col key={title} span={8}>
                        <Card hoverable={true} title={title} bordered={true}>
                            <List
                                size="small"
                                dataSource={data}
                                pagination={{ pageSize: 3 }}
                                renderItem={item => <List.Item><a href={`/detail/${item.id}`}>{item.title}</a></List.Item>}
                            />
                        </Card>
                    </Col>
                })}
            </Row>
        </div>
    )
}
