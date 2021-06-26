import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Home'
import Cart from '@/pages/Cart'

// Admin Components
import Index from '@/pages/admin/Index'
import New from '@/pages/admin/New'
import Products from '@/pages/admin/Products'
import Edit from '@/pages/admin/Edit'
import Detail from '@/pages/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/admin',
      // name: 'Admin', // 有子路由的时候，负路由不添加name属性
      component: Index,
      // 嵌套路由
      children: [
        {
          path: '',
          name: 'Products',
          component: Products,
        },
        {
          path: 'new',
          name: 'New',
          component: New,
        },
        {
          path: 'edit/:id',
          name: 'Edit',
          component: Edit,
        }
      ]
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
    }
  ]
})
