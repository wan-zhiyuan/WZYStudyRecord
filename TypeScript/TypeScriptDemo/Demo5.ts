// 标题：函数参数和返回类型的注解

// function getTotal(one : number, two : number) : number{
//     return one + two
// }
// const total = getTotal(1,2)

// 函数无返回的时候，需要注释返回类型void
function sayHello(): void {
    console.log('Hello World')
}

// 函数永远执行不完时，需要注释返回类型never
function errorFunction(): never {
    throw new Error()
    console.log('Hello World')
}

function forNever(): never {
    while (true) { }
    console.log('Hello World')
}

// 参数是对象的情况 如何写参数注解， 如下：
function add({ one, two }: { one: number, two: number }) {
    return one + two
}
const total = add({ one: 1, two: 2 })

function getNumber({ one }: { one: number }) {
    return one
}
const one = getNumber({ one: 1 })