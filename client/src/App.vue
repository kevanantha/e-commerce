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
          <a-menu-item v-if="isLogin" @click="logout" class="right-menu" key="6">
            Logout
          </a-menu-item>
          <a-menu-item v-if="isLogin" class="right-menu" key="7">
            <router-link to="/cart">
              <a-badge :count="totalCarts" :overflowCount="10">
                <a-icon type="shopping-cart" />
              </a-badge>
            </router-link>
          </a-menu-item>
          <a-menu-item v-if="!isLogin" @click="showDrawerSignup" class="right-menu" key="4"
            >Sign up</a-menu-item
          >
          <a-menu-item v-if="!isLogin" @click="showDrawer" class="right-menu" key="5">
            Login
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 0 50px; margin: 3rem 0">
        <router-view />
      </a-layout-content>
      <LoginForm :visible="visible" :onClose="onClose" />
      <SignupForm :visible="visibleSignup" :onClose="onClose" />
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignupForm'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    LoginForm,
    SignupForm
  },
  data () {
    return {
      visible: false,
      visibleSignup: false
    }
  },
  computed: {
    ...mapState('users', ['isLogin']),
    ...mapGetters('cart', ['totalCarts'])
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    showDrawerSignup () {
      this.visibleSignup = true
    },
    onClose () {
      this.visible = false
      this.visibleSignup = false
    },
    logout () {
      this.$store.dispatch('users/logout')
      this.$store.commit('users/isLogin')
      this.$message.success('Logged out successfully', 3)
      this.$router.push('/').catch(err => {})
    }
  },
  mounted () {
    this.$store.commit('users/isLogin')
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
