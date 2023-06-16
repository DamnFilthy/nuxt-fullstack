export default async ({ store, redirect, $api }) => {
    try {
        const token = store.$cookies.get("Ltk"),
            isLogin = store.state.modules.auth.isLogin,
            userData = store.state.modules.auth.user,
            uid = store.$cookies.get("uid")

        if (!token || !uid) {
            return deleteFromSession(store, redirect, "/auth")
        }

        if (!isLogin) {
            const validToken = await $api("auth", "validateJwtOnServer", { token })

            if (!validToken || validToken.isLogin !== "true") {
                return deleteFromSession(store, redirect, "/auth")
            }

            if (!userData) {
                const response = await $api("auth", "getUserInfo", { id: uid })

                if (response.status) {
                    await store.commit("modules/auth/setUserData", response.user)
                    await store.commit("modules/auth/setIsLoggedIn", true)
                } else {
                    return deleteFromSession(store, redirect, "/auth")
                }
            }
        }

        if (!isLogin) {
            await store.commit("modules/auth/setIsLoggedIn", true)
        }
    } catch (e) {
        console.log(e)
    }
}

async function deleteFromSession(store, redirect, page) {
    store.$cookies.remove("Ltk")
    store.$cookies.remove("uid")
    await store.commit("modules/auth/setIsLoggedIn", false)

    return redirect(page)
}
