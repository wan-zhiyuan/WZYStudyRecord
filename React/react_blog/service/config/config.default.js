/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605883270680_3057';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '12345678',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // 解决跨域时 设置安全机制配置
  config.security = {
    scrf:{
      enbale: false,
    },
    domainWhiteList:['*']
  };
  config.cors = {
    origin:'*', // 允许哪些域名可以跨域访问 这里设置所有
    allowMethods:'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS' // 允许哪些方法跨域访问
  }



  return {
    ...config,
    ...userConfig,
  };
};
