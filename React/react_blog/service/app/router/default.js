// /router/default.js 前台路由配置文件

module.exports = app=>{
    const { router , controller } = app
    router.get('/default/index',controller.default.home.index)
    router.get('/default/getArticleList',controller.default.home.getArticleList)
    router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
}