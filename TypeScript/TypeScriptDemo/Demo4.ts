// type annotation 类型注解
// type inference 类型推断

let count3 : number;
count3 = 123;

let countInference = 123;

const one = 1;
const two = 2;
const three = one + two;

function getTotal(one : number, two : number){
    return one + two
}
const total = getTotal(1,2)

const XioaJieJie = {
    name:'刘颖',
    age:18
}

// 总结
// 如果 ts 能够自动分析变量类型，我们就什么也不需要做
// 如果 ts 无法分析变量类型的话，我们就需要使用类型注解

export {}