// Не менять путь на ~, для корректной работы клиентской части
import model from "../database/models"
import { passwordToHash, validatePassword } from "./utils/password"
import { createJwt, validateJwt } from "./utils/jwt"

/**
 * Регистрация пользователя
 * @param {object} payload - данные для регистрации из формы
 * @returns {object} - статус 0/1 и сообщение/ошибка
 */
async function registerUser(payload) {
    await model.User.sync()
    const { firstname, email, age, password } = payload

    return model.User.findOne({ where: { email: email }, raw: true })
        .then(async (user) => {
            if (!user) {
                return model.User.create({
                    firstname,
                    email,
                    password: await passwordToHash(password),
                    age,
                })
                    .then((user) => {
                        const token = createJwt("8h")
                        return { status: 1, message: "user created", token, user: user.dataValues }
                    })
                    .catch((err) => {
                        return { status: 0, error: err }
                    })
            } else {
                return { status: 0, message: "Пользователь с данным email уже существует" }
            }
        })
        .catch((err) => {
            console.log("err: ", err)
            return { status: 0, error: err }
        })
}

/**
 * Вход пользователя
 * @param {object} payload - данные для регистрации из формы
 * @returns {object} - статус 0/1 и сообщение/ошибка
 */
async function loginUser(payload) {
    await model.User.sync()
    const { email, password } = payload

    return model.User.findOne({ where: { email: email }, raw: true })
        .then(async (user) => {
            if (!user) return { status: 0, message: "Не верный email" }

            const isPasswordValid = await validatePassword(password, user.password)

            if (isPasswordValid) {
                const token = createJwt("8h")
                return {
                    status: 1,
                    message: "successful login",
                    token,
                    user,
                }
            } else return { status: 0, message: "Не правильный пароль" }
        })
        .catch((err) => console.log("err: ", err))
}

/**
 * Получение данных пользователя по id
 * @param {object} payload - id для поиска пользователя
 * @returns {object} - статус 0/1 и сообщение/ошибка и объект с данными пользователя
 */
async function getUserInfo(payload) {
    const { id } = payload

    return model.User.findOne({ where: { id: id }, raw: true })
        .then(async (user) => {
            if (!user) return { status: 0, message: "Пользователь не найден" }

            return {
                status: 1,
                message: "Пользователь успешно найден",
                user: {
                    id: user.id,
                    name: user.firstname,
                    email: user.email,
                    age: user.age,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            }
        })
        .catch((err) => console.log("err: ", err))
}

/**
 * Валидация JWT на сервере
 * @param {object} payload - токен для проверки
 * @returns {object} - результат проверки токена object/false
 */
async function validateJwtOnServer(payload) {
    const { token } = payload
    return validateJwt(token)
}

export { registerUser, loginUser, validateJwtOnServer, getUserInfo }
