// import createPersistedState from 'vuex-persistedstate'

// export const plugins = [createPersistedState]

export const state = () => ({
  url: 'https://not-so-funny-api.herokuapp.com',
  loggedIn: {
    flag: false
  },
  user: null,
  error: '',
  errorFlag: false
})

export const mutations = {
  setLoggedIn(state, response) {
    state.loggedIn = {
      flag: true,
      userId: response.userid
    }
    state.user = response
  },
  setUser(state, response) {
    state.user = response
  },
  setLiked(state, response) {
    state.user.liked = response
  },
  setError(state, response) {
    state.error = response
    state.errorFlag = true
  },
  setErrorNull(state) {
    state.error = ''
    state.errorFlag = false
  },
  logout(state) {
    state.loggedIn = {
      flag: false
    }
    state.user = null
  }
}

export const getters = {
  getLoggedIn(state) {
    return state.loggedIn
  },
  getUser(state) {
    return state.user
  }
}
