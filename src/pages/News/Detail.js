import React, { useState, useEffect } from 'react'
import { PageHeader, Descriptions, message } from 'antd';
import moment from "moment";
import axios from 'axios';
import { HeartTwoTone } from '@ant-design/icons';


export default function NewsDetail(props) {
    const [newsInfo, setNewsInfo] = useState({})
    const [subTitle, setSubTitle] = useState('')
    const [isLink, setIsLink] = useState(false);

    // 获取文章数据
    useEffect(() => {
        const id = props.match.params.id
        // 请求关联分类和角色
        axios.get(`/news/${id}?_expand=category&_expand=role`).then(res => {
            setNewsInfo({
                ...res.data,
                // 文章访问量 +1
                view: res.data.view + 1
            })
            setSubTitle(res.data.category.title)
            return res.data;
        }).then(res => {
            // 向后端保存数据
            axios.patch(`/news/${id}`, {
                view: res.view + 1
            })
        })
    }, [])

    const linkMethod = () => {
        console.log('link')
        const id = props.match.params.id

        if (isLink) {
            message.error('您已点赞！')
        } else {
            axios.patch(`/news/${id}`, {
                star: newsInfo.star + 1
            })
            setIsLink(true)
            setNewsInfo({
                ...newsInfo,
                // 文章访问量 +1
                star: newsInfo.star + 1
            })
            message.success('点赞成功！')
        }
    }

    return (
        <div>
            {newsInfo && <PageHeader
                onBack={() => window.history.back()}
                title={newsInfo.title}
                subTitle={<span>{subTitle}&nbsp;&nbsp;<HeartTwoTone onClick={() => linkMethod()} twoToneColor="#eb2f96" /></span>}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">
                        {newsInfo.publishTime ? moment(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                    <Descriptions.Item label="访问数量"><span style={{ color: 'green' }}>{newsInfo.view}</span></Descriptions.Item>
                    <Descriptions.Item label="点赞数量"><span style={{ color: 'green' }}>{newsInfo.star}</span></Descriptions.Item>
                    <Descriptions.Item label="评论数量"><span style={{ color: 'green' }}>{0}</span></Descriptions.Item>
                </Descriptions>
            </PageHeader>}
            {newsInfo && <div style={{ border: "1px dashed #b4b5b6", margin: "10px 24px", padding: 5, borderRadius: 5 }} dangerouslySetInnerHTML={{ __html: newsInfo.content }}></div>}
        </div>

    )
}
