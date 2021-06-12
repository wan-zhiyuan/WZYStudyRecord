const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();

// 指定模版存放目录
app.set('views', 'views')
// 指定模版引擎为 Hnadlebars
app.set('view engine', 'hbs');

function loggingMiddleware(req, res, next) {
    const time = new Date();
    console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

app.use(loggingMiddleware);

app.use(express.static('public'));

app.get('/',(req, res) => {
    // res.send('Hello World123');
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`) // 这里的console.log是输出在终端的
});