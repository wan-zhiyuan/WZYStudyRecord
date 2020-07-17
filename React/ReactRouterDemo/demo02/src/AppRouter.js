import React from "react"
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom'
import Index from './Pages/Index'
import Video from './Pages/Video'
import Workplace from './Pages/Workplace'
import './index.css'

function AppRouter() {
    let routeConfig =[
        {path:'/',title:'博客首页',exact:true,component:Index},
        {path:'/video/',title:'视频教程',exact:false,component:Video},
        {path:'/workplace/',title:'职场技能',exact:false,component:Workplace},
    ]
    return (
        <Router>
            <div className="mainDiv">
                {/* 左侧一级导航 */}
                <div className="leftNav">
                    <h3>一级导航</h3>
                    <ul>
                        {
                            routeConfig.map((item,index)=>{
                            return (<li key={index}><Link to={item.path}>{item.title}</Link></li>)
                            })
                        }
                        {/* <li><Link to="/">博客首页</Link></li>
                        <li><Link to="/video">视频教程</Link></li>
                        <li><Link to="/workplace">职场技能</Link></li> */}
                    </ul>
                </div>
                {/* 右侧显示的内容，通过一级导航点击后替换 */}
                <div className="rightMain">
                    {
                        routeConfig.map((item,index)=>{
                            return (<Route key={index} path={item.path} exact={item.exact} component={item.component} />)
                            })
                    }
                    {/*  />
                    <Route path="/video" component={Video} />
                    <Route path="/workplace" component={Workplace} /> */}
                </div>
            </div>
        </Router>
    )
}

export default AppRouter;