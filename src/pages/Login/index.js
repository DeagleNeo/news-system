import React from 'react'
import { Form, Button, Input, message } from "antd"
import { withRouter } from "react-router-dom"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

import style from "./index.module.less"
import axios from 'axios'

function Login(props) {

    const getFormValue = (values) => {
        axios.get(`http://localhost:8888/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res=>{
            if(res.data && res.data.length>0){
                message.success('登录成功！')
                localStorage.setItem('token', JSON.stringify(res.data[0]))
                props.history.push('/')
            }else{
                message.error('用户名或密码错误！')
                localStorage.removeItem('token')
            }
        })
    }

    return (
        <div className={style.loginBox}>
            <div className={style.loginFormContainer}>
                <p className={style.loginTitle}>全球新闻发布管理系统</p>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={getFormValue}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '用户名不能为空！' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '密码不能为空！' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(Login);