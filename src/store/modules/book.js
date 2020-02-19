const book = {
    state: {
        test: 1
    },
    mutations: {
        'SET_TEST': (state, newVal) => {
            state.test = newVal
        }
    },
    actions: {
        setTest: ({ commit, state }, newVal) => {
            return commit('SET_TEST', newVal)
        }
    }
}

export default book