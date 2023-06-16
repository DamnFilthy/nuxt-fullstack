const jwt = require("jsonwebtoken")

function createJwt(time) {
    try {
        return jwt.sign({ isLogin: "true" }, process.env.SUPER_SECRET_KEY, { expiresIn: time })
    } catch {
        return false
    }
}

function validateJwt(token) {
    try {
        return jwt.verify(token, process.env.SUPER_SECRET_KEY)
    } catch {
        return false
    }
}

export { createJwt, validateJwt }
