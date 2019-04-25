// 维护服务器接口url的文件
// const serviceUrl = 'http://test.baixingliangfan.cn/baixing/';第一版域名
const serviceUrl = 'http://v.jspang.com:8088/baixing/ ';//第二版域名
// 后台服务真实接口
const servicePath={ 
  'homePageContent':serviceUrl+'wxmini/homePageContent',//商店首页信息
  'homePageBelowContent':serviceUrl+'wxmini/homePageBelowConten',//商城首页热卖商品拉取
  'getCategory':serviceUrl+'wxmini/getCategory',//商品类别信息
  'getMallGoods':serviceUrl+'wxmini/getMallGoods',//商品分类页中的商品列表
};
