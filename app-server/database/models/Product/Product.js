const Sequelize = require("sequelize")
// Не менять путь на ~, для корректной работы клиентской части
import { sequelize } from "../../../../plugins/db.connection"

export const Product = sequelize.define("Product", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.INTEGER,
    },
    discountPercentage: {
        type: Sequelize.INTEGER,
    },
    rating: {
        type: Sequelize.INTEGER,
    },
    stock: {
        type: Sequelize.INTEGER,
    },
    type: {
        type: Sequelize.STRING,
    },
    brand: {
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    },
    thumbnail: {
        type: Sequelize.STRING,
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
    },
})
