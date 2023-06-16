export const state = () => ({
    isLogin: false,
    user: null,
    userIpAddress: null,
})

export const getters = {
    isLoggedIn: (state) => {
        return state.isLogin
    },
    userIP: (state) => {
        return state.userIpAddress
    },
    userInfo: (state) => {
        return state.user
    },
}

export const mutations = {
    setToken(state, token) {
        this.$cookies.set("Ltk", token, {
            path: "/",
            maxAge: 60 * 60 * 8,
        })
    },
    setUserIP(state, payload) {
        state.userIpAddress = payload
    },
    setUserId(state, id) {
        this.$cookies.set("uid", id, {
            path: "/",
            maxAge: 60 * 60 * 8,
        })
    },
    setUserData(state, data) {
        state.user = data
    },
    setIsLoggedIn(state, status) {
        state.isLogin = status
    },
}

export const actions = {
    async onRegister({ commit }, payload) {
        return await this.$api("auth", "registerUser", payload)
    },
    async onLogin({}, payload) {
        return await this.$api("auth", "loginUser", payload)
    },
    async onLogout({ commit }) {
        return new Promise((resolve) => {
            this.$cookies.remove("Ltk")
            commit("setIsLoggedIn", false)
            resolve()
        })
    },
    async setLoginToken({ commit }, payload) {
        const { token, user } = payload
        return new Promise((resolve) => {
            commit("setToken", token)
            commit("setUserId", user.id)
            commit("setUserData", {
                id: user.id,
                name: user.firstname,
                email: user.email,
                age: user.age,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            })
            resolve()
        })
    },
}
