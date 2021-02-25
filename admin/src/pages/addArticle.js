import React, { useState,useEffect } from 'react';
import marked  from 'marked'
import '../static/css/addArticle.css';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import servicePath from '../config/aipUrl';
import moment from "moment";



const { Option } = Select;
const { TextArea } = Input;



function AddArticle(props) {
    const [articleId,setArticleId] = useState(0);//文章id,如果为0表示新增加,如果不是则表示修改
    const [articleTitle,setArticleTitle] = useState('');//文章标题
    const [markdownContent,setMarkdownContent] = useState('');//文章内容
    const [htmlContent,setHtmlContent] = useState('预览内容');//markdow解析后的预览内容
    const [markdownIntroduce,setMarkdownIntroduce] = useState();//简介的md
    const [htmlIntroduce,setHtmlIntroduce] = useState('等待编辑');//md解析后的预览
    const [showDate,setShowDate] = useState();//发布日期
    const [updateDate,setUpdateDate] = useState();//修改日期
    const [typeInfo,setTypeInfo] = useState([]);//文章类别
    const [selectType,setSelectType] = useState('选择类型');//选择文章航类别(目前数据库存了3类)
   
    useEffect(()=>{
        getTypeInfo();
        
        //获取文章id,从上一个路由传递归来articleList.js到adminIndex中的路由,再到addArticle组件接收id参数
        let temId = props.match.params.id;
        if(temId){
            setArticleId(temId);
            getArticleById(temId);
        }
    },[])



    // marked配置
    marked.options({
        renderer:new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists:true,
        smartypants: false,
    });
    // 内容区触发方法
    const changeContent = (e)=>{
        let {value} = e.target
        setMarkdownContent(value);
        let html = marked(value);
        setHtmlContent(html);
    }
    // 简介区触发方法
    const changeIntroduce = (e)=>{
        let {value} = e.target;
        setMarkdownIntroduce(value);
        let html = marked(value);
        setHtmlIntroduce(html);
    }
    //获得文章类型
    const getTypeInfo = ()=>{
        //console.log(localStorage.getItem('openId'));
        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            withCredentials:true,//可跨域
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(res=>{
            //这里的"没有登录是中台路由守护adminauth.js返回的
            if(res.data.data === '未登录'){
                localStorage.removeItem('openId');
                props.history.push('/');//跳转到首页
            }else{
                setTypeInfo(res.data.data);
            }
        })
    }

    //发布文章方法
    const saveArticle = ()=>{
        if(!selectType || selectType=='选择类型'){
            message.error('请选择文章类型');
            return false;
        }else if(!articleTitle){
            message.error('请输入文章标题');
            return false;
        }else if(!markdownContent){
            message.error('请输入文章内容');
            return false;
        }else if(!markdownIntroduce){
            message.error('请输入文章简介');
            return false;
        }
        else if(!showDate){
            message.error('请选择文章发布日期');
            return false;
        }
        //传递到接口的参数
        let dataProps = {
            type_id: selectType,
            title: articleTitle,
            article_content: markdownContent,
            introduce: markdownIntroduce,
        }
        let dateTxt = showDate.replace('-','/');//将字符串转换为事件戳
        dataProps.addTime = (new Date(dateTxt).getTime())/1000;
       
        //判断时新增文章,还是修改文章
        if(articleId == 0){
            console.log("新增文章...");
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true,//允许cookie跨域
            }).then(res=>{
                //设置Id,
                setArticleId(res.data.insertId);
                if(res.data.isSuccess)
                    message.success("发布成功");
                else 
                    message.error('发布失败');           
            })
        }else{//发布成功后,再点击发布,就会是对刚发布的修改
             console.log('修改文章...')
             console.log("artcleId:",articleId);
             dataProps.id = articleId;
             axios({
                 method: 'post',
                 url:servicePath.updateArticle,
                 data:dataProps,
                 withCredentials: true
             }).then(res=>{
                 if(res.data.isSuccess){
                     message.success('修改成功');
                 }else{
                     message.error('保存失败');
                 }
             })
        }
     
    }

    //获取文章通过id,然后显示出来,方便修改
    const getArticleById = (id)=>{
        axios(servicePath.getArticleById+id,{withCredentials:true})
            .then(res=>{
                if(res.data.status == 0){
                    //查找失败
                    message.error('查找失败');
                    return false;
                }else{
                    console.log(res);
                    let articleInfo = res.data.data[0];
                    setArticleTitle(articleInfo.title);
                    setMarkdownContent(articleInfo.article_content);
                    //将内容预览区也填充数据
                    setHtmlContent(marked(articleInfo.article_content));
                    setMarkdownIntroduce(articleInfo.introduce);
                    //将简介预览区也填充数据
                    setHtmlIntroduce(marked(articleInfo.introduce));
                    setShowDate(articleInfo.addTime);
                    setSelectType(articleInfo.typeId);
                }
             
            })
    }


    return (
        <div>
            <Row gutter={5}>
                {/* 第一列 */}
                <Col span={18}>
                    {/* 头部 */}
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                onChange={e=>setArticleTitle(e.target.value)}
                                placeholder="博客标题"
                                size="large"
                            />
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectType} value={selectType} size="large" onChange={(value)=>setSelectType(value)}>
                                {/* defaultValue和value的值一样,显示"视频教程"" */}
                                {
                                    typeInfo.map((item,index)=>{
                                        return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
                                    })
                                }
                                
                            </Select>
                        </Col>
                    </Row>
                   
                    {/* 中部 内容区 */}
                    <Row gutter={10} className="mid-area">
                        {/* markdown内容 */}
                        <Col span={12}>
                            <TextArea
                            className="markdown-content"
                            value = {markdownContent}
                            rows={35}
                            placeholder="文章内容"
                            onChange={changeContent}/>
                        </Col>
                        {/* 解析后的内容 */}
                        <Col span={12}>
                            <div className="show-html"
                            dangerouslySetInnerHTML={{__html:htmlContent}}>

                            </div>
                        </Col>
                    </Row>
                </Col>
                {/* 第二列 */}
                <Col span={6}>
                    <Row gutter={5}>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>
                            <Button 
                            type="primary" 
                            size="large" 
                            className="publish-button" 
                            onClick={saveArticle}
                            >发布文章</Button>
                        </Col>
                        <Col span={24} className="introduce">
                            <TextArea 
                            rows={4} 
                            value={markdownIntroduce}
                            placeholder="文章简介" 
                            onChange={changeIntroduce}></TextArea>
                            <div className="introduce-html" dangerouslySetInnerHTML={{__html:htmlIntroduce}}></div>
                        </Col>
                        <Col span={12}>
                          <div className="date-select">
                            <DatePicker
                            onChange={(date,dateString)=>setShowDate(dateString)}
                            placeholder="日期选择"
                            size="large"/>
                          </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle