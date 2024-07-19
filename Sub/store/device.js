const nameGenerator = (s) => {
  const substr = (n = 6) => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, n)
  return `device-${s}-${substr()}-${substr(4)}`.toLowerCase()
}

export const state = () => ({
  components: {}
})

export const actions = {
  add ({ state, commit }, { tab, name }) {
    const attemptInsert = (tab, name) => {
      const hashedDeviceName = nameGenerator(tab)
      const child = state.components[tab]
      if (!child || !Object.isFrozen(child)) {
        return hashedDeviceName
      } else {
        return null
      }
    }

    const insertValue = attemptInsert(tab, name)

    if (insertValue) {
      commit('ADD_DEVICE', [tab, name, insertValue])
      return insertValue
    } else {
      return null
    }
  },
  freeze ({ commit }, tab) {
    commit('FREEZE_TAB', tab)
  }
}

export const mutations = {
  ADD_DEVICE (state, [tab, name, hashedDeviceName]) {
    let child = state.components[tab]
    if (!child) {
      child = state.components[tab] = {
        [name]: hashedDeviceName
      }
    } else if (!Object.isFrozen(child)) {
      child[name] = child[name] || hashedDeviceName
    }
  },
  FREEZE_TAB (state, tab) {
    state.components[tab] = Object.freeze(state.components[tab])
  }
}

export const getters = {
  getDevices (state) {
    return state.components
  },
  getComponentIfExistsOrNull: state => (tab, deviceName) => {
    const tabDevices = state.components[tab] || {}
    return tabDevices[deviceName] || null
  }
}
