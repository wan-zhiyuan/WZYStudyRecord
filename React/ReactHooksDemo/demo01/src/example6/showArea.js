import React, { useContext } from 'react';
import { ColorContext, Color } from './color'

function ShowArea() {
    const { color } = useContext(ColorContext) // 获取父组件的传值 color
    return (<div style={{ color: color }}>字体颜色为{color}</div>)
}

export default ShowArea;