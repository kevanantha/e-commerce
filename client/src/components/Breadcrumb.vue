<template>
  <div>
    <a-breadcrumb :routes="routes">
      <template slot="itemRender" slot-scope="{ route, params, routes, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="`${base}/${paths.join('/')}`">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
    <br />
    {{ $route.path }}
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
  data() {
    const { lang } = this.$route.params
    return {
      base: `/${lang}/components/breadcrumb`,
      routes: [
        {
          path: 'index',
          breadcrumbName: 'index'
        },
        {
          path: 'admin',
          breadcrumbName: 'admin'
        },
        {
          path: 'second',
          breadcrumbName: '当前页面'
        }
      ]
    }
  }
}
</script>
