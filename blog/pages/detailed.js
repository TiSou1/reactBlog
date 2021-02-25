import React from "react"
import Head from 'next/head'
import { Row, Col, List, Breadcrumb, Affix } from 'antd'//Affix固定
import { CalendarOutlined, FireOutlined, FolderOutlined } from '@ant-design/icons'
import Header from '../components/header'
import Footer from '../components/footer'
import Author from '../components/author'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'



export default function Detailed(props) {

  const tocify = new Tocify()
  const renderer = new marked.Renderer();
  renderer.heading = (text, level, raw) => {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }


  marked.setOptions({
    renderer: renderer,
    gfm: true,//渲染样式
    pedantic: false,//容错,false有容错
    sanitize: false,//不或略html标签
    tables: true,
    breaks: false,//github的换行符
    smartLists: true,//自动渲染列表项
    highlight: (code) => {
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content)

  //console.log(`html:>>>>>`,html)
  return (
    <>
      <Head>
        <title>tisou1</title>
      </Head>
      <Header />

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                {props.title}
              </div>
              <div className="list-icon center">
                <span><CalendarOutlined />{props.addTime}</span>
                <span><FolderOutlined />{props.typeName}</span>
                <span><FireOutlined />{props.view_count}</span>
              </div>
              <div
                className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              >

              </div>
            </div>
          </div>
        </Col>

        <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          {/* 嵌套的组件会在下拉时到顶部固定 */}
          <Affix offsetTop={10}>
            <div className="detailed-nav comm-box">
              <div className="nav-title ">文章目录</div>
                {
                  tocify && tocify.render()
                }

            </div>
          </Affix>
        </Col>
      </Row>

      <Footer />
    </>
  )
}

// Detailed.getInitialProps = async (context)=>{
//   let id = context.query.id;
//   const res = await axios('http://127.0.0.1:7001/default/getArticleById/'+id);
//   const list = res.data.data[0];
//   console.log("res:",list);            
//   return {list};
// }

//获取详细页数据,使用next内置方法getInitialProps将数据传到组件Detailed中用props接收
Detailed.getInitialProps = async (context) => {
 // console.log("id>>>>>>>>>>>>>>>>>>>>>>>>>", context.query.id)
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then(
      (res) => {
      //  console.log("res:",res);
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}
//2.此方法也可以接受到数据
// export async function getServerSideProps(context) {
//   let id = context.query.id;
//   const res = await axios('http://127.0.0.1:7001/default/getArticleById/' + id);
//   const list = res.data.data[0];
//   console.log("res:", list.title);
//   //return { list };
//   return {
//     props: {
//       //query: context.query,
//       params:list
//     }
//   }
// }


// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch('http://127.0.0.1:7001/default/getArticleById')
//   const posts = await res.json();

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.map((post) => ({
//     params: { id: post.id },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }
// export async function getStaticProps({ params }) {
//   console.log("id:--------------------",params.id)
//   const res = await axios('http://127.0.0.1:7001/default/getArticleById/' + id);
//   const data = await res.data.data[0];
//   console.log(data)

//   return {
//     props: {
//       data:""
//     }
//   }
// }
