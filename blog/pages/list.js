import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import { Row, Col, List, Breadcrumb } from 'antd'
import Header from '../components/header'
import Author from '../components/author'
import Footer from '../components/footer'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
//1monokai-sublime.css

export default function ArticleList(list) {
  //console.log('>>>>>>>>>>>>',list.data)
  const [mylist, setMylist] = useState(list.data);
  const [type, setType] = useState('前端');
 
  useEffect(() => {
    setMylist(list.data);
  
    //设置面包屑值
    let id = Router.query.id;
    let str;
    if (id == 1)
      str = '前端';
    else if (id == 2)
      str = '兴趣';
    else
      str = '生活';
    setType(str);
  })

  //markdown解析
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });


  return (
    <div>
      <Head>
        <title>tisou1</title>
      </Head>
      <Header />

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>

            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item><a>{type}</a></Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined />{item.addTime}</span>
                    <span><FolderOutlined />{item.typeName}</span>
                    <span><FireOutlined />{item.view_count}</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>

      <Footer />
    </div>
  )
}



ArticleList.getInitialProps = async (context) => {

  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(
      (res) => resolve(res.data)
    )
  })
  return await promise
}

// export async function getStaticProps(context){
//   let id =context.query.id
//   const res = await axiox(servicePath.getListById+id);
//   const data = await res.data.data;
//   return {
//     props:{
//       list:data
//     }
//   }

// }