import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from "antd"
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import axios from 'axios'

const { confirm } = Modal

export default function RightList() {

    const [dataSource, setDataSource] = useState([])

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
            render: (item) => {
                return <div>
                    <Button
                        danger
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => confirmMessage(item)}
                    />&nbsp;&nbsp;
                    <Popover
                        content={<div style={{ textAlign: 'center' }}>
                            <Switch checked={item.pagepermisson} onChange={() => {
                                switchChangeMethod(item)
                            }} />
                        </div>}
                        title="页面配置项"
                        trigger={item.pagepermisson === undefined ? "" : "click"}
                    >
                        <Button
                            type='primary'
                            shape="circle"
                            icon={<EditOutlined />}
                            disabled={item.pagepermisson === undefined}
                        />
                    </Popover>
                </div>
            }
        },
    ]

    // 获取权限列表
    useEffect(() => {
        axios.get("http://localhost:8888/rights?_embed=children").then(res => {
            const dataList = res.data;
            dataList.map(item => {
                if (item.children && item.children.length === 0) {
                    item.children = ""
                }
                return item
            })
            setDataSource(dataList)
        })
    }, [])

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
        if (item.grade === 1) {
            // 删除一级权限的时候，json-server 会默认删除一级权限下的所有子权限
            axios.delete(`http://localhost:8888/rights/${item.id}`)
            setDataSource(dataSource.filter(data => data.id !== item.id))
        } else {
            // 删除二级权限
            axios.delete(`http://localhost:8888/children/${item.id}`)
            let list = dataSource.filter(data => data.id === item.rightId)
            list[0].children = list[0].children.filter(data => data.id !== item.id);
            setDataSource([...dataSource])
        }
    }

    // 开关配置项点击事件
    const switchChangeMethod = (item) => {
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
        if (item.grade === 1) {
            axios.patch(`http://localhost:8888/rights/${item.id}`,{
                pagepermisson: item.pagepermisson
            })
        } else {
            axios.patch(`http://localhost:8888/children/${item.id}`,{
                pagepermisson: item.pagepermisson
            })
        }
        setDataSource([...dataSource])
    }

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
