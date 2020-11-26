# react_blog service端

# 笔记

* app文件夹:项目开发文件，程序员主要操作的文件，项目的大部分代码都会写在这里。
* config文件夹：这个是整个项目的配置目录，项目和服务端的配置都在这里边进行设置。
* logs文件夹：日志文件夹，正常情况下不用修改和查看里边内容。
* node_modules:项目所需要的模块文件，这个前端应该都非常了解，不多作介绍。
* run文件夹：运行项目时，生成的配置文件，基本不修改里边的文件。
* test文件夹：测试使用的配合文件，这个在测试时会使用。
* .autod.conf.js: egg.js自己生成的配置文件，不需要进行修改。
* slinttrc和eslintignore：代码格式化的配置文件。
* gitgnore：git设置忽略管理的配置文件。
* package.json： 包管理和命令配置文件，这个文件经常进行配置。

# 如何添加路由
API方法写在哪个文件夹？
controller文件夹可以创建不同的文件夹作为前后端分离使用
对应的在app目录下创建router文件夹分别放置不同端的路由文件
并且在router.js文件中引入



see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org