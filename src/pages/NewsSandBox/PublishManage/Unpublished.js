import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { message } from "antd"
import PublishedTable from './components/PublishedTable'
import usePublish from './components/usePublish'

export default function Unpublished() {
    // 待发布数据
    const [dataSource, setDataSource] = usePublish(1)

    // 发布事件
    const onLineMethod = (item) => {
        axios.patch(`/news/${item.id}`, {
            publishState: 2
        }).then(res => {
            setDataSource(dataSource.filter(data => data.id !== item.id))
            message.success('发布成功！')
        })
    }

    return (
        <div>
            <PublishedTable opText="发布" dataSource={dataSource} handleMethod={onLineMethod} />
        </div>
    )
}
