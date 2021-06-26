<template>
  <div>
      <div class="title">
          <h1>{{msg}}</h1>
      </div>
      <product-list></product-list>
  </div>
</template>

<script>
import ProductList from '../components/products/ProductList.vue'
export default {
    name: 'home',
    // 组件初始化数据
    data(){
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    components: {
        'product-list': ProductList
    }
}
</script>

<style>

</style>