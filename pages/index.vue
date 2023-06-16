<template>
    <div class="container">
        <div>IP: {{ userIP }}</div>
        <nuxt-link to="/auth">Вход / Регистрация</nuxt-link>
        <button v-if="isLoggedIn" @click="signOut" class="danger">Выйти из аккаунта</button>
        <br />
        <nuxt-link to="/profile">Мой Профиль</nuxt-link>
        <br />
        <nuxt-link to="/simple">Страница для всех</nuxt-link>
        <nuxt-link to="/another">Another</nuxt-link>
        <nuxt-link to="/catalog">Catalog</nuxt-link>
        <div>
            <h1>data:</h1>
            <div>
                <pre>{{ test }}</pre>
            </div>
        </div>
        <button @click="getById" variant="outlined primary">Get by id:2</button>
        <div>
            {{ fetchedTestDataById }}
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
    name: "test",
    middleware: ["getUserIP", "onlyForLoggedUser"],
    async asyncData({ $api }) {
        return {
            test: await $api("test", "index"),
        }
    },
    computed: {
        ...mapGetters("modules/auth", ["isLoggedIn", "userIP"]),
        ...mapGetters("modules/test", ["fetchedTestDataById"]),
    },
    methods: {
        ...mapActions("modules/auth", ["onLogout"]),
        ...mapActions("modules/test", ["getTestData", "addUser"]),

        getById() {
            this["getTestData"](2)
        },

        signOut() {
            this["onLogout"]()
                .then(() => this.$router.push("/auth"))
                .catch((e) => console.log(e))
        },
    },
}
</script>

<style scoped></style>
