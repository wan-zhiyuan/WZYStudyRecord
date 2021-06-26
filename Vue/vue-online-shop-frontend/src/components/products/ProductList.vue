<template>
<!-- 产品列表组件 -->
  <div>
    <div class="products">
      <div class="container">This is ProductList</div>
      <template v-for="product in products">
        <!-- <div :key="product._id" class="product">
          <p class="product__name">产品名称：{{ product.name }}</p>
          <p class="product__description">介绍：{{ product.description }}</p>
          <p class="product__price">价格：{{ product.price }}</p>
          <p class="product.manufacturer">生产厂商：{{ product.manufacturer.name }}</p>
          <img :src="product.image" alt="" class="product__image" />
          <button @click="addToCart(product)">加入购物车</button>
        </div> -->
        <product-item :product='product' :key="product._id"></product-item>
      </template>
    </div>
  </div>
</template>

<style>
.product {
  border-bottom: 1px solid black;
}

.product__image {
  width: 100px;
  height: 100px;
}
</style>

<script>
import ProductItem from './ProductItem.vue'
export default {
  name: "product-list",
  created() {
    if (this.products.length === 0) { // this.produces获取的是computed中的products()函数
      this.$store.dispatch('allProducts')
    }
  },
  components: {
    'product-item': ProductItem
  },
  computed: {
    // a computed getter
    products() {
      return this.$store.state.products; // 从store中获取products的属性值
    },
  },
  methods: {
    addToCart(product) {
        // 修改store中的数据 mutation:ADD_TO_CART  传递的载荷：product
      this.$store.commit("ADD_TO_CART", {
        product,
      });
    },
  },
};
</script>
