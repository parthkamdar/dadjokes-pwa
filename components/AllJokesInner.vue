<template>
  <div class="row">
    <div class="floatingNotification">
      <ErrorNotification v-if="errorFlag" :error-msg="errorDispatch" />
    </div>
    <div v-if="loading" class="row loading">
      <img src="../assets/loading.gif" class="rounded mx-auto d-block" />
    </div>
    <div v-if="!loading" class="cards-row row">
      <p>{{ error }}</p>
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
    <div class="pagination">
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
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import ErrorNotification from './ErrorNotification'

export default {
  name: 'AllJokesInner',
  components: { ErrorNotification },
  data() {
    return {
      jokes: [],
      page: 1,
      disableNext: false,
      disablePrev: false,
      loading: true,
      like: 'Like',
      dislike: 'Dislike',
      liked: [],
      error: '',
      errorDispatch: '',
      errorFlag: false
    }
  },
  async created() {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    const res = await axios.get(
      `${this.$store.state.url}/getJokes?page=${this.page}`,
      config
    )
    if (!res.data.error) {
      this.jokes = res.data.data
      this.loading = false
      this.disablePrev = true
    } else {
      this.error = res.data.data
    }
    this.checkError()
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
      if (res.data.pageCount === this.page) {
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
              this.$store.commit('setLiked', res.data.data.liked.liked)
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
    checkError() {
      if (this.$store.state.errorFlag) {
        this.showError(this.$store.state.error)
      }
    },
    showError(msg) {
      this.errorFlag = true
      this.errorDispatch = msg
      setTimeout(() => {
        this.errorFlag = false
        this.$store.commit('setErrorNull')
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
.floatingNotification {
  position: fixed;
  right: 30px;
  bottom: 0px;
  z-index: 99;
  max-width: 80%;
}
</style>
