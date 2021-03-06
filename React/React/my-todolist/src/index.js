import React from 'react';
import ReactDOM from 'react-dom';

const todoList = ["图雀", "图雀写作工具", "图雀社区", "图雀文档"]

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


class App extends React.Component {

    constructor(props) {
        super(props) // 每个继承自React.Component的组件在定义constructor方法时，需要在首行加入super(props)
        this.state = {
            todoList: [],
            nowTodo: '',
        }
    }

    componentDidMount() {
        // 当组件挂在到DOM节点之后，设置3S的定时器，3S后更新组件的state值
        this.timer = setTimeout(() => {
            this.setState({
                todoList: todoList
            })
        }, 2000)
    }

    componentWillUnmount() {
        // 当组件卸载时，清除之前设置的定时器，防止出现内存泄露
        clearInterval(this.timer)
    }

    handleChange(e) {
        this.setState({
            nowTodo: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault(e)
        const newTodoList = this.state.todoList.concat(this.state.nowTodo)

        this.setState({
            todoList: newTodoList,
            nowTodo: '',
        })
    }


    render() {
        const { todoList, nowTodo } = this.state

        const renderTodoList = todoList.map((item, idx) => {
            return (
                <Todo content={item} key={idx} index={idx}/>
            )
        })

        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type='text' value={nowTodo} onChange={e => this.handleChange(e)}></input>
                    <button type="submit">提交</button>
                </form>
                <ul>
                    {renderTodoList}
                </ul>
            </div>

        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
// 使用ReactDOM的render方法渲染定义的APP组件
// 参数1：React根级组件
// 参数2：一个DOM节点


