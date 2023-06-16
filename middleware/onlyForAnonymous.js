export default async ({ store, $api, redirect }) => {
    try {
        const token = store.$cookies.get("Ltk"),
            isLogin = store.state.modules.auth.isLogin,
            uid = store.$cookies.get("uid")

        if (token && uid && isLogin) {
            await store.commit("modules/auth/setIsLoggedIn", true)
            return redirect("/")
        }
    } catch (e) {
        console.log(e)
    }
}
