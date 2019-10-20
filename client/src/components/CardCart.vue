<template>
  <div>
    <a-card style="margin-bottom: 2rem" :title="cart.productId.name">
      <div slot="extra">{{ cart.productId.price | totalPriceCurrency }}</div>
      <div style="display: flex">
        <img :src="cart.productId.image" height="100px" alt="cart.productId.name" />
        <a-form style="margin-left: 2rem">
          <a-form-item label="Quantity">
            <a-input-number
              :min="0"
              :max="cart.productId.stock"
              :value="cart.quantity"
              @change="update"
            />
          </a-form-item>
          <a-button type="primary" html-type="submit">
            Checkout
          </a-button>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'CardCart',
  props: ['cart'],
  data() {
    return {}
  },
  filters: {
    totalPriceCurrency(value) {
      return new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR' }).format(value)
    }
  },
  methods: {
    update(v) {
      this.$store.commit('cart/updateQty', { id: this.cart._id, qty: v })
      this.$store.dispatch('cart/updateQty', { id: this.cart._id, qty: v }).catch(err => {
        this.$message.error(err.response.data)
      })
    }
  }
}
</script>
