import React, { useState , useEffect, } from 'react'; // react 16.8.0以上才能使用react-hooks
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
function Index(){
    useEffect(()=>{
        console.log('useEffect=>Index页面')
        return ()=>{
            console.log('老弟，你走了！Index')
        }
    },[]) 
    // useEffect第二个参数为空数组时，当页面销毁时，才执行上面的return后的函数进行解绑
    // 相当于componentWillUnmount
    return <h2>ibarrel</h2>
}

function List() {
    useEffect(()=>{
        console.log('useEffect=>List页面')
    })
    return <h2>List page</h2>
}

function Example() {
    const [count, setCount] = useState(0) // 数组解构
    useEffect(()=>{
        console.log(`useEffect=>You clicked ${count}`)
        return ()=>{
            console.log('===============')
        }
    },[count])// useEffect第二个参数为状态值时，当状态值发生变化时，才执行上面的return后的函数
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>Click me</button>
            <Router>
                <ul>
                    <li><Link to='/'>首页</Link></li>
                    <li><Link to='/list/'>列表</Link></li>
                </ul>
                <Route path='/' exact component={Index}/>
                <Route path='/list/' component={List}/>
            </Router>
        </div>
    )
}

export default Example;

// useEffect 相当于componentDidMount和componentDidUpdate