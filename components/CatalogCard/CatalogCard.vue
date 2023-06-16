<template>
    <div class="card">
        <img :src="item.thumbnail" alt="product-img" sizes="50vw"/>
        <div class="card-body">
            <div class="row">
                <div class="card-title">
                    <h4>{{ item.title }}</h4>
                    <h3>${{ item.price }}</h3>
                </div>
                <div class="view-btn">
                    <a href="">View Details</a>
                </div>
            </div>
            <hr />
            <p>{{ item.description }}</p>
            <div class="btn-group">
                <div class="btn">
                    <a href="">Buy Now</a>
                </div>
            </div>
            <div>
                <span>{{ item.brand }}</span>
                <span>{{ item.category }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CatalogCard",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    width: 300px;
    min-height: 440px;
    border-radius: 5px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
}

.card > *:not(img) {
    padding: 5px 10px;
}

.card img {
    object-fit: cover;
    width: 100%;
    height: 180px;
}

.card-body {
    padding: 5px;
}

.row {
    padding: 5px;
}

.card-body p {
    color: #3d3d3d;
    font-size: 14px;
}

.view-btn a {
    padding: 5px 15px;
    border: 1.5px solid #007bff;
    border-radius: 3px;
    text-decoration: none;
    color: #007bff;
}

.btn-group {
    margin-bottom: 10px;
    display: flex;
}

.btn-group .btn a {
    padding: 5px 15px;
    background-color: #28a745;
    color: #fff;
    border-radius: 3px;
    margin-left: -2px;
}

.btn-group a {
    text-decoration: none;
    color: #000;
}
</style>
