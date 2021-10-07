import React from 'react'
import { Button } from "antd"
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
        // 在设置数据结构的时候，删除指定 id 的数据的时候，会删除关联的数据
        // "ports": [{id:1, title:"1111111111", author: "小林"}]
        // "comments": [{id:2, body:"12321321321-common", portId: 1}]
        // 在删除 /ports/1 的时候，会连带删除 /comments/2 这条数据，因为这条数据的 portId = 1

        // axios.delete('http://localhost:8888/ports/1')

        // // 改
        // axios.put('http://localhost:8888/ports/1', {
        //     title: '3333333',
        //     author: '隔壁老王'
        // })

        // // 局部更新
        // axios.patch('http://localhost:8888/ports/2', {
        //     title:"222232323232"
        // })

        // // _embed 多表关联 根据文章获取到文章对应的评论
        // axios.get('http://localhost:8888/ports?_embed=comments').then(res=>{
        //     console.log(res.data)
        // })

        // // _expand 多表关联 根据评论获取到对应的文章
        // axios.get('http://localhost:8888/comments?_expand=port').then(res => {
        //     console.log(res)
        // })
    }

    return (
        <div>
            Home <Button type="primary" onClick={getData}>点击</Button>
        </div>
    )
}
