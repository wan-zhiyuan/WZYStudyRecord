setTimeout(() => {
    console.log('Hello World!')
}, 3000); // 等待的同事，没有阻塞，而是继续向下执行，这就是Node.js的异步非阻塞

console.log('当前进程 ID', process.pid);
console.log('当前脚本路径', __filename);

// ECMAScript语言定义的全局对象： Date
const time = new Date();
console.log('当前时间', time.toLocaleString())