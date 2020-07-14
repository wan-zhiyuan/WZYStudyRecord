import React, { useReducer, } from 'react';

function ReducerDemo() {
    // 第一个值 reducer函数
    // 第二个值 初始值，默认值
    const [count , dispatch] = useReducer((state, action) => {
        switch (action) {
            case 'add':
                return state + 1
            case 'sub':
                return state - 1
            default:
                return state
        }
    }, 0)

    return (
        <div>
            <h2>现在的分数是{count}</h2>
            <button onClick={()=>{dispatch('add')}}>Increment</button>
            <button onClick={()=>{dispatch('sub')}}>Decrement</button>
        </div>
    )
}

export default ReducerDemo;

// hooks中的Reducer
// function countReducer(state, action) {
//     switch (action.type) {
//         case 'add':
//             return state + 1
//         case 'sub':
//             return state - 1
//         default:
//             return state
//     }
// }