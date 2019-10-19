<template>
  <div id="app">
    <a-layout id="components-layout-top" class="layout">
      <a-layout-header>
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="horizontal"
          :defaultSelectedKeys="['2']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            <router-link to="/">Home</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/about">Cart</router-link>
          </a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
          <a-menu-item class="right-menu" key="4">Sign up</a-menu-item>
          <a-menu-item @click="showDrawer" class="right-menu" key="5">Login</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 0 50px">
        <Breadcrumb />
        <!-- <a-breadcrumb style="margin: 16px 0"> -->
        <!--   <a-breadcrumb-item>Home</a-breadcrumb-item> -->
        <!--   <a-breadcrumb-item>List</a-breadcrumb-item> -->
        <!--   <a-breadcrumb-item>App</a-breadcrumb-item> -->
        <!-- </a-breadcrumb> -->
        <router-view />
      </a-layout-content>
      <LoginForm :visible="visible" :onClose="onClose" />
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import LoginForm from '@/components/LoginForm'

export default {
  name: 'App',
  components: {
    Breadcrumb,
    LoginForm
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    login() {
      console.log('asdf')
    },
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
}

#components-layout-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

#components-layout-top .right-menu {
  float: right;
}
</style>
