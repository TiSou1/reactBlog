

let ipUrl = 'http://127.0.0.1:7001/admin/';

let servicePath = {
    checkLogin: ipUrl + 'checkLogin',//检查用户名密码
    getTypeInfo: ipUrl + 'getTypeInfo',//获得文章类别信息
    addArticle: ipUrl + 'addArticle',//添加文章
    updateArticle: ipUrl + 'updateArticle',//更新文章
    getArticleList: ipUrl + 'getArticleList',//获取文章列表
    delArticle: ipUrl + 'delArticle/',//删除文章
    getArticleById: ipUrl + 'getArticleById/',//按id查找文章
    getUserInfo: ipUrl + 'getUserInfo',//获取用户信息
    updateUser: ipUrl + 'updateUser/',//修改用户信息
    delUser: ipUrl + 'delUser/',//删除用户
    addUser: ipUrl + 'addUser',//添加用户
}

export default servicePath