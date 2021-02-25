import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'
import { Row, Col, List, BackTop } from 'antd'
import Header from '../components/header'
import Author from '../components/author'
import Footer from '../components/footer'
import Special from '../components/special'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default function Home(list) {
  //console.log("list:>>>",list);
  const [mylist, setMylist] = useState(list.data);
  const [allCount,setAllCount] = useState(0);
  let sumCount = 0;
 // console.log(list.data);
  

  useEffect(()=>{
    for(let item of list.data){
      sumCount += item.view_count;
    }
   // console.log('总计'+sumCount+"次");
    setAllCount(sumCount);
  },[])

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
    <>
      <Head>
        <title>tisou1</title>
      </Head>
      <Header />
    
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
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
                {/* 传递给子组件 */}
          <Special allCount={allCount}/>
        </Col>
      </Row>

      <Footer />
    </>
  )
}

// export async function getStaticProps() {
//   const res = await axios(servicePath.getArticleList);
//   const data = await res.data.data;
//   //console.log(res);
//   return {
//     props: {
//       list: data,
//     }
//   }
// }


Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        // console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}