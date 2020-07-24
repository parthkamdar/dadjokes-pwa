<template>
  <div class="login-card-outer">
    <div class="login-card">
      <div class="login-card-header">
        <h4>{{ title }}</h4>
        <span class="closeBtn" @click="closeModal"> X </span>
      </div>
      <div v-if="errorFlag" class="alert alert-danger">{{ errorMsg }}</div>
      <input
        v-if="!regsiterFlag"
        v-model="username"
        type="text"
        placeholder="Username or Email"
      />
      <input
        v-if="regsiterFlag"
        v-model="registerUsername"
        type="text"
        placeholder="Username"
      />
      <input
        v-if="regsiterFlag"
        v-model="registerEmail"
        type="email"
        placeholder="Email Address"
      />
      <input v-model="password" type="password" placeholder="Password" />
      <button v-if="!regsiterFlag" type="button" @click="loginUser">
        Login
      </button>
      <button v-if="regsiterFlag" type="button" @click="registerUser">
        Register
      </button>
      <hr />
      <p v-if="!regsiterFlag">
        Dont have an account, <span @click="registerNow">Register Now!</span>
      </p>
      <p v-if="regsiterFlag">
        Already have an account, <span @click="loginNow">Login Now!</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const md5 = require('md5')
export default {
  data() {
    return {
      title: 'Login',
      regsiterFlag: false,
      username: '',
      password: '',
      registerUsername: '',
      registerEmail: '',
      errorFlag: false,
      errorMsg: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', true)
    },
    registerNow() {
      this.title = 'Register'
      this.regsiterFlag = true
      this.password = ''
    },
    loginNow() {
      this.title = 'Login'
      this.regsiterFlag = false
      this.password = ''
    },
    async loginUser() {
      this.errorFlag = false
      this.errorMsg = ''
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }
      if (this.username !== '') {
        if (this.password !== '') {
          const passwordEnc = md5(this.password)
          const res = await axios.post(
            `${this.$store.state.url}/users/login`,
            {
              username: this.username,
              password: passwordEnc
            },
            config
          )
          if (!res.data.error) {
            const response = res.data.data
            if (response.success) {
              this.$store.commit('setLoggedIn', response)
              this.closeModal()
            } else {
              this.errorFlag = true
              this.errorMsg = response.msg
            }
          } else {
            this.errorFlag = true
            this.errorMsg = res.data.data.msg
          }
        } else {
          // Password cannot be empty
          this.errorFlag = true
          this.errorMsg = 'Password cannot be empty!'
          console.log('password is empty')
        }
      } else {
        // Username cannot be empty
        this.errorFlag = true
        this.errorMsg = 'Username or Email cannot be empty!'
        console.log('username is empty')
      }
    },
    async registerUser() {
      this.errorFlag = false
      this.errorMsg = ''
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }
      if (this.registerUsername !== '') {
        if (this.registerEmail !== '') {
          if (this.password !== '') {
            const passwordEnc = md5(this.password)
            const res = await axios.post(
              `${this.$store.state.url}/users/register`,
              {
                username: this.registerUsername,
                email: this.registerEmail,
                password: passwordEnc
              },
              config
            )
            if (!res.data.error) {
              const response = res.data.data
              if (response.success) {
                this.$store.commit('setLoggedIn', response)
                this.closeModal()
              } else {
                this.errorFlag = true
                this.errorMsg = response.msg
              }
            } else {
              this.errorFlag = true
              this.errorMsg = res.data.data.msg
            }
          } else {
            // Password cannot be empty
            this.errorFlag = true
            this.errorMsg = 'Password cannot be empty!'
            console.log('password is empty')
          }
        } else {
          // Email cannot be empty
          this.errorFlag = true
          this.errorMsg = 'Email cannot be empty!'
          console.log('email is empty')
        }
      } else {
        // Username cannot be empty
        this.errorFlag = true
        this.errorMsg = 'Username cannot be empty!'
        console.log('username is empty')
      }
    }
  }
}
</script>

<style>
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
  border: 1px solid #000000;
  color: #000000;
  padding: 7px 20px;
  margin-bottom: 30px;
  width: 100%;
  border-radius: 5px;
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
.closeBtn {
  cursor: pointer;
}
</style>
