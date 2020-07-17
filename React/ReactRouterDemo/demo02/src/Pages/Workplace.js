import React from 'react'
import { Route, Link, } from 'react-router-dom'
import Money from './workplace/Money'
import Getup from './workplace/Getup'

function Workplace() {
    return (
        <div>
            {/* 顶部导航 */}
            <div className="topNav">
                <ul>
                    <li><Link to="/workplace/money/">加薪秘籍</Link></li>
                    <li><Link to="/workplace/getup/">早起秘籍</Link></li>
                </ul>
            </div>
            {/* 下方显示内容 点击顶部导航栏切换内容 */}
            <div className="videoContent">
                <div><h3>视频教程</h3></div>
                <Route path="/workplace/money/" component={Money} />
                <Route path="/workplace/getup/" component={Getup} />
            </div>
        </div>
    )
}
export default Workplace;