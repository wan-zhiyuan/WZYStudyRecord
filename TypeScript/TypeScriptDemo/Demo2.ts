let count1 : number = 1;
// 静态类型
// 给count赋值不同类型会报错提示
// count后面加‘.’会直接提示出number类型的所有方法

// 自定义静态类型
interface XiaoJieJie {
    uname: string,
    age: number,
}

const xiaohong : XiaoJieJie = {
    uname: '小红',
    age: 18,
}
console.log(xiaohong.age)
// 总结:定义好静态类型后，意味着变量的类型是不能改变的，变量的属性和方法也跟着确定了。