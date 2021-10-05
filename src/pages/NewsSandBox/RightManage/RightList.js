import React, { useState, useEffect } from 'react'
import { Table, Tag, Button } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import axios from 'axios'

export default function RightList() {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {

                return <div>{id}</div>
            }
        }, {
            title: '权限名称',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '权限路径',
            dataIndex: 'key',
            key: 'key',
            render: (key) => {

                return <Tag color="orange">{key}</Tag>
            }
        }, {
            title: '操作',
            render: () => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} />&nbsp;&nbsp;
                    <Button type='primary' shape="circle" icon={<EditOutlined />} />
                </div>
            }
        },
    ]
    const [dataSource, setDataSource] = useState([])

    // 获取权限列表
    useEffect(() => {
        axios.get("http://localhost:8888/rights?_embed=children").then(res => {
            setDataSource(res.data)
        })
    }, [])

    return (
        <div>
            <Table
                pagination={{ pageSize: 5 }}
                dataSource={dataSource}
                columns={columns} 
            />
        </div>
    )
}
