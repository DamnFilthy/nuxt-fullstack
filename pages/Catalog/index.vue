<template>
    <div>
        <h1>Catalog</h1>
        <nuxt-link to="/">Главная</nuxt-link>
        <div class="catalog__wrapper" v-if="catalogData">
            <catalog-card v-for="product in catalogData.products" :key="product.id" :item="product" />
        </div>
    </div>
</template>

<script>
import CatalogCard from "@/components/CatalogCard/CatalogCard.vue"

export default {
    name: "catalog",
    components: { CatalogCard },
    async asyncData({ $api }) {
        let catalogData = null
        await fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((res) => (catalogData = res))
        return {
            catalogData: catalogData,
        }
        // return {
        //     catalogData: await $api("test", "testProducts"),
        // }
    },
}
</script>

<style scoped>
.catalog__wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
}
</style>
