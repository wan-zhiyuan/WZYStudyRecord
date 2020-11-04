const http = require('http');
const express = require('express');

// 指定服务器的主机名和端口号
const hostname = 'localhost';
const port = 3000;

const app = express();

// 创建中间件
function loggingMiddleware(req, res, next) {
    const time = new Date();
    console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`)
    next();
}

// 添加全局中间件
app.use(loggingMiddleware);

// 指定模板存放目录
app.set('views', 'views');
// 指定模板引擎为 HandleBars
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    // res.send('Hello World')
    //使用模板
    res.render('index');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

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
