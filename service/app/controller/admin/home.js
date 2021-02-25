'use strict'

const Controller = require('egg').Controller;

class HomeController extends Controller {
    //index页面
    async index() {
        this.ctx.body = { data: this.ctx.response };
    }

    //验证账号密码
    async checkLogin() {
        //从请求中获取用户名和密码
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        const sql = `SELECT userName FROM admin_user WHERE userName = '${userName}' 
                    AND password = '${password}'`;
        const res = await this.app.mysql.query(sql);
        if (res.length > 0) {
            //登陆成功进行session缓存
            let openId = new Date().getTime();
            //设置session ctx.session 来访问或者修改当前用户 Session 。
            this.ctx.session.openId = { 'openId': openId };
            //返回给客户端onenId
            this.ctx.body = { 'data': '登陆成功', 'openId': openId };
            // console.log("登录成功,session设置为:",this.ctx.session);
        } else {
            this.ctx.body = { 'data': '登陆失败' };
        }
    }


    //  获取文章类型
    async getTypeInfo() {
        //获取文章类型
        const resType = await this.app.mysql.select('type');
        this.ctx.body = { data: resType };
    }

    //添加文章
    async addArticle() {
        //获取post请求的数据
        let temArticle = this.ctx.request.body;
        //向数据库的表"article"中插入数据
        const result = await this.app.mysql.insert('article', temArticle);
        //返回插入的行数,为1 则表示插入成功
        const innsertSuccess = result.affectedRows === 1;
        const insertId = result.insertId;
        //返回给 请求的数据,记录方便后台得到信息提示
        this.ctx.body = {
            isSuccess: innsertSuccess,
            insertId: insertId
        }
    }


    //更新文章
    async updateArticle() {
        let temArticle = this.ctx.request.body;
        console.log(temArticle);
        const result = await this.app.mysql.update('article', temArticle);
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }


    //文章列表
    async getArticleList() {
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'article.view_count as view_count,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'ORDER BY article.id DESC ';

        const res = await this.app.mysql.query(sql);
        this.ctx.body = {
            list: res
        }
    }


    //删除文章
    async delArticle() {
        //get请求,用params获取id
        let id = this.ctx.params.id;
        const res = await this.app.mysql.delete('article', { 'id': id });
        this.ctx.body = {
            date: res
        }
    }

    // 更新文章
    async getArticleById() {
        const id = this.ctx.params.id;
        //先查找这个id是否存在,再取数据
        // let result = await this.app.mysql.select('article',{id:90});
        let result = await this.app.mysql.query('select * from article where id = ' + id);
        if (result.length < 1)//未查到数据
            this.ctx.body = {
                data: '查找失败',
                status: 0
            }
        else {
            //按照id值查找对应文章
            let sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.article_content as article_content,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ,' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'WHERE article.id=' + id;
            const res = await this.app.mysql.query(sql);
            this.ctx.body = {
                data: res
            }
        }


    }

    //获取用户信息
    async getUserInfo() {
        const users = await this.app.mysql.select('admin_user');
        this.ctx.body = { list: users };
    }

    //修改用户信息
    async updateUserInfo() {
        let id = this.ctx.params.id;
        let data = this.ctx.request.body;
        console.log(data);
        const result = await this.app.mysql.update('admin_user', {
            userName: data.userName,
            password: data.password,
        },
            {
                where: {
                    id: id,
                }
            });
        console.log(result);
        if (result.affectedRows == 1)
            this.ctx.body = {
                isSuccess: true,
            };
    }

    //删除用户
    async delUser() {
        let id = this.ctx.params.id;
        const result = await this.app.mysql.delete('admin_user', { id: id });
        let isSuccess;
        if (result.affectedRows == 1)
            isSuccess = true;
        else
            isSuccess = false;
        this.ctx.body = {
            isSuccess,
        }
    }
    //添加用户
    async addUser() {
        //接收post请求的数据
        let user = this.ctx.request.body;
        const result = await this.app.mysql.insert('admin_user', user);
        let status;
        if (result.affectedRows === 1)
            status = true;
        else   
            status = false;
        this.ctx.body = {
            status: status
        }

    }
}


module.exports = HomeController;