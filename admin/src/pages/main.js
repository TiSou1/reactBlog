import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from './login'
import AdminIndex from './adminIndex'

function Main(){
    return(
        <Router>
            {/* 设置访问根目录也进入到登录界面 */}
            <Route path="/"  exact  component={Login} />
            <Route path="/login/"  exact  component={Login} />
            <Route path="/index/"  component={AdminIndex}/>
        </Router>
    )
}
export default Main