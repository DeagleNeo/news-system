import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, Select } from "antd"

const { Option } = Select

const UserForm = forwardRef((props, ref) => {

    const { regions, roles } = props
    const [isDisabled, setIsDisabled] = useState(false)

    // 区域禁用设置
    useEffect(() => {
        setIsDisabled(props.isUpdateDisable)
    }, [props?.isUpdateDisable])

    // 角色 select 改变事件
    const changeRole = (value) => {
        value === 1 ? setIsDisabled(true) : setIsDisabled(false);
        // 根据表单事件重置区域的值
        ref.current.setFieldsValue({
            region: ''
        })
    }

    const { roleId, region } = JSON.parse(localStorage.getItem('token'))
    const roleObj = {
        "1": 'superadmin',
        "2": 'admin',
        "3": 'editor'
    }
    // 区域可选的禁用判断
    const checkRegionDisabled = (item) => {
        if (props.idUpdate) {
            // 更新
            if (roleObj[roleId] === 'superadmin') {
                return false;
            } else {
                return true;
            }
        } else {
            // 添加
            if (roleObj[roleId] === 'superadmin') {
                return false;
            } else {
                return item.value !== region
            }
        }
    }

    // 角色可选的禁用判断
    const checkRoleDisables = (item) => {
        if (props.idUpdate) {
            // 更新
            if (roleObj[roleId] === 'superadmin') {
                return false;
            } else {
                return true;
            }
        } else {
            // 添加
            if (roleObj[roleId] === 'superadmin') {
                return false;
            } else {
                return roleObj[item.id] !== "editor"
            }
        }
    }

    return (
        <Form
            ref={ref}
            layout="vertical"
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: '用户名不能为空！' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: '密码不能为空！' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[{ required: true, message: '角色不能为空！' }]}
            >
                <Select onChange={(value) => changeRole(value)}>
                    {roles && roles.map(item => {
                        return <Option disabled={checkRoleDisables(item)} key={item.id} value={item.id}>{item.roleName}</Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={isDisabled ? [] : [{ required: true, message: '区域不能为空！' }]}
            >
                <Select disabled={isDisabled}>
                    {regions && regions.map(item => {
                        return <Option disabled={checkRegionDisabled(item)} key={item.id} value={item.value}>{item.title}</Option>
                    })}
                </Select>
            </Form.Item>
        </Form>
    )
})

export default UserForm;