import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Table, Button, message } from "antd"

export default function Published() {

    const [dataSource, setDataSource] = useState([])

    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
            key: 'title',
            render: (title, item) => {
                return <a href={`/news-manage/preview/${item.id}`}>{title}</a>
            }
        }, {
            title: '作者',
            dataIndex: 'author'
        }, {
            title: '新闻分类',
            dataIndex: 'category',
            render: (category) => {
                return category.title
            }
        }, {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type="primary" onClick={() => offLineMethod(item)}>下线</Button>
                </div>
            }
        },
    ]

    useEffect(() => {
        axios.get(`/news?publishState=2&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }, [])

    const offLineMethod = (item) => {
        axios.patch(`/news/${item.id}`, {
            publishState: 3
        }).then(res => {
            setDataSource(dataSource.filter(data => data.id !== item.id))
            message.success('下线成功！')
        })
    }

    return (
        <div>
            <Table
                pagination={{ pageSize: 5 }}
                dataSource={dataSource}
                rowKey={item => item.id}
                columns={columns}
            />
        </div>
    )
}
