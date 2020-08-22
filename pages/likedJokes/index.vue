<template>
  <div class="row">
    <div class="row header">
      <h3>Liked Jokes</h3>
      <div class="row jokes-row">
        <div v-if="loading" class="row loading">
          <img src="../../assets/loading.gif" class="rounded mx-auto d-block" />
        </div>
        <p class="no-data">{{ noData }}</p>
        <div v-if="!loading" class="cards-row row">
          <div v-for="joke in jokes" :key="joke.id" class="card">
            <div class="card-body">
              <p>{{ joke.joke }}</p>
              <div class="like-options" @click="likeClicked(joke)">
                <hr />
                <span class="like">
                  <img src="../../assets/liked.svg" />
                  Liked
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      noData: '',
      loading: false,
      jokes: [],
      loggedin: this.$store.getters.getLoggedIn.flag
    }
  },
  created() {
    this.loading = true
    setTimeout(() => {
      this.populateData()
    }, 100)
  },
  methods: {
    async populateData() {
      if (this.$store.getters.getLoggedIn.flag) {
        const config = {
          headers: {
            Accept: 'application/json',
            username: this.$store.getters.getUser.username,
            password: this.$store.getters.getUser.password
          }
        }
        const res = await axios.get(
          `${this.$store.state.url}/auth/getLikedJokes`,
          config
        )
        if (!res.data.error) {
          this.jokes = res.data.data.jokes
          this.loading = false
        }
      } else {
        this.$store.commit(
          'setError',
          'You need to be logged in to view your liked jokes '
        )
        this.$router.push('/')
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
              this.populateData()
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

<style>
.row {
  margin: 0px;
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
