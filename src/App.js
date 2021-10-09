import React from 'react'
import IndexRouter from './routers/indexRouter'
import { Provider } from "react-redux"
import store from './redux/store'
import "antd/dist/antd.css"
import "./styles/public.less"
export default function App() {
    return (
        <Provider store={store}>
            <IndexRouter></IndexRouter>
        </Provider>
    )
}
