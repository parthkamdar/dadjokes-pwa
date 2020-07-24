<template>
  <div>
    <div class="container">
      <AppHeader></AppHeader>
      <nuxt />
    </div>
    <AppFooter />
  </div>
</template>
<script>
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
export default {
  components: {
    AppHeader,
    AppFooter
  },
  head() {
    return {
      title: 'Not So Funny',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Lato', sans-serif;
}
/* body {
  background: url('../assets/background.svg');
  background-size: cover;
  background-repeat: repeat;
  bac
} */
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Bebas Neue', cursive;
  font-size: 36px;
}
.row {
  width: 100%;
}
.card {
  border: 1px solid #000;
}
.card-body {
  padding-bottom: 30px;
}
hr {
  border-top: 1px solid #333333;
}
.like {
  font-size: 16px;
}
.like img,
.dislike img {
  width: auto;
  height: 15px;
  margin-top: -5px;
}
.dislike img {
  margin-top: -2px !important;
  padding-right: 0px;
}
.like-options {
  cursor: pointer;
}
.next-btn,
.prev-btn,
.next-btn:hover,
.prev-btn:hover,
.next-btn:active,
.prev-btn:active,
.next-btn:focus,
.prev-btn:focus {
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  font-weight: 700 !important;
  box-shadow: none;
}
.next-btn:disabled,
.prev-btn:disabled {
  background-color: transparent;
  border: 2px solid #8e8686;
  border-radius: 5px;
  color: #333;
  cursor: not-allowed;
}
.pagination {
  margin-top: 20px;
  margin-bottom: 50px;
}
.user-loggedin .dropdown-toggle,
.user-loggedin .dropdown-toggle:hover,
.user-loggedin .dropdown-toggle:active,
.user-loggedin .dropdown-toggle:focus {
  background-color: transparent !important;
  color: #333333 !important;
  border: none !important;
  outline: none !important;
  margin-bottom: 0px;
}
.user-loggedin .dropdown-menu.show {
  width: 100%;
}
</style>
