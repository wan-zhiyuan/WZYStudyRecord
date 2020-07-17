import React, { useState, useEffect, useCallback, } from 'react';

function useWinSize() {
    // 定义屏幕尺寸size
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth, // 默认值
        height: document.documentElement.clientHeight,
    })

    // 修改size的方法 
    // 自定义hooks的函数一般我们都使用useCallback缓存
    // 好处1:不用每次重新声明新的函数，避免释放内存、分配内存的计算资源浪费
    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }, [])

    // function onResize() {
    //     setSize({
    //         width: document.documentElement.clientWidth,
    //         height: document.documentElement.clientHeight,
    //     })
    //     console.log('onResize')
    // }

    // 在模拟的生命周期里 第二个参数空数组，return后面的函数只执行一次，组件销毁时触发
    useEffect(()=>{
        window.addEventListener('resize',onResize)
        return ()=>{
            window.removeEventListener('resize',onResize)
        }
    },[])

    return size
}

function Example9() {
    const size = useWinSize()
    return (
    <div>页面Size:{size.width}✖️{size.height}</div>
    )
}

export default Example9;