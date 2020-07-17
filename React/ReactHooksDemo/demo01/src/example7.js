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
    // 参数一：一个函数用于处理逻辑
    // 参数二：控制useMemo重新执⾏行的数组，array改变时才会 重新执行useMemo
    // 相当于使用useMemo缓存了变量name,当name值没有变化时，直接使用缓存中的值，不执行参数一的函数
    const actionXiaohong =  useMemo(()=>changeXiaohong(name),[name]) 

    return (
        <>
            <div>{actionXiaohong}</div>
            <div>{children}</div>
        </>
    )
}

export default Example7;