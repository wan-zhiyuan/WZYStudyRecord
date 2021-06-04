const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();

function loggingMiddleware(req, res, next) {
    const time = new Date();
    console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

app.use(loggingMiddleware);


app.get('/',(req, res) => {
    res.send('Hello World123');
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`) // 这里的console.log是输出在终端的
});