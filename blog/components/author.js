import {Avatar,Divider} from 'antd'
import React,{useState, useEffect} from 'react'
import {GithubOutlined,QqOutlined,WechatOutlined} from '@ant-design/icons'
import { use } from 'marked';


const Author = ()=> {
    const [git,setGit] = useState('none');
    const [qq,setQq] = useState('none');
    const [wx,setWx] = useState('none');

    return(
        <div className="author-div comm-box">
            <div><Avatar size={100} clt="图片" src="/tou.jpg" /></div>
            <div className="author-introduction">
                tisou1前端入门者--海纳百川有容乃大,壁立千仞无欲则刚.
                <Divider>社交账号</Divider>
                <div>
                <GithubOutlined style={{fontSize:'26px',paddingRight:'20px',paddingLeft:'30px'}}   onMouseOver={()=>setGit('block')} onMouseOut={()=>setGit('none')} />
                <QqOutlined style={{fontSize:'26px',paddingRight:'20px'}}  onMouseOver={()=>setQq('block')} onMouseOut={()=>setQq('none')} />
                <WechatOutlined style={{fontSize:'26px',paddingRight:'20px'}} onMouseOver={()=>setWx('block')} onMouseOut={()=>setWx('none')} />
                <div className='github-account ac' style={{display:git}}>
                https://github.com/tisou1
                <div className='angle' ></div>
                </div>
                <div className='qq-account ac' style={{display:qq}}>
                    qq:1500434938
                    <div className='angle' ></div>
                </div>
                <div className='wechat-account ac' style={{display:wx}}>
                    wechat:tisou17718
                    <div className='angle' ></div>
                </div>
                </div>
            </div>
                

        </div>
    )
}


export default Author