'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'Api hi'
    }

    async getArticleList() {
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            '.type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id'
        const results = await this.app.mysql.query(sql)
        this.ctx.body = { data: results }
    }

    async getArticleById() {
        let id = this.ctx.params.id // 获取客户端请求传递的id值
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,'+
            "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            '.type.typeName as typeName ,' +
            '.type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id
        const results = await this.app.mysql.query(sql)
        this.ctx.body = { data: results }
    }

    // async getArticleById(){
    //     //先配置路由的动态传值，然后再接收值
    //     let id = this.ctx.params.id

    //     let sql = 'SELECT article.id as id,'+
    //     'article.title as title,'+
    //     'article.introduce as introduce,'+
    //     'article.article_content as article_content,'+
    //     "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    //     'article.view_count as view_count ,'+
    //     'type.typeName as typeName ,'+
    //     'type.id as typeId '+
    //     'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    //     'WHERE article.id='+id



    //     const result = await this.app.mysql.query(sql)


    //     this.ctx.body={data:result}

    // }

}

module.exports = HomeController;

// RESTful 应用场景：APP 前后端分离  优点：简单和约束性
// 请求方式 get获取资源 post新建资源 put更新资源 delete删除资源
