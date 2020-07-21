<template>
  <header>
    <img class="logo" src="../assets/logo.svg" />
    <span class="login-btn" @click="loginClicked = true">Login</span>
    <LoginCard v-if="loginClicked" @closeModal="closeModal" />
  </header>
</template>
<script>
import LoginCard from './LoginCard'

export default {
  components: {
    LoginCard
  },
  data() {
    return {
      loginClicked: false
    }
  },
  methods: {
    closeModal() {
      this.loginClicked = false
    }
  }
}
</script>
<style scoped>
header {
  padding: 2rem 0px;
  width: 100%;
  min-height: 60px;
  display: flex;
}
header img.logo {
  display: block;
  margin: auto;
  width: auto;
  height: 150px;
}
header .login-btn {
  float: right;
  line-height: 35px;
  vertical-align: bottom;
  align-self: flex-end;
  padding: 0px 15px;
  border: 1px solid #333333;
  border-radius: 5px;
  cursor: pointer;
}
</style>
