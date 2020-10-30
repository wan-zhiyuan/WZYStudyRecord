const printProgramInfo = require('./info')
const datetime = require('./datetime')

// 通过process.argv读取命令行参数
const waitTime = Number(process.argv[3])
const message = process.argv[5]

setTimeout(() => {
    console.log(message)
},waitTime*1000)

printProgramInfo()
console.log('当前时间',datetime.getCurrentTime())