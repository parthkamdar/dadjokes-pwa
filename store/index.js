// import createPersistedState from 'vuex-persistedstate'

// export const plugins = [createPersistedState]

export const state = () => ({
  url: 'https://not-so-funny-api.herokuapp.com',
  loggedIn: {
    flag: false
  },
  user: null
})

export const mutations = {
  setLoggedIn(state, response) {
    state.loggedIn = {
      flag: true,
      userId: response.userid
    }
    state.user = response
  },
  logout(state) {
    state.loggedIn = {
      falg: false
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
