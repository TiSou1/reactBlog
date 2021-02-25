import React,{useState}from "react";
import { List, Row, Col, Button, Input, message} from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import axios from 'axios';
import servicePath  from '../config/aipUrl';
import '../static/css/updateUser.css';
const UserUpdate = (props) => {
    let user = props.location.state;
    const [userName,setUserName] = useState(user.userName);
    const [password,serPassword] = useState(user.password);
   
    const updateUser = ()=>{
        //发起axios请求,进行密码修改
        let id = user.Id;
        let dataProps = {
            //es6写法
            userName,
            password,
        }
        axios({
            method:'post',
            url: servicePath.updateUser+id,
            data:dataProps,
            withCredentials:true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(res=>{
            if(res.data.isSuccess)
                message.success('修改成功')
                props.history.push('/index/user');
        })
    }
    return (
        <div className='userUpdate'>
            <Row>
                <Col span={8}>
                    <Input
                        size='large'
                        onChange={e=>setUserName(e.target.value)}
                        value={userName}
                        placeholder='输入用户名'                     
                        prefix={< UserOutlined />} />
                </Col>
                <Col span={8}>
                    <Input
                        size='large'
                        onChange={e=>serPassword(e.target.value)}
                        value={password}
                        placeholder='输入密码'
                        prefix={< KeyOutlined />} />
                </Col>

                <Col span={6}>
                    <Button size='large' type='primary' onClick={updateUser}>确认修改</Button>
                </Col>
            </Row>


        </div>
    )
}

export default UserUpdate