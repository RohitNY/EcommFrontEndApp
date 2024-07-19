export const state = () => ({
  bootstrap: null
})

export const actions = {
  setBootstrap ({ commit }, data) {
    commit('SET_BOOTSTRAP', data)
  },
  setActivePathExperience ({ commit }, placementInt) {
    commit('SET_ACTIVE_PATH_EXPERIENCE', placementInt)
  },
  injectPathExperience ({ commit }, pathExp) {
    if (pathExp.Slug) {
      commit('INJECT_NEXT_PATH_EXPERIENCE', pathExp)
    } else {
      this.$hopX.debug(
        'error',
        `Invalid Path Experience object, could not load path experience, 
        continuing to the next predefined path.`
      )
    }
  },
  gotoPathExperience (_, { Slug, Placement }) {
    this.$router.push({
      name: 'shop',
      query: { tn: Slug, pg: Placement }
    })
  },
  continuePathExperience ({ dispatch, getters }) {
    const { Slug, Placement } = getters.getNextPathExperience
    if (typeof Slug === 'string') {
      this.$router.push({
        name: 'shop',
        query: { tn: Slug, pg: Placement }
      })
    }
  }
}

export const mutations = {
  SET_BOOTSTRAP (state, data) {
    state.bootstrap = data
  },
  SET_ACTIVE_PATH_EXPERIENCE (state, placementInt) {
    state.bootstrap.PathExperiences.forEach((path) => {
      path.Visited = path.Visited || path.Placement <= placementInt
      path.Active = path.Placement === placementInt
    })
  },
  INJECT_NEXT_PATH_EXPERIENCE (state, injectPathExp) {
    const currentPathExp = this.getters['app/getActivePathExperience']
    const nextPlacement = currentPathExp.Placement + 1
    const pathExperiences = []

    const newPlacementConfig = { ...injectPathExp, Placement: nextPlacement }

    let placementInjected = false

    state.bootstrap.PathExperiences.forEach((p) => {
      if (p.Placement === nextPlacement) {
        pathExperiences.push(newPlacementConfig)
        placementInjected = true
      }

      /* increment all current Placements values after new placement is injected */
      if (p.Placement >= nextPlacement) {
        p.Placement++
      }

      pathExperiences.push({ ...p })
    })

    if (!placementInjected) {
      pathExperiences.push(newPlacementConfig)
    }

    state.bootstrap.PathExperiences = pathExperiences
  }
}

export const getters = {
  getBootstrapConfig ({ bootstrap }) {
    return bootstrap
  },
  getPagePathExperienceBySlug: ({ bootstrap }) => (tn) => {
    return bootstrap.PathExperiences.find(x => x.Slug === tn)
  },
  getActivePathExperience ({ bootstrap }) {
    return bootstrap.PathExperiences.find(x => x.Active) || {}
  },
  getNextPathExperience ({ bootstrap }) {
    const active = bootstrap.PathExperiences.find(x => x.Active) || {}
    return bootstrap.PathExperiences.find(x => x.Placement === active.Placement + 1) || {}
  }
}
