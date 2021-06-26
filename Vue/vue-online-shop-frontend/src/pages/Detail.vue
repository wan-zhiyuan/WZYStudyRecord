<template>
    <div>
        <product-detail :product='product'></product-detail>
    </div>
</template>

<script>
import ProductDetail from '../components/products/ProductDetail.vue'
export default {
    created() {
        // 跳转到详情页面 判断本地store中是否有此id的商品
        const { name } = this.product;
        console.log(this.product);
        if (!name) {
            console.log('本地状态里没有，则从后端请求获取');
            // 本地状态里没有，则从后段请求获取
            this.$store.dispatch('productById', {
                productId: this.$route.params['id']
            });
        }
    },
    computed: {
        // 获取url中的传参 id
        // 通过store中的getter 查找本地products中是否有此id的product
        product() {
            return this.$store.getters.productById(this.$route.params['id']);
        }
    },
    components: {
        'product-detail': ProductDetail
    }
}
</script>

<style>

</style>