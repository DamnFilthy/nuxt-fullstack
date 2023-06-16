const bcrypt = require("bcrypt"),
    /**
     * Фактор стоимости - определяет, сколько времени требуется для вычисления одного хэша BCrypt.
     * Чем выше коэффициент стоимости, тем больше раундов хеширования выполняется.
     * @type {number}
     */
    saltRounds = 10

/**
 * Генерация хэша на основе пароля
 * @param {string} password - введеный пользователем пароль
 * @returns {string, boolean} - сгенерированный хэш на основе пароля / либо false если ошибка
 */
async function passwordToHash(password) {
    return new Promise(async (resolve, reject) => {
        await bcrypt
            .genSalt(saltRounds)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hash) => resolve(hash))
            .catch(() => reject(false))
    })
}

/**
 * Проверка пароля
 * @param {string} password - введенный пользователем пароль
 * @param {string} hash - извлеченный из БД хэш пароля
 * @returns {boolean} - true если хэш совпадает, false если нет (или если ошибка)
 */
async function validatePassword(password, hash) {
    return new Promise(async (resolve, reject) => {
        await bcrypt
            .compare(password, hash)
            .then((res) => resolve(res))
            .catch(() => reject(false))
    })
}

export { passwordToHash, validatePassword }
