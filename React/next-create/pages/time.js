import React, {useState} from 'react'
// import moment from 'moment'
// import One from '../components/one'
import dynamic from 'next/dynamic' // next中的组件懒加载

const One = dynamic(import('../components/one'))

function Time() {

    const [nowTime, setTime] = useState(Date.now())

    // 懒加载引入的模块
    // 点击按钮的时候才会加载1.js 实现懒加载 避免资源浪费
    const changeTime= async ()=>{
        const moment =await import('moment') // 等待moment加载完成
        setTime(moment.default(Date.now()).format())
    }

    return (
        <>
            <div>显示时间为:{nowTime}</div>
            <One />
            <div><button onClick={changeTime}>改变时间格式</button></div>
        </>
    )
}
export default Time