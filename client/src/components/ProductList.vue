<template>
  <div>
    <div v-if="products.isLoading">loading...</div>
    <div>{{ products }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductList',
  methods: {
    ...mapActions('products', { findAllProducts: 'findAll' })
  },
  computed: {
    ...mapState({
      products: ['products']
    })
  },
  mounted() {
    this.findAllProducts()
  }
}
</script>
