import axios from 'axios'
import { useState, useEffect } from 'react'

export default function usePublish(type){
    const [dataSource, setDataSource] = useState([])
    const { username } = JSON.parse(localStorage.getItem('token'))

    // 获取已发布数据
    useEffect(() => {
        axios.get(`/news?author=${username}&publishState=${type}&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }, [])
    return [dataSource, setDataSource];
}