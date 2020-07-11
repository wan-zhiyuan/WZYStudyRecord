import React from 'react'
import { Route, Link, } from 'react-router-dom'
import ReactPage from './video/ReactPage'
import Flutter from './video/Flutter'
import Vue from './video/Vue'

function Video() {
    return (
        <div>
            {/* 顶部导航 */}
            <div className="topNav">
                <ul>
                    <li><Link to="/video/reactpage">React教程</Link></li>
                    <li><Link to="/video/flutter">Flutter教程</Link></li>
                    <li><Link to="/video/vue">Vue教程</Link></li>
                </ul>
            </div>
            {/* 下方显示内容 点击顶部导航栏切换内容 */}
            <div className="videoContent">
                <div><h3>视频教程</h3></div>
                <Route path="/video/reactpage/" component={ReactPage} />
                <Route path="/video/flutter/" component={Flutter} />
                <Route path="/video/vue/" component={Vue} />
            </div>
        </div>
    )
}
export default Video;