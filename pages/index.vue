<template>
  <div><FavJokes /> <AllJokes /></div>
</template>

<script>
import FavJokes from '../components/FavJokes'
import AllJokes from '../components/AllJokes'
export default {
  components: {
    FavJokes,
    AllJokes
  }
}
</script>
<style>
.row {
  margin: 0px;
}
</style>
