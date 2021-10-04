import React from 'react'
import { Button } from "antd"
import axios from 'axios'
export default function Home() {

    const getData = () => {
        // // 获取数据
        // axios('http://localhost:8888/ports/1').then(res=>{
        //     console.log(res.data)
        // })

        // // 增
        // axios.post('http://localhost:8888/ports', {
        //     title: '3333333',
        //     author: '隔壁老王'
        // })

        // // 删除
        // axios.delete('http://localhost:8888/ports/3')

        // // 改
        // axios.put('http://localhost:8888/ports/1', {
        //     title: '3333333',
        //     author: '隔壁老王'
        // })

        // // 局部更新
        // axios.patch('http://localhost:8888/ports/2', {
        //     title:"222232323232"
        // })
    }

    return (
        <div>
            Home <Button type="primary" onClick={getData}>点击</Button>
        </div>
    )
}
