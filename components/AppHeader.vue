<template>
  <header>
    <img class="logo" src="../assets/logo.jpg" />
    <span class="login-btn">Login</span>
  </header>
</template>
<script>
export default {}
</script>
<style scoped>
header {
  margin-bottom: 2rem;
  padding: 2rem 0px;
  border-bottom: 1px solid #cccccc;
  width: 100%;
  min-height: 60px;
}
header img.logo {
  width: auto;
  height: 45px;
}
header .login-btn {
  float: right;
  line-height: 45px;
  vertical-align: bottom;
}
</style>
