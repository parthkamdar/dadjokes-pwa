<template>
  <div class="row">
    <h3>Editors Choice</h3>
    <div v-if="loading" class="row loading">
      <img src="../assets/loading.gif" class="rounded mx-auto d-block" />
    </div>
    <div v-if="!loading" class="cards-row row">
      <div class="card" v-for="joke in jokes" :key="joke.id">
        <div class="card-body">
          <p>{{ joke.joke }}</p>
          <div class="like-options">
            <hr />
            <span class="like">
              <img src="../assets/like.svg" />
              Like</span
            >
            <span class="dislike">
              <img src="../assets/dislike.svg" />Dislike</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FavJokes',
  data() {
    return {
      jokes: [],
      // loaded: false,
      loading: true
    }
  },
  async beforeCreate() {
    let i = 0
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    while (i < 8) {
      const res = await axios.get('https://icanhazdadjoke.com/', config)
      //   console.log(res.data)
      this.jokes.push(res.data)
      i++
    }
    // this.loaded = true
    this.loading = false
  }
}
</script>
<style scoped>
h3 {
  display: block;
  width: 100%;
  margin-bottom: 15px;
}
.cards-row {
  width: calc(100% + 10px);
  margin-right: -5px;
  margin-left: -5px;
}
.card {
  width: calc((100% / 4) - 10px);
  height: auto;
  margin: 5px;
  padding-bottom: 30px;
  position: relative;
}

.like-options {
  padding: 0px 1.25rem;
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 30px;
  left: 0;
  margin-bottom: 1rem;
}
.dislike {
  float: right;
}
.loading {
  width: 100%;
}
.loading img {
  width: 320px;
  height: auto;
}
.dislike img {
  padding-right: 5px;
}
</style>
