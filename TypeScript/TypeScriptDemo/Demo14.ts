class Person {
    constructor(public name:string){}
}

const person = new Person('wanzhiyuan')
console.log(person.name)

class Person1 {
    // public readonly _name :string // 设置只读属性 赋值会报错
    public _name :string
    constructor(name:string){
        this._name = name
    }
}

const person1 = new Person1('wangzhiyuan1')
person1._name = '谢谢'
console.log(person1._name)