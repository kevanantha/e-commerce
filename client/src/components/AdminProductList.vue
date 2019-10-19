<template>
  <a-list
    :grid="{ gutter: 12, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }"
    :dataSource="products.products"
  >
    <a-list-item slot="renderItem" slot-scope="product, index">
      <a-card hoverable style="width: 300px">
        <img :alt="product.name" :src="product.image" slot="cover" />
        <template class="ant-card-actions" slot="actions">
          <a-icon type="setting" />
          <a-icon type="edit" />
          <a-icon type="ellipsis" />
        </template>
        <a-card-meta :title="product.name" :description="product.description"> </a-card-meta>
      </a-card>
    </a-list-item>
  </a-list>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AddProductList',
  props: ['products'],
  data() {
    return {}
  }
}
</script>
<style></style>
