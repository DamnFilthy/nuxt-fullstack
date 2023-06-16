export default async ({ store, $api }) => {
    try {
        const token = store.$cookies.get("Ltk"),
            isLogin = store.state.modules.auth.isLogin,
            uid = store.$cookies.get("uid")

        if (!token) {
            await store.commit("modules/auth/setIsLoggedIn", false)
        }

        if (token && !isLogin) {
            const validToken = await $api("auth", "validateJwtOnServer", { token })

            if (validToken && validToken.isLogin === "true") {
                await store.commit("modules/auth/setIsLoggedIn", true)
            }

            if (uid) {
                const response = await $api("auth", "getUserInfo", { id: uid })

                if (response.status) {
                    await store.commit("modules/auth/setUserData", response.user)
                    await store.commit("modules/auth/setIsLoggedIn", true)
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}
