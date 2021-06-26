<template>
    <div>
        <button v-if="isAdding" class="button" @click="addToCart">加入购物车</button>
        <button v-else class="button" @click="removeFromCart(product._id)">从购物车移除</button>
    </div>
</template>

<script>
export default {
    props: ['product'],
    computed: {
        // 计算属性 判断当前商品是否在购物车当中
        isAdding() {
            let isAdding = true;
            this.cart.map(product => {
                if (product._id === this.product._id) {
                    isAdding = false;
                }
            });
            return isAdding;
        },
        // 计算属性 从本地store中获取所有购物车数据
        cart() {
            return this.$store.state.cart;
        }
    },
    methods: {
        // 添加到购物车（操作store中的数据）
        addToCart() {
            this.$store.commit('ADD_TO_CART', {
                product: this.product,
            })
        },
        // 从购物中移除（操作store 中的数据）
        removeFromCart(productId) {
            this.$store.commit('REMOVE_FROM_CART', {
                productId,
            })
        }
    },

}
</script>

<style>

</style>