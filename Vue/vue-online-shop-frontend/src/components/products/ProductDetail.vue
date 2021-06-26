<template>
    <div class="product-details">
        <!-- 图片 -->
        <div class="product-details__image">
            <img :src="product.image" alt="" class="image">
        </div>
        <!-- 文字信息 -->
        <div class="product-details__info">
            <div class="product-details__description">
                <small>{{ product.manufacturer.name }}</small>
                <h3>{{product.name}}</h3>
                <p>
                    {{product.description}}
                </p>
            </div>
            <div class="product-details__price-cart">
                <p>{{product.price}}</p>
                <product-button :product="product"></product-button>
            </div>
        </div>
    </div>
</template>

<script>
import ProductButton from './ProductButton.vue'
export default {
    props: ['product'],
    components: {
        'product-button': ProductButton
    }
}
</script>

<style>
    .product-details__image .image {
        width: 100px;
        height: 100px;
    }
</style>