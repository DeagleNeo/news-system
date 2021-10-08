import axios from 'axios'
import React from 'react'
import { message } from "antd"
import PublishedTable from './components/PublishedTable'
import usePublish from './components/usePublish'

export default function Published() {
    // 已发布数据
    const [dataSource, setDataSource] = usePublish(2)

    // 下线事件
    const offLineMethod = (item) => {
        axios.patch(`/news/${item.id}`, {
            publishState: 3
        }).then(res => {
            setDataSource(dataSource.filter(data => data.id !== item.id))
            message.success('下线成功！')
        })
    }

    return (
        <div>
            <PublishedTable opText="下线" dataSource={dataSource} handleMethod={offLineMethod} />
        </div>
    )
}
