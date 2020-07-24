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
