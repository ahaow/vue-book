const book = {
    state: {
        fileName: "",
        menuVisible: false
    },
    mutations: {
        'SET_FILENAME': (state, fileName) => {
            state.fileName = fileName
        },
        'SET_MENU': (state,menuVisible) => {
            state.menuVisible = menuVisible
        }
    },
    actions: {
        setFileName: ({ commit, state }, fileName) => {
            return commit('SET_FILENAME', fileName)
        },
        setMenuVisible: ({commit},menuVisible) => {
            return commit('SET_MENU', menuVisible)
        }
    }
}

export default book