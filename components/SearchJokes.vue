<template>
  <div class="row">
    <div class="cards-row row">
      <div v-for="joke in jokes" :key="joke.id" class="card">
        <div class="card-body">
          <p>{{ joke.joke }}</p>
          <div class="like-options">
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
export default {
  name: 'AllJokesInner',
  props: ['searchValue'],
  data() {
    return {
      jokes: [],
      page: 1,
      disableNext: false,
      disablePrev: false
    }
  },
  async created() {
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
      }
      this.disablePrev = false
      this.page += 1
    },
    async prevPage() {
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
        if (this.page === 1) {
          this.disablePrev = true
        }
      }
    },
    ifLiked(id) {
      if (this.$store.getters.getUser.liked.includes(id)) {
        return true
      }
      return false
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
  margin: 30px 0px;
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
</style>
