import React, { useState, useRef, useEffect, } from 'react';

function Example8() {
    const inputEl = useRef(null) // 获取Dom值
    const onButtonClick = () => {
        inputEl.current.value = "Hello,ibarrel"
        console.log(inputEl)
    }
    const [text, setText] = useState('jspang')

    const textRef = useRef() // 使用userRef保存变量的值
    useEffect(() => {
        textRef.current = text
        console.log('textRef.current:',textRef.current)
    })

    return (
        <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>在input上展示文字</button>
            <br />
            <br />
            <input value={text} onChange={(e) => { setText(e.target.value) }} />
        </>
    )
}

export default Example8