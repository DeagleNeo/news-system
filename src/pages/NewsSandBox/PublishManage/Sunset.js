import axios from 'axios'
import React from 'react'
import { message } from "antd"
import PublishedTable from './components/PublishedTable'
import usePublish from './components/usePublish'

export default function Sunset() {
    // 已下线数据
    const [dataSource, setDataSource] = usePublish(3)

    // 删除事件
    const onLineMethod = (item) => {
        axios.delete(`/news/${item.id}`).then(res => {
            setDataSource(dataSource.filter(data => data.id !== item.id))
            message.success('删除成功！')
        })
    }

    return (
        <div>
            <PublishedTable opText="删除" dataSource={dataSource} handleMethod={onLineMethod} />
        </div>
    )
}
