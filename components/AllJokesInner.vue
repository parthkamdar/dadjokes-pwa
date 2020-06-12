<template>
  <div class="row">
    <div v-if="loading" class="row loading">
      <img src="../assets/loading.gif" class="rounded mx-auto d-block" />
    </div>
    <div v-if="!loading" class="cards-row row">
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
    <div class="pagination">
      <div class="row">
        <button
          :disabled="disablePrev"
          class="btn btn-primary prev-btn"
          v-on:click="prevPage"
        >
          Previous
        </button>
        <button
          :disabled="disableNext"
          class="btn btn-primary next-btn"
          v-on:click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AllJokesInner',
  data() {
    return {
      jokes: [],
      page: 1,
      disableNext: false,
      disablePrev: false,
      loading: true
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
    this.loading = false
    this.disablePrev = true
  },
  methods: {
    async nextPage() {
      this.loading = true
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
      this.loading = false
      if (res.data.total_pages === this.page) {
        this.disableNext = true
      }
      this.disablePrev = false
      this.page += 1
    },
    async prevPage() {
      this.loading = true
      if (this.page > 0) {
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
        this.loading = false
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
  margin-bottom: 30px;
}
.card {
  width: calc((100% / 3) - 10px);
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
.pagination {
  margin-bottom: 30px;
  width: 100%;
}
.pagination .row {
  width: max-content;
  display: block;
  margin: auto;
}
.btn {
  width: 150px;
  height: 45px;
  font-weight: bold;
}
.pagination .next-btn {
  margin-left: 100px;
}
.loading {
  width: 100%;
}
.loading img {
  width: 320px;
  height: auto;
}
</style>
