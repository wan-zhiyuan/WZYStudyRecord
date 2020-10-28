// 标题：初识interface
interface Girl {
    name: string;
    age: number;
    bust: number;
    waistline?: number; // ?:表示可选值
    [propname:string]: any; // 属性名是字符串类型，属性值可以是任意类型
    say(): string; // 必须有一个say方法，返回值必须是string类型
}

class XiaoJieJie implements Girl { // 类继承Girl接口，类当中必须实现接口中的属性和方法
    name='刘英'
    age=18
    bust=90
    say(){
        return ''
    }
}

// 对象
const girl = {
    name: '大脚',
    age: 18,
    bust: 94,
    waistline: 80,
    sex: '女',
    say(){
        return '欢迎光临'
    }
}

// const screenResume = (name: string, age: number, bust: number) => {
//     age < 24 && bust >= 90 && console.log(name + '进入面试')
//     age >= 24 || bust < 90 && console.log(name + '你被淘汰了')
// }
const screenResume = (girl: Girl) => {
    girl.age < 24 && girl.bust >= 90 && console.log(girl.name + '进入面试')
    girl.age >= 24 || girl.bust < 90 && console.log(girl.name + '你被淘汰了')
}
// const getRsume = (name: string, age: number, bust: number) => {
//     console.log(name + '年龄是' + age)
//     console.log(name + '胸围是' + bust)
// }
const getRsume = (girl: Girl) => {
    console.log(girl.name + '年龄是' + girl.age)
    console.log(girl.name + '胸围是' + girl.bust)
    girl.waistline && console.log(girl.name + '腰围是' + girl.waistline)
    girl.sex && console.log(girl.name + '性别是：' + girl.sex)
}

screenResume(girl)
getRsume(girl)

export {}