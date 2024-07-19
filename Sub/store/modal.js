export const state = () => ({
  component: null,
  lastActive: null,
  initiator: null
})

export const actions = {
  open ({ commit }, componentName) {
    commit('OPEN', componentName)
  },
  close ({ commit }) {
    commit('CLOSE', null)
  }
}

export const mutations = {
  OPEN (state, componentName) {
    state.component = componentName
    state.lastActive = componentName
  },
  CLOSE (state, componentName) {
    state.component = componentName
  }
}

export const getters = {
  getComponent ({ component }) {
    return component
  },
  getLastActiveComponent ({ lastActive }) {
    return lastActive
  }
}
