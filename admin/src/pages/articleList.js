import React, {useState, useEffect} from 'react';
import '../static/css/articleList.css';
import { List, Row, Col, Modal, message, Button, Switch } from "antd";
import axios from 'axios';
import servicePath from '../config/aipUrl';
import '../static/css/getArticleList.css'
const {confirm} = Modal;


function ArticleList(props){
    const [list,setList] = useState([]);
    
    useEffect(()=>{
        getList();//调用一次
    },[])

    
    //获取文章列表
    const getList = ()=>{
        axios({
            method:'get',
            url: servicePath.getArticleList,
            withCredentials:true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(res=>{
            setList(res.data.list);
        })
    }
    //删除文章列表
    const delArticle = (id,index)=>{
        confirm({
            title:'确定要删除此文章吗?',
            content:'确认删除,将无法恢复...',
            onOk(){
                axios(servicePath.delArticle + id,{withCredentials:true})
                    .then(res=>{
                        message.success('删除成功');
                        //从index开始,删除一个元素,也就是删除index位置元素
                        list.splice(index,1);
                        setList([...list]);
                    })
            },
            onCancel(){
                message.info('取消成功')
            }
        })
    }
    //查找id
    const updateArticle = (id)=>{
        props.history.push(`/index/add/${id}`);
    }

    return(
        <div>
            <List
                header={
                    <Row className='list-div'>
                        <Col span={8}>
                            <b>标题{`(共计${list.length}篇)`}</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>访问数</b>
                        </Col>
                      
                        <Col span={4}>
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
                           {item.title}
                        </Col>
                        <Col span={4}>
                            {item.typeName}
                        </Col>
                        <Col span={4}>
                            {item.addTime}
                        </Col>
                        <Col span={4}>
                           {item.view_count}
                        </Col>
                        <Col span={4}>
                           <Button type="primary" onClick={()=>updateArticle(item.id)}>修改</Button>&nbsp;
                           <Button type="" onClick={()=>delArticle(item.id,index)}>删除</Button>
                        </Col>
                    </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList