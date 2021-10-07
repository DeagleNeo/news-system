import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { Button, PageHeader, Steps, Form, Input, Select, message, notification } from "antd"

import NewsEditor from './components/NewsEditor'

import style from "./index.module.less"

const { Step } = Steps
const { Option } = Select


export default function NewsUpdate(props) {
    const [current, setCurrent] = useState(0)
    const [categories, setCategories] = useState([])
    const [formInfo, setFormInfo] = useState({})
    const [content, setContent] = useState('')
    const newsForm = useRef(null)

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    }

    // 获取新闻分类
    useEffect(() => {
        axios.get(`/categories`).then(res => {
            setCategories(res.data)
        })
    }, [])

    // 获取新闻详情
    useEffect(() => {
        const id = props.match.params.id;
        axios.get(`/news/${id}?_expand=category&_expand=role`).then(res => {
            let { title, categoryId, content } = res.data
            newsForm.current.setFieldsValue({
                title,
                categoryId,
            })
            setContent(content)
        })
    }, [])

    // 下一步事件
    const currentNextMethod = () => {
        if (current === 0) {
            newsForm.current.validateFields().then(res => {
                setFormInfo(res)
                setCurrent(current + 1)
            }).catch(err => {
                console.log(err)
            })
        } else if (current < 2) {
            if (content === "" || content.trim() === '<p></p>') {
                message.error('新闻内容不能为空！')
            } else {
                setCurrent(current + 1)
            }
        }
    }

    // 上一步事件
    const currentPreviousMethod = () => {
        if (current > 0) {
            setCurrent(current - 1)
        }
    }

    // 提交事件
    const handleSave = (auditState) => {
        axios.patch(`/news/${props.match.params.id}`, {
            ...formInfo,
            "content": content,
            "auditState": auditState, // 审核
        }).then(res => {
            notification.info({
                message: `通知`,
                description: `您可以到${auditState === 0 ? "草稿箱" : "审核列表"}中查看您的新闻！`,
                placement: "bottomRight",
            });
            auditState === 0 ? props.history.push('/news-manage/draft') : props.history.push('/audit-manage/list')
        })
    }

    return (
        <div>
            <PageHeader
                title="更新新闻"
                onBack={() => props.history.goBack()}
            />
            <Steps current={current}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" />
                <Step title="新闻提交" description="保存草稿或者提交审核" />
            </Steps>

            <div className={style.container}>
                {/* 基本信息 */}
                <div className={current === 0 ? "" : style.hiden}>
                    <Form
                        {...layout}
                        ref={newsForm}
                    >
                        <Form.Item
                            label="新闻标题"
                            name="title"
                            rules={[{ required: true, message: '新闻标题不能为空！' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="新闻分类"
                            name="categoryId"
                            rules={[{ required: true, message: '新闻分类不能为空！' }]}
                        >
                            <Select>
                                {categories && categories.map(item => <Option key={item.id} value={item.id}>{item.title}</Option>)}
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
                {/* 新闻内容 */}
                <div className={current === 1 ? "" : style.hiden}>
                    <NewsEditor getContent={(content) => {
                        setContent(content)
                    }} content={content}></NewsEditor>
                </div>
                {/* 新闻提交 */}
                <div className={current === 2 ? "" : style.hiden}>

                </div>
            </div>

            <div style={{ padding: "50px 0" }}>
                {current > 0 && <Button onClick={currentPreviousMethod}>上一步</Button>}
                {current < 2 && <Button onClick={currentNextMethod} type="primary">下一步</Button>}
                {current === 2 && <span>
                    <Button type="primary" onClick={() => handleSave(0)}>保存到草稿箱</Button>
                    <Button danger onClick={() => handleSave(1)}>提交审核</Button>
                </span>}
            </div>
        </div>
    )
}