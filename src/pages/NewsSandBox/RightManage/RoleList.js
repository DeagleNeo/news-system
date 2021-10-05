import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Tree } from 'antd'
import { QuestionCircleOutlined, UnorderedListOutlined, DeleteOutlined } from "@ant-design/icons"
import axios from 'axios'

const { confirm } = Modal

export default function RoleList() {

    const [dataSource, setDataSource] = useState([])
    const [rightList, setRightList] = useState([])
    const [currentRight, setCurrentRight] = useState([])
    const [currentId, setCurrentId] = useState(0)
    const [visible, setVisible] = useState(false)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <div>{id}</div>
            }
        }, {
            title: '角色名称',
            dataIndex: 'roleName',
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
                    <Button
                        type='primary'
                        shape="circle"
                        icon={<UnorderedListOutlined />}
                        onClick={() => openModalMethod(item)}
                    />
                </div>
            }
        },
    ]

    // 获取角色列表
    useEffect(() => {
        axios.get(`http://localhost:8888/roles`).then(res => {
            setDataSource(res.data)
        })
    }, [])

    // 获取权限列表
    useEffect(() => {
        axios.get(`http://localhost:8888/rights?_embed=children`).then(res => {
            setRightList(res.data)
        })
    }, [])

    // 确认删除提示框
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

    // 删除角色
    const deleteMethod = (item) => {
        axios.delete(`http://localhost:8888/roles/${item.id}`)
        setDataSource(dataSource.filter(data => data.id !== item.id))
    }

    // 打开模态框事件
    const openModalMethod = (item) => {
        setVisible(true)
        setCurrentRight(item.rights)
        setCurrentId(item.id)
    }
    // 模态框确认事件
    const handleOk = () => {
        // 同步数据
        setDataSource(dataSource.map(item => {
            if (item.id === currentId) {
                return {
                    ...item,
                    rights: currentRight
                }
            }
            return item
        }))
        // 发送请求
        axios.patch(`http://localhost:8888/roles/${currentId}`, {
            rights: currentRight
        })
        handleClose()
    }

    // 模态框关闭事件
    const handleClose = () => {
        setVisible(false)
    }

    // 树形组件的 check 事件
    const rightListChangeMethod = (checkKeys) => {
        setCurrentRight(checkKeys.checked)
    }

    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={item => item.id}
            />
            <Modal
                title="权限分配"
                visible={visible}
                okText="确定"
                cancelText="取消"
                onOk={handleOk}
                onCancel={handleClose}
            >
                <Tree
                    checkable
                    checkStrictly
                    treeData={rightList}
                    checkedKeys={currentRight}
                    onCheck={rightListChangeMethod}
                />
            </Modal>
        </div>
    )
}
