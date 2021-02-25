'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {

    this.ctx.body = 'api hi';
  }

  //获得主页文章列表
  async getArticleList() {
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      '.type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id '+
      'ORDER BY article.id DESC';
      //之前忘记在type.id后面加空格,报错
    const results = await this.app.mysql.query(sql);//query高级查询
    this.ctx.body = {
      data: results
    }
  }

  //根据ID获取对应文章详细内容
  async getArticleById() {
    let id = this.ctx.params.id;
    //console.log("id:>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.",this.ctx);
    let sql_up = `UPDATE article SET view_count = view_count+1 WHERE id = ${id}`;
    let res = await this.app.mysql.query(sql_up);

    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d ' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id 
    const result = await this.app.mysql.query(sql);
    
    let view_count = result[0].view_count;
    //console.log("访问人数:>>>>>",view_count);  
    this.ctx.body = {
      data: result,
    }
  }


  //获取文章类别信息
  async getTypeInfo() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = {
      data: result
    }
  }


  //根据类别ID获得文章列表
  async getListById() {
    let id = this.ctx.params.id;
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d ' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE type_id=' + id +
      ' ORDER BY article.id DESC '
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result  
    };
  }

}

module.exports = HomeController;
