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
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
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
}

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
.row {
  width: 100%;
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
.prev-btn:hover {
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
}
.next-btn:disabled,
.prev-btn:disabled {
  background-color: transparent;
  border: 2px solid #8e8686;
  border-radius: 5px;
  color: #333;
  cursor: not-allowed;
}
</style>
