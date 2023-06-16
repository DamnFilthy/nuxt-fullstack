"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("users", [
            {
                firstname: "admin",
                email: "admin@mail.ru",
                password: "$2b$10$UwZ6l4/WOofiRespxKtqeOG9zDDgvfk7.A8XIydu2F6nO3DsT4ZPu",
                age: 29,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Users", null, {})
    },
}
