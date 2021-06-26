<template>
<!-- @save-product 相当于v-on:save-product  事件绑定 -->
<!-- :model 相当于v-bind:model  属性绑定  动态的属性绑定,model数据变更时，props获取到的model也会变化-->
  <product-form
    @save-product="addProduct"
    :model="model"
    :manufacturers="manufacturers"
  >
  </product-form>
</template>

<script>
import ProductForm from '@/components/products/ProductForm.vue';
export default {
  data() {
    return {
      model: {},
      manufacturers: [
        {
          _id: 'sam',
          name: 'Samsung',
        },
        {
          _id: 'apple',
          name: 'Apple',
        },
      ],
    };
  },
  methods: {
    addProduct(model) {
      console.log('model', model);
    },
  },
  components: {
    'product-form': ProductForm // 申明组件 
  }
}
</script>
