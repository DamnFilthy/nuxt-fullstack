export const state = () => ({
    testDataById: null,
    updatedData: null,
})

export const getters = {
    fetchedTestDataById: (state) => {
        return state.testDataById
    },
    fetchedUpdatedData: (state) => {
        return state.updatedData
    },
}

export const mutations = {
    setTestDataById(state, payload) {
        state.testDataById = payload
    },
    setUpdatedData(state, payload) {
        state.updatedData = payload
    },
}

export const actions = {
    async getTestData({ commit }, id) {
        const data = await this.$api('test', 'show', { id })
        commit('setTestDataById', data)
    },
    async addUser({ commit }, payload) {
        const data = await this.$api('test', 'createUser', payload)
        commit('setUpdatedData', data)
    },
}
