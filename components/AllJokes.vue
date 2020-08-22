<template>
  <div class="row">
    <div class="floatingNotification">
      <ErrorNotification v-if="errorFlag" :error-msg="errorDispatch" />
    </div>
    <div class="row header">
      <h3>{{ title }}</h3>
      <div class="form-group">
        <input
          id="exampleInputEmail1"
          v-model="search"
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Search..."
          @keyup.enter="submitSearch"
        />
        <small v-if="searchJokes" @click="clearSearch">Clear</small>
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
        <div v-for="joke in jokes" :key="joke.id" class="card">
          <div class="card-body">
            <p>{{ joke.joke }}</p>
            <div class="like-options" @click="likeClicked(joke)">
              <hr />
              <span v-if="!ifLiked(joke.id)" class="like">
                <img src="../assets/like.svg" />
                Like
              </span>
              <span v-if="ifLiked(joke.id)" class="like">
                <img src="../assets/liked.svg" />
                Liked
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showPagination" class="pagination">
        <div class="row">
          <button
            :disabled="disablePrev"
            class="btn btn-primary prev-btn"
            @click="prevPage"
          >
            Previous
          </button>
          <button
            :disabled="disableNext"
            class="btn btn-primary next-btn"
            @click="nextPage"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import AllJokesInner from '../components/AllJokesInner'
import ErrorNotification from './ErrorNotification'

// import SearchJokes from '../components/SearchJokes'
export default {
  name: 'AllJokes',
  components: {
    AllJokesInner,
    ErrorNotification
  },
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
      loading: true,
      errorDispatch: '',
      errorFlag: false
    }
  },
  methods: {
    async submitSearch() {
      this.noData = ''
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
    },
    ifLiked(id) {
      if (this.$store.getters.getLoggedIn.flag) {
        if (this.$store.getters.getUser.liked.includes(id)) {
          return true
        }
        return false
      } else {
        return false
      }
    },
    async likeClicked(joke) {
      if (this.$store.getters.getLoggedIn.flag) {
        const config = {
          headers: {
            Accept: 'application/json',
            username: this.$store.getters.getUser.username,
            password: this.$store.getters.getUser.password
          }
        }
        const res = await axios.post(
          `${this.$store.state.url}/auth/like`,
          {
            jokeId: joke.id
          },
          config
        )
        if (!res.data.error) {
          if (res.data.data.success) {
            // Get Liked data
            const res = await axios.get(
              `${this.$store.state.url}/auth/getLikes`,
              config
            )
            if (!res.data.error) {
              this.$store.commit('setLiked', res.data.data.liked)
            } else {
              // Request Not Success
            }
          } else {
            // Oops something went wrong
          }
        } else {
        }
      } else {
        // User Not LoggedIn
        this.showError('Please login/register to like jokes')
      }
    },
    showError(msg) {
      this.errorFlag = true
      this.errorDispatch = msg
      setTimeout(() => {
        this.errorFlag = false
      }, 3000)
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
  border: 1.5px solid #afafaf;
  height: 45px;
  font-weight: bold;
  margin-bottom: 0px;
}
.form-control:focus {
  outline: none;
  border: 1px solid #333333;
  border-color: none;
  outline: 0;
  box-shadow: none;
}
::placeholder {
  color: #afafaf;
  font-weight: 400;
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
.like {
  display: block;
  text-align: center;
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
.floatingNotification {
  position: fixed;
  right: 30px;
  bottom: 0px;
  z-index: 99;
  max-width: 80%;
}
</style>
