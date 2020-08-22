<template>
  <header>
    <nuxt-link to="/"><img class="logo" src="../assets/logo.svg"/></nuxt-link>
    <span
      v-if="!$store.state.loggedIn.flag"
      class="login-btn"
      @click="loginClicked = true"
      >Login</span
    >
    <div v-if="$store.state.loggedIn.flag" class="user-loggedin">
      <b-dropdown
        id="dropdown-right"
        text="Dropdown Button"
        class="m-md-2"
        toggle-class="border-bottom-0"
        no-caret
      >
        <template v-slot:button-content>
          <span v-if="$store.state.loggedIn.flag" class="user-loggedin"
            >Welcome, <strong>{{ name }}</strong>
            <img src="../assets/down.svg" />
          </span>
        </template>
        <b-dropdown-item
          ><nuxt-link to="/likedJokes">Liked Jokes</nuxt-link></b-dropdown-item
        >
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- <span v-if="$store.state.loggedIn.flag" class="user-loggedin"
      >Welcome, <strong>{{ name }}</strong> <img src="../assets/down.svg" />
    </span>
    <div class="user-dropdown">
      <ul>
        <li>Liked Jokes</li>
        <li>Logout</li>
      </ul>
    </div> -->
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
      loginClicked: false,
      name: ''
    }
  },
  beforeUpdate() {
    if (this.$store.state.user !== null && this.$store.state.loggedIn.flag) {
      this.name = this.$store.state.user.username
    }
  },
  methods: {
    closeModal() {
      this.loginClicked = false
    },
    logout() {
      this.$store.commit('logout')
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
  position: relative;
}
header img.logo {
  width: auto;
  height: 150px;
}
header .login-btn {
  margin-left: auto;
  order: 2;
  line-height: 35px;
  vertical-align: bottom;
  align-self: flex-end;
  padding: 0px 15px;
  border: 1px solid #333333;
  border-radius: 5px;
  cursor: pointer;
}

header .user-loggedin {
  margin-left: auto;
  order: 2;
  vertical-align: bottom;
  align-self: flex-end;
  margin-bottom: 0px;
}
.dropdown-btn {
  margin-bottom: 0px;
  background: none;
  border: none;
  outline: none;
}
header .user-loggedin strong {
  font-size: 1.1em;
  text-decoration: underline;
  padding-left: 10px;
  cursor: pointer;
}
header .user-loggedin img {
  width: auto;
  height: 12px;
  padding-left: 5px;
  cursor: pointer;
}
header .user-dropdown {
  position: absolute;
  right: 0;
  bottom: 0px;
  padding: 20px;
  border: 1px solid #333333;
  background: white;
  z-index: -1;
}
</style>
