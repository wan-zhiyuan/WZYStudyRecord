import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
import Params from '@/components/Params'
import Error from '@/components/Error'

Vue.use(Router)

export default new Router({
  mode: 'history', // 默认为hash模式，url会携带/#/
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      alias: '/home'
    },
    {
      // 给newsId增加正则，只允许传递数字
      path: '/params/:newsId(\\d+)/:newsTitle',
      component: Params,
      // 钩子函数：写在路由文件中。路由文件只有beforeEnter进入函数
      beforeEnter:(to,from,next)=>{
        console.log(to)
        console.log(from)
        console.log(next)
        next() // 默认参数为true，如果设置(false)将不跳转，如果设置({path:'/'})将跳转HelloWorld页面
      }
    },
    {
      path: '/goHome',
      redirect: '/'
    },
    {
      path: '/goParams/:newsId(\\d+)/:newsTitle',
      redirect: '/params/:newsId(\\d+)/:newsTitle' // 重定向
    },
    {
      path: '/hi1',
      component: Hi1,
      alias: '/wanzy'  // 别名
    },
    {
      path: '*',
      component: Error
    }
  ]
})
