import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Jspang from '../components/jspang'
import Link from 'next/link'
import Router from 'next/router'

export default function Home() {
  // console.log(window.location.hostname)
  // console.log(window.location.pathname)
  // console.log(window.location.port)
  // console.log(window.location.href)
  function gotoA() {
    Router.push('/jspangA')
  }
  function gotoXiaojiejie() {
    //写法1
    // Router.push('/xiaojiejie?name=井空')
    //写法2
    Router.push({
      pathname: '/xiaojiejie',
      query: {
        name: '井空'
      }
    })
  }

  // // 钩子：路由发生变化时
  // Router.events.on('routeChangeStart', (...args) => {
  //   console.log('1.routeChangeStart->路由开始变化,参数为:', ...args)
  // })
  // // 钩子：路由结束变化时
  // Router.events.on('routeChangeComplete',(...args)=>{
  //   console.log('2.routeChangeComplete->路由结束变化,参数为:',...args)
  // })
  // // 钩子：浏览器history触发前
  // Router.events.on('beforeHistoryChange',(...args)=>{
  //   console.log('3,beforeHistoryChange->在改变浏览器 history之前触发,参数为:',...args)
  // })
  // // 钩子：路由跳转发生错误时
  // Router.events.on('routeChangeError',(...args)=>{
  //   console.log('4,routeChangeError->跳转发生错误,参数为:',...args)
  // })

  // // 针对hash路由模式的钩子
  // Router.events.on('hashChangeStart',(...args)=>{
  //   console.log('5,hashChangeStart->hash跳转开始时执行,参数为:',...args)
  // })
  // Router.events.on('hashChangeComplete',(...args)=>{
  //   console.log('6,hashChangeComplete->hash跳转完成时,参数为:',...args)
  // })
  
  return (
    <div>
      <div>我是首页</div>
      <div>
        <Link href="/jspangA">
          <a>
            <span>前往JspangA页面</span>
            <span>前端博客</span>
          </a>
        </Link>
      </div>
      <div><Link href="/jspangB"><a>前往JspangB页面</a></Link></div>
      <div>
        <button onClick={gotoA}>去JspangA页面</button>
      </div>

      <div style={{ marginTop: '50px' }}>
        <Link href="/xiaojiejie?name=波多野结衣"><span>选波多野结衣</span></Link>
        <Link href="/xiaojiejie?name=苍井空"><span>选苍井空</span></Link>
        <button onClick={gotoXiaojiejie}>选井空</button>
        <p>hash路由模式跳转</p>
        <div>
          <Link href="#jspang"><a>选技术胖</a></Link>
        </div>
      </div>
    </div>
  )
}
