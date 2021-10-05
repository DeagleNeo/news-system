import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Modal, Switch } from 'antd'
import { QuestionCircleOutlined, UnorderedListOutlined, DeleteOutlined } from "@ant-design/icons"
import axios from 'axios'

import UserForm from './components/UserForm'

const { confirm } = Modal

export default function UserList() {

    const [dataSource, setDataSource] = useState([])
    const [isAddVisible, setIsAddVisible] = useState(false)
    const [isUpdateVisible, setIsUpdateVisible] = useState(false)
    const [regions, setRegions] = useState([])
    const [roles, setRoles] = useState([])
    const [isUpdateDisable, setIsUpdateDisable] = useState(false)
    const [current, setCurrent] = useState(null)
    const addForm = useRef(null)
    const updateForm = useRef(null)

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            filters: [
                ...regions.map(item => ({
                    text: item.title,
                    value: item.value
                })), {
                    text: '全球',
                    value: ''
                }
            ],
            onFilter: (value, item) => item.region === value,
            render: (region) => {
                return region ? region : '全球'
            }
        }, {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => {
                return role?.roleName
            }
        }, {
            title: '用户名',
            dataIndex: 'username',
        }, {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch checked={roleState} disabled={item.default} onChange={() => changeRoleState(item)} />
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
                        disabled={item.default}
                    />&nbsp;&nbsp;
                    <Button
                        type='primary'
                        shape="circle"
                        icon={<UnorderedListOutlined />}
                        disabled={item.default}
                        onClick={() => handleUpdate(item)}
                    />
                </div>
            }
        },
    ]

    // 获取区域列表
    useEffect(() => {
        axios.get(`http://localhost:8888/regions`).then(res => {
            setRegions(res.data)
        })
    }, [])

    // 获取角色列表
    useEffect(() => {
        axios.get(`http://localhost:8888/roles`).then(res => {
            setRoles(res.data)
        })
    }, [])

    // 获取用户列表
    useEffect(() => {
        axios.get(`http://localhost:8888/users?_expand=role`).then(res => {
            setDataSource(res.data)
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
        axios.delete(`http://localhost:8888/users/${item.id}`)
        setDataSource(dataSource.filter(data => data.id !== item.id))
    }

    // 添加用户表单事件
    const addUserFormOk = () => {
        addForm.current.validateFields().then(value => {
            setIsAddVisible(false)
            // 重置表单数据
            addForm.current.resetFields()
            // 发起请求，先生成id，在设置 dataSource，方便后面的删除和更新处理
            axios.post(`http://localhost:8888/users`, {
                ...value,
                "roleState": true,
                "default": false,
            }).then(res => {
                setDataSource([...dataSource, {
                    ...res.data,
                    role: roles.filter(item => item.id === value.roleId)[0]
                }])
            })
        }).catch(err => {
            console.log(err)
        })
    }

    // 显示添加用户的模态框
    const showAddUserModal = () => {
        setIsAddVisible(true)
    }

    // 用户状态更改事件
    const changeRoleState = (item) => {
        item.roleState = !item.roleState
        setDataSource([...dataSource])
        axios.patch(`http://localhost:8888/users/${item.id}`, {
            roleState: item.roleState
        })
    }

    // 编辑用户事件
    const handleUpdate = async (item) => {
        await setIsUpdateVisible(true)
        if (item.roleId === 1) {
            // 禁用区域选项
            setIsUpdateDisable(true)
        } else {
            // 取消禁用区域选项
            setIsUpdateDisable(false)
        }
        setCurrent(item)
        // 显示数据
        updateForm.current.setFieldsValue(item)
    }

    // 编辑用户表单事件
    const updateUserFormOk = () => {
        updateForm.current.validateFields().then(value => {
            setIsUpdateVisible(false)
            // 重置表单数据
            updateForm.current.resetFields()
            setDataSource(dataSource.map(item => {
                if (item.id === current.id) {
                    return {
                        ...item,
                        ...value,
                        role: roles.filter(data => data.id === value.roleId)[0]
                    }
                }
                return item
            }))
            setIsUpdateDisable(!isUpdateDisable)
            axios.patch(`http://localhost:8888/users/${current.id}`, value)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Button type="primary" onClick={() => {
                showAddUserModal()
            }}>添加用户</Button>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                rowKey={item => item.id}
            />
            <Modal
                visible={isAddVisible}
                title="添加用户"
                okText="确认"
                cancelText="取消"
                onCancel={() => {
                    setIsAddVisible(false)
                }}
                onOk={() => addUserFormOk()}
            >
                <UserForm
                    ref={addForm}
                    regions={regions}
                    roles={roles}
                />
            </Modal>

            <Modal
                visible={isUpdateVisible}
                title="编辑用户"
                okText="更新"
                cancelText="取消"
                onCancel={() => {
                    setIsUpdateVisible(false)
                    setIsUpdateDisable(!isUpdateDisable)
                }}
                onOk={() => updateUserFormOk()}
            >
                <UserForm
                    roles={roles}
                    ref={updateForm}
                    regions={regions}
                    isUpdateDisable={isUpdateDisable}
                />
            </Modal>
        </div>
    )
}
