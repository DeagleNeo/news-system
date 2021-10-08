import React from 'react'
import { Table, Button } from "antd"

export default function PublishedTable(props) {
    const dataSource = props.dataSource
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
                    <Button type="primary" onClick={() => props.handleMethod(item)}>{props.opText}</Button>
                </div>
            }
        },
    ]
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
