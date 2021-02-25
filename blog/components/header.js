import React, { useEffect, useState } from "react";
import Router from 'next/router'
import { Col, Row, Menu, BackTop} from 'antd'
import { MessageOutlined, Html5Outlined, HomeOutlined, SmileOutlined,UpCircleOutlined } from '@ant-design/icons'


const Header = (props) => {
    // const [navArray, setNavArray] = useState([]);
    //如果要写成动态分类 用这个useEffect请求后台数据,
    //这里因为图标引入问题,就写换成那个静态
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(servicePath.getTypeInfo)
    //             .then(res => {
    //                 return res.data.data;
    //             })

    //         setNavArray(result);
    //     }
    //     fetchData();
    // }, [])


    //函数式跳转
    const handleClick = (e) => {
        if (e.key == 0) {
            Router.push('/');
        } else {
            // Router.push('/list?id=' + e.key);
            //以下等同上面
            Router.push({
                pathname:'/list',
                query:{
                    id: e.key,
                }
            })
        }
    }
    // 回到顶部样式
    let style = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,.45)',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        borderRadius:40,
      }


    return (
        <div className="header">
            {/* 回到顶部 */}
            <BackTop>
                <div style={style} className="top-bar">
                    <UpCircleOutlined />
                </div>
            </BackTop>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <a className="header-logo" href="/">tisou1</a>
                    <span className="header-txt">前端学习</span>
                </Col>

                <Col className="menu-div" xs={0} sm={0} md={14} lg={10} xl={7}>
                    <Menu
                        mode="horizontal"
                        onClick={handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined />
                        首页
                         </Menu.Item>
                        {/* {
                             navArray.map((item)=>{
                                 let ItemIcon = item.icon;
                                return(
                                    <Menu.Item key={item.Id}>
                                  
                                        {item.typeName}
                                    </Menu.Item>
                                )
                               }) 
                         } */}
                        <Menu.Item key="1">
                            <Html5Outlined />
                        前端
                         </Menu.Item>
                        <Menu.Item key="2">
                            <MessageOutlined />
                        兴趣
                         </Menu.Item>
                        <Menu.Item key="3">
                            <SmileOutlined />
                        生活
                         </Menu.Item>
                    </Menu>
                </Col>
            </Row>

        </div>
    )
}



export default Header