<template>
  <div>
    <a-card :title="cart.productId.name">
      <a href="#" slot="extra">{{ cart.productId.price | totalPriceCurrency }}</a>
      <div style="display: flex">
        <img :src="cart.productId.image" height="100px" alt="cart.productId.name" />
        <a-form :form="form" @submit="handleSubmit" style="margin-left: 2rem">
          {{ cart.quantity }}
          <a-form-item label="Quantity">
            <!-- <a-input-number v-decorator="['cart.quantity']" /> -->
            <a-input-number :value="cart.quantity" @change="update" />
          </a-form-item>
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form>
      </div>
    </a-card>
    {{ cart }}
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
  watch: {
    quantity(val) {
      console.log('this.$store.state.quantity: ', val)
      this.form.setFieldsValue({ quantity: val })
    }
  },
  created() {
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields) => {
        this.$emit('change', changedFields)
      },
      mapPropsToFields: () => {
        return {
          quantity: this.$form.createFormField({
            value: this.quantity
          })
        }
      },
      onValuesChange: (_, values) => {
        console.log(values)
        // Synchronize to vuex store in real time
        // this.$store.commit('update', values)
      }
    })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$store.commit('update', values)
        }
      })
    },
    update(v) {
      this.$store.commit('cart/updateQty', { id: this.cart._id, qty: v })
      this.$store
        .dispatch('cart/updateQty', { id: this.cart._id, qty: v })
        .then(_ => {
          console.log('updated qty')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>
