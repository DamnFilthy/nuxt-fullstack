<template>
    <Nuxt />
</template>

<script>
import "./main.css"
export default {
    name: "DefaultLayout",
    middleware: ["checkUserToken"],
}
</script>

<style>
body {
    font-size: 16px;
}
</style>
