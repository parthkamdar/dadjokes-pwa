<template>
  <header>
    <img class="logo" src="../assets/logo.svg" />
    <span class="login-btn">Login</span>

    <div class="login-card-outer">
      <div class="login-card">
        <div class="login-card-header">
          <h4>Login</h4>
          <span> X </span>
        </div>
        <input type="text" placeholder="Username or Email" />
        <input type="password" placeholder="Password" />
        <button type="button" class="btn btn-primary">Login</button>
        <hr />
        <p>Dont have an account, <span>Register Now!</span></p>
      </div>
    </div>
  </header>
</template>
<script>
export default {}
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
.login-card-outer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #ffffff99;
  z-index: 8;
  overflow: hidden;
}
.login-card {
  position: absolute;
  background-color: #fafafa;
  padding: 30px;
  min-width: 300px;
  width: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  border: 1px solid #dddddd;
  border-radius: 10px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}
h4 {
  font-size: 1.5em;
  padding-bottom: 1rem;
}
.login-card-header {
  position: relative;
  border-bottom: 1px solid #333333;
  margin-bottom: 30px;
}
.login-card-header span {
  position: absolute;
  top: 0px;
  right: 0px;
  font-weight: 700;
}
input {
  display: block;
  width: 100%;
  outline: none;
  background-color: #f1f1f1;
  color: #333333;
  border-radius: 8px;
  padding: 10px;
  outline: none;
  border: none;
  margin-bottom: 20px;
  font-size: 1em;
}
button {
  display: block;
  margin: auto;
  background-color: transparent;
  border: 1.5px solid #000000;
  color: #000000;
  padding: 7px 20px;
  margin-bottom: 30px;
}
.login-card p {
  margin-top: 30px;
  text-align: center;
  font-size: 0.9em;
}
.login-card p span {
  cursor: pointer;
  font-weight: 700;
  font-size: 1em;
  text-decoration: underline;
}
</style>
