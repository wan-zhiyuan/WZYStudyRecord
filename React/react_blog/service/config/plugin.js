'use strict';

// 所有的插件或者外部的组件都需要配置在这个文件中

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
  
// };

exports.mysql = {
  enbale: true,
  package: 'egg-mysql'
}

// 解决egg跨域访问的问题
exports.cors = {
  enable: true,
  package: 'egg-cors'
}
