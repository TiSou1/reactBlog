import React,{useState, useEffect} from 'react';
import {List, Row, Col,Button,Modal,message} from 'antd';
import servicePath from '../config/aipUrl';
import axios from 'axios';
const {confirm} = Modal;//提示是否确认删除

function UserInfo(props){
    const [list,setList] = useState([]);


    useEffect(()=>{
        getUserInfo();
    },[])
    //获取用户数据
    const getUserInfo = ()=>{
        axios({
            method:'get',
            url:servicePath.getUserInfo,
            withCredentials:true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(res=>{
            setList(res.data.list);
        })
    }
    //修改用户信息
    const updateUser = (item)=>{
        props.history.push({
            pathname:`/index/user/update/${item.userName}`,
            //账号密码都包括在内
            state:item
        });
    }
    //删除用户
    const delUser = (item,index)=>{
        //数据库中的Id,开头大写,有个小坑
        const id = item.Id;
        confirm({
            title:'确定要删除该账号吗?',
            content:'确认删除后该账号将不能再登录',
            cancelText:'取消',
            okText:'确认',
            onOk(){
                axios({
                    method:'get',
                    url:servicePath.delUser+id,
                    withCredentials:true,
                }).then(res=>{
                    if(res.data.isSuccess){
                        message.success('删除成功');
                        list.splice(index,1);//删除该数据
                        setList([...list]);//剩余方法
                    }else{
                        message.warning('好像出了点什么问题...');
                    }
                   
                })
            },
            okCancel(){
                message.info('取消成功');
            }
        })
    }

    return(
        <div>
            <List
                header={
                    <Row className='list-div'>
                        <Col span={8}>
                            <b>用户名</b>
                        </Col>
                        <Col span={8}>
                            <b>密码</b>
                        </Col>
                        <Col span={8}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={(item,index)=>(
                    <List.Item>
                         <Row className='list-div'>
                        <Col span={8}>
                           {item.userName}
                        </Col>                                         
                        <Col span={8}>
                           {item.password}
                        </Col>
                        <Col span={8}>
                           <Button type="primary" onClick={()=>updateUser(item)}>修改</Button>&nbsp;
                           <Button type="" onClick={()=>delUser(item,index)}>删除</Button>
                        </Col>
                    </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default UserInfo