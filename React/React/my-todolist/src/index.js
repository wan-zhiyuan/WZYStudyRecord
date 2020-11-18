import React from 'react';
import ReactDOM from 'react-dom';

// React核心特点之一：组件化
// 写法：1）函数式组件 2）类组件

// <类组件>
class Todo extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return <li>Hello, {this.props.content}</li> // 使用{}在JSX中动态的插入变量值
    }
}

// <函数组件> 默认接收一个props参数，他是一个对象，用于保存父组件传递下来的内容
function Tudo2(props) {
    return <li>Hello, {props.content}</li>
}

class App extends React.Component {

    constructor(props) {
        super(props) // 每个继承自React.Component的组件在定义constructor方法时，需要在首行加入super(props)
        this.state = {
            todoList: []
        }
    }

    handleUpdate() {
        console.log('更新')
        this.setState({todoList:["图雀", "图雀写作工具", "图雀社区", "图雀文档"]})
    }

    render() {
        const { todoList } = this.state
        return (
            <div>
                <div className='app'>Hello, World</div>
                <button onClick={()=>{this.handleUpdate()}}>更新</button>
                <ul>
                    <Todo content={todoList[0]} from='图雀社区'/>
                    <Todo content={todoList[1]} />
                    <Tudo2 content={todoList[2]} />
                    <Tudo2 content={todoList[3]} />
                </ul>
            </div>

        );
    }

    // JSX代码最终会被Babel转义为React.createElement代码，创建出React Element的对象
}

ReactDOM.render(<App />, document.getElementById('root'))
// 使用ReactDOM的render方法渲染定义的APP组件
// 参数1：React根级组件
// 参数2：一个DOM节点