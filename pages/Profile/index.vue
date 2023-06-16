<template>
    <div class='container'>
        <h1>Профиль</h1>
        <nuxt-link to="/">На главную</nuxt-link>
        <div v-if="userInfo">
            <ul>
                <li v-for="(field, index) in userInfo" :key="index">
                    {{ field }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'index',
        middleware: 'onlyForLoggedUser',
        computed: {
            ...mapGetters('modules/auth', ['userInfo']),
        },
    }
</script>

<style scoped>

</style>