import React, { useContext } from 'react';
import { CountContext } from './example4'

function Example5() {
    let count = useContext(CountContext) // 另一个文件如何获得CountContext？
    return (<h2>{count}</h2>)
}

export default Example5;