import React, { useState, useEffect } from 'react'
import { PageHeader, Descriptions } from 'antd';
import moment from "moment";
import axios from 'axios';

export default function NewsPreview(props) {
    const auditMap = {
        "0": "未审核",
        "1": "审核中",
        "2": "已通过",
        "3": "未通过"
    }
    const publishMap = {
        "0": "未发布",
        "1": "待发布",
        "2": "已上线",
        "3": "已下线"
    }
    const [newsInfo, setNewsInfo] = useState({})
    const [subTitle, setSubTitle] = useState('')

    useEffect(() => {
        const id = props.match.params.id
        // 请求关联分类和角色
        axios.get(`/news/${id}?_expand=category&_expand=role`).then(res => {
            console.log(res.data)
            setNewsInfo(res.data)
            setSubTitle(res.data.category.title)
        })
    }, [])

    return (
        <div>
            {newsInfo && <PageHeader
                onBack={() => window.history.back()}
                title={newsInfo.title}
                subTitle={subTitle}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">
                        {newsInfo.publishTime ? moment(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                    <Descriptions.Item label="审核状态"><span style={{ color: "red" }}>{auditMap[newsInfo.auditState]}</span></Descriptions.Item>
                    <Descriptions.Item label="发布状态"><span style={{ color: "red" }}>{publishMap[newsInfo.publishState]}</span></Descriptions.Item>
                    <Descriptions.Item label="访问数量"><span style={{ color: 'green' }}>{newsInfo.view}</span></Descriptions.Item>
                    <Descriptions.Item label="点赞数量"><span style={{ color: 'green' }}>{newsInfo.star}</span></Descriptions.Item>
                    <Descriptions.Item label="评论数量"><span style={{ color: 'green' }}>{0}</span></Descriptions.Item>
                </Descriptions>
            </PageHeader>}
            {newsInfo && <div style={{ border: "1px dashed #b4b5b6", margin: "10px 24px", padding: 5, borderRadius: 5 }} dangerouslySetInnerHTML={{ __html: newsInfo.content }}></div>}
        </div>

    )
}
