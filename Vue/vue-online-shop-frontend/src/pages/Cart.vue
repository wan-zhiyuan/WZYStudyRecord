<template>
  <div>
    <div class="title">
      <h1>{{ msg }}</h1>
    </div>
    <template v-for="(product, index) in cart">
      <!-- 如果key设置为prodyct._id 当加入相同商品时 key会重复 -->
      <product-item :product='product' :key='product._id'></product-item>
    </template>
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
import ProductItem from "../components/products/ProductItem.vue";
export default {
  name: "home",
  data() {
    return {
      msg: "Welcome to the Cart Page",
    };
  },
  components: {
    // 注册组件
    'product-item': ProductItem
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  methods: {
    removeFromCart(productId) {
      this.$store.commit("REMOVE_FROM_CART", {
        productId,
      });
    },
  },
};
</script>
