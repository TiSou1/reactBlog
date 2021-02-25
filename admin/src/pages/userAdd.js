import React,{useState,useEffect} from 'react';
import '../static/css/userAdd.css';
import {message} from 'antd'
import axios from 'axios';
import servicePath from '../config/aipUrl';


function  UserAdd(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    //输入框值
    const userNameChange = (e)=>{
        setUserName(e.target.value);
    }
    const passwordChange = e =>{
        setPassword(e.target.value);
    }

    //传递到接口的数据
    let dataProps = {
        userName,
        password,
    }
    const addUser = ()=>{
        setUserName('');
        setPassword('');
        axios({
            method:'post',
            url:servicePath.addUser,
            data:dataProps,
            withCredentials:true,
        })
            .then(res=>{
                if(res.data.status)
                    message.success('添加成功');
                else  
                    message.warning('似乎出现了一点问题...');
            })
    }
    return(
        <div className='userAdd'>
           <input type='text' placeholder='输入用户名' value={userName} onChange={userNameChange}/>
           <input type='password' placeholder='输入密码' value={password} onChange={passwordChange}/>
           <button onClick={addUser}>添加用户</button>
        </div>
    )
}


export default UserAdd;