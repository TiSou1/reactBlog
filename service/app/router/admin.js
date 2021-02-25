//后台路由配置

module.exports = app=>{
    const {router, controller} = app;
    //路由守卫
    const adminauth = app.middleware.adminauth();
    router.get('/admin/index',controller.admin.home.index);//主页路由,路由守卫
    router.post('/admin/checkLogin',controller.admin.home.checkLogin);//登录检查
    //加入路由守护,有了路由守卫，也就是说你不登录，去访问这个接口是无效的，会返回让你去登录的。
    router.get('/admin/getTypeInfo',adminauth,controller.admin.home.getTypeInfo);//文章类型
    router.post('/admin/addArticle',adminauth,controller.admin.home.addArticle);//增加文章
    router.post('/admin/updateArticle',adminauth,controller.admin.home.updateArticle);//更新文章
    router.get('/admin/getArticleList',adminauth,controller.admin.home.getArticleList);//获取文章列表
    router.get('/admin/delArticle/:id',adminauth,controller.admin.home.delArticle);//获取文章列表
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.home.getArticleById);//按照id查找文章
    router.get('/admin/getUserInfo',adminauth,controller.admin.home.getUserInfo);//用户信息
    router.post('/admin/updateUser/:id',adminauth,controller.admin.home.updateUserInfo);//修改用户信息
    router.get('/admin/delUser/:id',adminauth,controller.admin.home.delUser);//删除用户信息
    router.post('/admin/addUser',adminauth,controller.admin.home.addUser);//添加用户
}