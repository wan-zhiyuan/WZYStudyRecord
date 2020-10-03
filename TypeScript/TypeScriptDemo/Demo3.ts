// 基础静态类型
const count2 : number = 918;
const myName : string = 'jspang';
// null , undefinde,boolean,void,symbol

// 对象静态类型如下
// 1、普通对象类型
const xiaoJieJie:{
    name:string;
    age:number;
} = {
    name:'大脚',
    age:18
}

// 2、数组类型
const xiaoJieJies : string [] = ['谢大脚','刘颖','小红']

// 3、类类型
class Person{}
const dajiao : Person = new Person()

// 4、函数类型
const jianXiaoJieJie : ()=>string = ()=>{return '大脚'}
// 对象类型 数组类型 类类型 函数类型

export {}