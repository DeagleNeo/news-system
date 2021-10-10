import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Login from "../pages/Login";
import NewsSandBox from "../pages/NewsSandBox/index.js";
import NewsIndex from '../pages/News/index.js';
import NewsDetail from "../pages/News/Detail.js"
import NotFount from '../pages/NotFount';


export default function indexRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}></Route>
                {/* 游客模式路由 */}
                <Route path="/news" component={NewsIndex} />
                <Route path="/detail/:id" component={NewsDetail} />
                {/* 管理系统模式路由 */}
                <Route path="/" render={() => {
                    const token = localStorage.getItem('token');
                    if (token) return <NewsSandBox></NewsSandBox>;
                    return <Redirect to="/login"></Redirect>
                }}></Route>
            </Switch>
        </Router>
    )
}
