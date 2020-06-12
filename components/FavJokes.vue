<template>
  <div class="row" v-if="loaded">
    <h3>Editors Choice</h3>
    <div class="cards-row row">
      <div class="card" v-for="joke in jokes" :key="joke.id">
        <div class="card-body">
          <p>{{ joke.joke }}</p>
          <div class="like-options">
            <hr />
            <span class="like">Like</span>
            <span class="dislike">Dislike</span>
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
      loaded: false
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
    this.loaded = true
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
</style>
