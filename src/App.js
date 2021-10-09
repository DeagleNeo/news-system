import React from 'react'
import IndexRouter from './routers/indexRouter'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import "antd/dist/antd.css"
import "./styles/public.less"
export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <IndexRouter></IndexRouter>
            </PersistGate>
        </Provider>
    )
}
