import React, { useState, createContext, useContext } from 'react'; // react 16.8.0以上才能使用react-hooks
import Example5 from './example5'

export const CountContext = createContext(); // 创建父组件的上下文

function Counter() {
    let count = useContext(CountContext)
    return (<h2>{count}</h2>)
}

function Example4() {
    const [count, setCount] = useState(0) // 数组解构
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>Click me</button>
            {/* 将需要接收参数的子组件放入Context.Provider */}
            <CountContext.Provider value={count}>
                <Example5 />
            </CountContext.Provider>
        </div>
    )
}

export default Example4;

// useEffect 相当于componentDidMount和componentDidUpdate