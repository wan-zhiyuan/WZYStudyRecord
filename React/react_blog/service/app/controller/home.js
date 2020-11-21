'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async list() {
    const { ctx } = this;
    ctx.body = '<h1>jspang blog</h1>';
  }
}

module.exports = HomeController;

// RESTful 应用场景：APP 前后端分离  优点：简单和约束性
// 请求方式 get获取资源 post新建资源 put更新资源 delete删除资源
