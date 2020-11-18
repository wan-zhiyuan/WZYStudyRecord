import React from 'react';
import ReactDOM from 'react-dom';

const todoList = ["图雀", "图雀写作工具", "图雀社区", "图雀文档"]

// React核心特点之一：组件化
// 写法：1）函数式组件 2）类组件

// <类组件>
class Todo extends React.Component {

    render() {
        if (this.props.index % 2 === 0) {
            return <li style={{color: '#ff0044'}}>Hello, {this.props.content}</li>
        }
        return <li>Hello, {this.props.content}</li>


        // if-else 条件渲染
        // if (this.props.content === '图雀') {
        //     return <li>你好, {this.props.content}</li>
        // } else {
        //     return <li>Hello, {this.props.content}</li> // 使用{}在JSX中动态的插入变量值
        // }
        // 三元表达式条件渲染
        // return <li className={this.props.isClisked ? 'clicked' : 'notclicked'}>Hello, {this.props.content}</li>
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

    componentDidMount() {
        // 当组件挂在到DOM节点之后，设置3S的定时器，3S后更新组件的state值
        this.timer = setTimeout(() => {
            this.setState({
                todoList: todoList
            })
        }, 3000)
    }

    componentWillUnmount() {
        // 当组件卸载时，清除之前设置的定时器，防止出现内存泄露
        clearInterval(this.timer)
    }

    handleUpdate() {
        console.log('更新')
        this.setState({ todoList: ["图雀", "图雀写作工具", "图雀社区", "图雀文档"] })
    }

    render() {
        const { todoList } = this.state

        // const todoList = ["图雀", "图雀写作工具", "图雀社区", "图雀文档"];

        const renderTodoList = todoList.map((item, idx) => {
            return (
                <Todo content={item} key={idx} index={idx}/>
            )
        })

        return (
            <div>
                <div className='app'>Hello, World</div>
                <button onClick={() => { this.handleUpdate() }}>更新</button>
                <ul>
                    {/* <Todo content={todoList[0]} from='图雀社区' />
                    <Todo content={todoList[1]} />
                    <Tudo2 content={todoList[2]} />
                    <Tudo2 content={todoList[3]} /> */}
                    {renderTodoList}
                </ul>
                <Button />
                <Link />
            </div>

        );
    }
    // JSX代码最终会被Babel转义为React.createElement代码，创建出React Element的对象
}

ReactDOM.render(<App />, document.getElementById('root'))
// 使用ReactDOM的render方法渲染定义的APP组件
// 参数1：React根级组件
// 参数2：一个DOM节点

// 事件处理
function Button() {
    
    function handleClick() {
        console.log('按钮被点击了')
    }

    return (
        <button onClick={handleClick}>点我</button>
    )
}

// 默认行禁用
function Link() {

    function handleClick(event) {
        event.preventDefault()
        console.log('链接被点击了，但是它不会跳转页面，因为默认行被禁用了')
    }

    return (
        <a onClick={handleClick} href="https://www.baidu.com">点我</a>
    )
}


