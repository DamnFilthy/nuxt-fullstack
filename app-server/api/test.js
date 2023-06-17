// Не менять путь на ~, для корректной работы клиентской части
import * as model from "../database/models/User/User"


async function index() {
    return model.User.findAll({ raw: true })
        .then((users) => {
            return users
        })
        .catch((err) => console.log("err: ", err))
}

async function show({ id }) {
    return model.User.findAll({ where: { id: id }, raw: true })
        .then((users) => {
            return users
        })
        .catch((err) => console.log("err: ", err))
}

async function createUser(payload) {
    return model.User.create(payload)
        .then(async () => {
            return await index()
        })
        .catch((err) => console.log("err: ", err))
}

export { index, show, createUser }
