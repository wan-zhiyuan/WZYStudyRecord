import React, { useState, useMemo } from 'react';

function Example7() {
    const [xiaohong, setXiaohong] = useState('小红在待客状态')
    const [zhiling, setZhiling] = useState('志林在待客状态')
    return (
        <>
            <button onClick={() => { setXiaohong(new Date().getTime()) }}>小红</button>
            <button onClick={() => { setZhiling(new Date().getTime()+',志林向我们走来了') }}>志林</button>
            <ChildComponent name={xiaohong}>{zhiling}</ChildComponent>
        </>
    )
}

function ChildComponent({name,children}){

    function changeXiaohong(){
        console.log('他来了，他来了。小红向我们走来了')
        return name+',小红向我们走来了'
    }
    // 第二个参数（数组），只有当name这个参数发升变化时，才执行第一个参数的函数
    const actionXiaohong =  useMemo(()=>changeXiaohong(name),[name]) 

    return (
        <>
            <div>{actionXiaohong}</div>
            <div>{children}</div>
        </>
    )
}

export default Example7;