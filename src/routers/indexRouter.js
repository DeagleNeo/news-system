import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Login from "../pages/Login";
import NewsSandBox from "../pages/NewsSandBox/index.js";


export default function indexRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/" render={() => {
                    const token = localStorage.getItem('token');
                    if (token) return <NewsSandBox></NewsSandBox>;
                    return <Redirect to="/login"></Redirect>
                }}></Route>
            </Switch>
        </Router>
    )
}
