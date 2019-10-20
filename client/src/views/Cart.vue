<template>
  <div>
    <a-card title="Cart">
      <CardCart v-for="cart in carts" :cart="cart" :key="cart._id" />
    </a-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CardCart from '@/components/CardCart'

export default {
  name: 'Cart',
  components: {
    CardCart
  },
  data() {
    return {
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 3
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' }
      ]
    }
  },
  filters: {
    totalPriceCurrency(value) {
      return new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR' }).format(value)
    }
  },
  computed: {
    ...mapState('cart', ['carts'])
  },
  methods: {
    ...mapActions('cart', { findAllCarts: 'findAll' }),
    onChange(value) {
      console.log(value)
    }
  },
  watch: {
    username(val) {
      console.log('this.$store.state.username: ', val)
      this.form.setFieldsValue({ username: val })
    }
  },
  mounted() {
    this.findAllCarts()
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields) => {
        this.$emit('change', changedFields)
      },
      mapPropsToFields: () => {
        return {
          username: this.$form.createFormField({
            value: this.username
          })
        }
      },
      onValuesChange: (_, values) => {
        console.log(values)
        // Synchronize to vuex store in real time
        // this.$store.commit('update', values)
      }
    })
  }
}
</script>
<style></style>
