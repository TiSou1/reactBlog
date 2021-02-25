import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import '../static/css/adminIndex.css'
import {
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Route, Link } from 'react-router-dom';
import AddArticle from './addArticle';
import ArticleList from './articleList';
import UserInfo from './userInfo';
import UserUpdate from "./userUpdate";
import UserAdd from './userAdd';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {

    const [collapsed, setCollapsed] = useState(false);
    const [path, setPath] = useState([]);//当前路径



    const onCollapse = collapsed => {
        // console.log(collapsed);
        setCollapsed(collapsed);
    };


    const pathSetting = (pathList, path) => {
        let pathObject = pathList.map(item => {
            return { num: item, opera: path }
        })
        setPath(pathObject);
    }
    let pathSource = {
        articleAdd: '文章管理/添加文章',
        articleList: '文章管理/文章列表',
        userAdd: '管理员/管理员添加',
        userList:'管理员/管理员列表',
    }
    const handleClickArticle = e => {
        if (e.key == 'addArticle') {
            props.history.push('/index/add');
            let pathList = pathSource.articleAdd.split('/');
            pathSetting(pathList, '/index/add');
        } else {
            props.history.push('/index/list');
            let pathList = pathSource.articleList.split('/');
            pathSetting(pathList, '/index/list');
        }
    }
    //管理员用户
    const handleClickUserInfo = (e) => {
        console.log(e.key);
        if(e.key == 'userAdd'){
            props.history.push('/index/user/add');
            //加上filter去除空的
            let pathList = pathSource.userAdd.split('/').filter(i => i);
            pathSetting(pathList, '/index/user/add');
        }else{
            props.history.push('/index/user/list');
            //加上filter去除空的
            let pathList = pathSource.userList.split('/').filter(i => i);
            pathSetting(pathList, '/index/user/list');
        }
    
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo">博客后台管理</div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="controller" icon={<PieChartOutlined />}>
                        控制台
                     </Menu.Item>

                    <SubMenu
                        key="article"
                        onClick={handleClickArticle}
                        icon={<FileOutlined />}
                        title={<span>
                            文章管理
                    </span>}>
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="articleList">文章列表</Menu.Item>
                    </SubMenu>
                    {/* 用户 */}
                    <SubMenu
                        key='user'
                        icon={<UserOutlined />}
                        title={<span>
                              User
                         </span>}>
                        <Menu.Item
                            onClick={handleClickUserInfo}
                            key="userAdd">
                            添加管理员
                        </Menu.Item>
                        <Menu.Item
                            onClick={handleClickUserInfo}
                            key="userList"> 
                            管理员列表
                        </Menu.Item>
                    </SubMenu>

                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        {
                            path.map((item, index) => {
                                return (
                                    <Breadcrumb.Item key={index}>
                                        <Link to={{
                                            pathname: item.opera
                                        }}> {item.num}</Link>
                                    </Breadcrumb.Item>
                                )
                            })
                        }
                        {/* <Breadcrumb.Item>
                            <a href='/index/'>{path.type}</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href='/index/list/'>{path.operater}</a>
                        </Breadcrumb.Item> */}
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <div>
                            <Route path="/index/" exact component={AddArticle} />
                            <Route path="/index/add" exact component={AddArticle} />
                            <Route path="/index/list" exact component={ArticleList} />
                            <Route path="/index/add/:id" exact component={AddArticle} />
                            <Route path="/index/user/list" exact component={UserInfo} />
                            <Route path="/index/user/update/:name" exact component={UserUpdate} />
                            <Route path="/index/user/add" component={UserAdd}/>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default AdminIndex
