import React, { useState } from "react";
import { Button, Card, Input, Spin, message } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import '../static/css/login.css';
import servicePath from '../config/aipUrl'
import axiox from 'axios'
function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    //账号密码检查
    const checkLogin = () => {
        setIsLoading(true);
        if (!userName) {
            message.error("用户名不能为空");
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return false;
        } else if (!password) {
            message.error("密码不能为空");
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return false;
        }

        let dataProps = {
            'userName': userName,
            'password': password
        }

        axiox({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials:true,//共享session 前后端
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(res => {
            setIsLoading(false);
            //检查访问接口的信息,是否成空
            if (res.data.data === '登陆成功') {
                //登陆成功,跳到首页
                //console.log("登陆成功:openId"res.data.openId);
                localStorage.setItem('openId', res.data.openId);
                //localStorage.setItem('use','admin端');
                props.history.push('/index');
            } else {
                //否则返回错误信息
                message.error("用户名密码错误");
            } 

        })
        setTimeout(()=>{
            setIsLoading(false);
        },600)
    }
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="博客后台登录系统" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="输入用户名"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="输入密码"
                        prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkLogin} > 登 录 </Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login