import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Table, Button, message } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default function Audit() {

    const [dataSource, setDataSource] = useState([])
    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))

    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
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
                    <Button shape="circle" onClick={() => auditChangeMethod(item, 2, 1)} type="primary" icon={<CheckOutlined />} />&nbsp;&nbsp;
                    <Button shape="circle" onClick={() => auditChangeMethod(item, 3, 0)} danger icon={<CloseOutlined />} />
                </div>
            }
        },
    ]

    useEffect(() => {
        const roleObj = {
            "1": 'superadmin',
            "2": 'admin',
            "3": 'editor'
        }
        axios.get(`/news?auditState=1&_expand=category`).then(res => {
            const listData = res.data
            if (roleObj[roleId] === 'superadmin') {
                setDataSource(listData)
            } else {
                setDataSource([
                    ...listData.filter(item => item.author === username),
                    ...listData.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
                ])
            }
        })
    }, [roleId, region])

    const auditChangeMethod = (item, auditState, publishState) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.patch(`/news/${item.id}`, {
            auditState,
            publishState,
        }).then(() => {
            message.success('操作成功！')
        })
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                rowKey={item => item.id}
            />
        </div>
    )
}
