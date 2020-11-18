const http = require('http');
const express = require('express');
const path = require('path')

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')

// 指定服务器的主机名和端口号
const hostname = 'localhost';
const port = 3000;

const app = express(); // app时一个express服务器对象

// 创建中间件
function loggingMiddleware(req, res, next) {
    const time = new Date();
    console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`)
    next();
}

// 添加全局中间件
app.use(loggingMiddleware);

// 添加Express 自带的静态文件服务中间件
app.use(express.static('public'))

// 指定模板存放目录
app.set('views', 'views');
// 指定模板引擎为 HandleBars
app.set('view engine', 'hbs');


app.use('/', indexRouter)
app.use('/api', apiRouter)

/* 使用子路由代替 */
// app.get('/', (req, res) => {
//     // res.send('Hello World')
//     //使用模板
//     res.render('index');
// })

// app.get('/contact', (req, res) => {
//     res.render('contact');
// })

// app.get('/api', (req, res) => {
//     res.json({ name: '图雀社区', website: 'https://tutu.co' })
// })

app.get('/broken', (req, res) => {
    throw new Error('Broken!');
});

app.use('*', (req, res) => {
    res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})


// 创建HTTP服务器
// req 请求对象
// res 响应对象
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('Hello World\n');
// });

// 在指定的端口开启服务器
// server.listen(port, ()=>{
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
