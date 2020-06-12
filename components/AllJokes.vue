<template>
  <div class="row">
    <div class="row header">
      <h3>{{ title }}</h3>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Search..."
          v-model="search"
          v-on:keyup.enter="submitSearch"
        />
        <small v-if="searchJokes" v-on:click="clearSearch">Clear</small>
      </div>
    </div>
    <AllJokesInner v-if="!searchJokes" />
    <!-- <SearchJokes :searchValue="search" v-if="searchJokes" /> -->
    <div v-if="searchJokes" class="row jokes-row">
      <div v-if="loading" class="row loading">
        <img src="../assets/loading.gif" class="rounded mx-auto d-block" />
      </div>
      <p class="no-data">{{ noData }}</p>
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
      <div v-if="showPagination" class="pagination">
        <!-- prettier-ignore-start -->

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
            Next Page
          </button>
        </div>
        <!-- prettier-ignore-end -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import AllJokesInner from '../components/AllJokesInner'
// import SearchJokes from '../components/SearchJokes'
export default {
  name: 'AllJokes',
  data() {
    return {
      search: '',
      searchJokes: false,
      title: 'All Jokes',
      jokes: [],
      page: 1,
      showPagination: false,
      disableNext: false,
      disablePrev: false,
      noData: '',
      loading: true
    }
  },
  components: {
    AllJokesInner
  },
  methods: {
    async submitSearch() {
      if (this.search !== '') {
        this.title = `Jokes for: ${this.search}`
        this.searchJokes = true
        this.$emit('search', this.search)
        const config = {
          headers: {
            Accept: 'application/json'
          }
        }
        const res = await axios.get(
          `https://icanhazdadjoke.com/search?term=${this.search}`,
          config
        )
        if (res.data.results.length > 0) {
          this.jokes = res.data.results
          this.loading = false
        } else {
          this.noData = 'No jokes found with these keywords, Try Again!'
          this.loading = false
        }
        if (res.data.total_pages > 1) {
          this.showPagination = true
        }
        this.disablePrev = true
      }
    },
    async nextPage() {
      this.loading = true
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }
      const res = await axios.get(
        `https://icanhazdadjoke.com/search?term=${this.search}&page=${this.page}`,
        config
      )
      this.jokes = res.data.results
      if (res.data.total_pages === this.page) {
        this.disableNext = true
        this.loading = false
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
          `https://icanhazdadjoke.com/search?term=${this.search}&page=${this.page}`,
          config
        )
        this.jokes = res.data.results
        this.loading = false
        if (this.page === 1) {
          this.disablePrev = true
        }
      }
    },
    clearSearch() {
      this.title = 'All Jokes'
      this.search = ''
      this.searchJokes = false
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
input {
  padding-right: 30px;
}
small {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
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
.jokes-row {
  width: 100%;
  margin-bottom: 30px;
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
.no-data {
  width: 100%;
}
.loading {
  width: 100%;
}
.loading img {
  width: 320px;
  height: auto;
}
</style>
