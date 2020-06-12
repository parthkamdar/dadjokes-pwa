<template>
  <div class="row">
    <div class="row header">
      <h3>All Jokes</h3>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Search..."
          v-model="search"
        />
      </div>
    </div>
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
    <div class="row pagination">
      <button v-if="!disablePrev" class="btn btn-primary" v-on:click="nextPage">
        Previous
      </button>
      <button v-if="!disableNext" class="btn btn-primary" v-on:click="prevPage">
        Next
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AllJokes',
  data() {
    return {
      jokes: [],
      search: '',
      page: 1,
      disableNext: false,
      disablePrev: false
    }
  },
  async created() {
    // console.log(`https://icanhazdadjoke.com/search/page=${this.page}`)
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    const res = await axios.get(
      `https://icanhazdadjoke.com/search?page=${this.page}`,
      config
    )
    this.jokes = res.data.results
    this.disablePrev = true
  },
  methods: {
    async nextPage() {
      this.page += 1
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }
      const res = await axios.get(
        `https://icanhazdadjoke.com/search?page=${this.page}`,
        config
      )
      this.jokes = res.data.results
      if (res.data.total_pages === this.page) {
        this.disableNext = true
        this.disablePrev = false
      }
    },
    async prevPage() {
      while (this.page > 1) {
        this.page -= 1
        const config = {
          headers: {
            Accept: 'application/json'
          }
        }
        const res = await axios.get(
          `https://icanhazdadjoke.com/search?page=${this.page}`,
          config
        )
        this.jokes = res.data.results
        if (this.page === 1) {
          this.disablePrev = true
        }
      }
    }
  }
}
</script>
<style scoped>
.header {
  margin-top: 30px;
  width: 100%;
  position: relative;
}
h3 {
  margin-bottom: 15px;
}
.form-group {
  width: 350px;
  position: absolute;
  right: 0;
}
.cards-row {
  width: calc(100% + 10px);
  margin-right: -5px;
  margin-left: -5px;
}
.card {
  width: calc((100% / 2) - 10px);
  height: auto;
  margin: 5px;
  padding-bottom: 30px;
  position: relative;
}

.like-options {
  padding: 0px 10px;
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
