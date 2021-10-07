import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Table, Tag, Button, message } from "antd"

export default function AuditList(props) {
    const [dataSource, setDataSource] = useState([])
    const auditMap = {
        "0": "未审核",
        "1": "审核中",
        "2": "已通过",
        "3": "未通过"
    }
    const colorMap = {
        "0": "#108ee9",
        "1": "orange",
        "2": "green",
        "3": "red"
    }
    const opTextMap = {
        "0": "",
        "1": "撤销",
        "2": "发布",
        "3": "修改"
    }
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
            title: '审核状态',
            dataIndex: 'auditState',
            render: (auditState) => {
                return <Tag color={colorMap[auditState]}>{auditMap[auditState]}</Tag>
            }
        }, {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type="primary" onClick={() => auditStateMethod(item)}>{opTextMap[item.auditState]}</Button>
                </div>
            }
        },

    ]

    const { username } = JSON.parse(localStorage.getItem('token'))

    // 获取审核列表
    useEffect(() => {
        // auditState_ne=0 auditState 不等于 0 
        // publishState_lte=1 publishState 小于等于 1
        axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
            console.log(res.data)
            setDataSource(res.data)
        })
    }, [username])

    // 操作事件
    const auditStateMethod = (item) => {
        const state = item.auditState;
        // 审核中事件
        if (state === 1) revertMethod(item);
        // 已通过事件
        if (state === 2) publishMethod(item);
        // 未通过事件
        if (state === 3) {
            props.history.push(`/news-manage/update/${item.id}`)
        }
    }

    // 撤销事件
    const revertMethod = (item) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.patch(`/news/${item.id}`, {
            auditState: 0
        }).then(res => {
            message.success('撤销成功！')
        })
    }

    // 发布事件
    const publishMethod = (item) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.patch(`/news/${item.id}`, {
            publishState: 1
        }).then(res => {
            message.success('发布成功！')
        })
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey={item => item.id}
                pagination={{ pageSize: 5 }}
            />
        </div>
    )
}
