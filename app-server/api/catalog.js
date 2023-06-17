// Не менять путь на ~, для корректной работы клиентской части
import model from "../database/models"

async function getAllProducts() {
  await model.Product.sync()
  return model.Product.findAll({ raw: true })
    .then((products) => {
      return products
    })
    .catch((err) => console.log("err: ", err))
}

export { getAllProducts }
