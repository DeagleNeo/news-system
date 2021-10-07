import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, notification } from "antd"
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined, VerticalAlignTopOutlined } from "@ant-design/icons"
import axios from 'axios'

const { confirm } = Modal

export default function NewsDraft(props) {

    const [dataSource, setDataSource] = useState([])
    const { username } = JSON.parse(localStorage.getItem('token'))

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        }, {
            title: '新闻标题',
            dataIndex: 'title',
            key: 'title',
            render: (title, item) => {
                return <a href={`/news-manage/preview/${item.id}`}>{title}</a>
            }
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author'
        }, {
            title: '新闻分类',
            dataIndex: 'category',
            key: 'category',
            render: (category) => {
                return category.title
            }
        },
        {
            title: '操作',
            key: 'op',
            render: (item) => {
                return <div>
                    <Button
                        danger
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => confirmMessage(item)}
                    />&nbsp;
                    <Button
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => props.history.push(`/news-manage/update/${item.id}`)}
                    />&nbsp;
                    <Button
                        type='primary'
                        shape="circle"
                        icon={<VerticalAlignTopOutlined />}
                        onClick={() => {
                            auditStateChange(item.id)
                        }}
                    />
                </div>
            }
        },
    ]

    // 获取权限列表
    useEffect(() => {
        axios.get(`/news?author=${username}&auditState=0&_expand=category`).then(res => {
            const dataList = res.data;
            dataList.map(item => {
                if (item.children && item.children.length === 0) {
                    item.children = ""
                }
                return item
            })
            setDataSource(dataList)
        })
    }, [username])

    // 确认删除权限提示框
    const confirmMessage = (item) => {
        confirm({
            title: '删除',
            icon: <QuestionCircleOutlined />,
            content: '您确认要删除吗？',
            okText: "确认",
            cancelText: '取消',
            onOk() {
                deleteMethod(item)
            }
        })
    }

    // 删除权限
    const deleteMethod = (item) => {
        axios.delete(`/news/${item.id}`)
        setDataSource(dataSource.filter(data => data.id !== item.id))
    }

    // 审核事件
    const auditStateChange = (id) => {
        axios.patch(`/news/${id}`, {
            auditState: 1
        }).then(res => {
            notification.info({
                message: `通知`,
                description: `您可以到审核列表中查看您的新闻！`,
                placement: "bottomRight",
            });
            props.history.push('/audit-manage/list')
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
