// 标题：数组类型注解

// 类型推断方式
// const numberArr = [1,2,3]
// 类型注解方式
const numberArr: number[] = [1, 2, 3]
const stringArr: string[] = ['a', 'b', 'c']
const undefinedArr: undefined[] = [undefined, undefined]
const arr: (number | string)[] = [1, 'a', 2]

// type alias 类型别名

// 类型别名 (可以直接赋值对象 或者直接赋值类型，这是与interface的区别)
type Lady = {name:string,age:number}
// 类
class Madam {
    name: string;
    age: number;
}

// 类对象数组（三种方式）
const xiaoJieJies: Madam[] = [
    { name: '刘颖', age: 18 },
    { name: '谢大脚', age: 28 },
]
// const xiaoJieJies: Lady[] = [
//     { name: '刘颖', age: 18 },
//     { name: '谢大脚', age: 28 },
// ]
// const xiaoJieJies: { name: string, age: number }[] = [
//     { name: '刘颖', age: 18 },
//     { name: '谢大脚', age: 28 },
// ]

export {}