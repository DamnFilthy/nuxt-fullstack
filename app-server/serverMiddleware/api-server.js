export default async (req, res) => {
    let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, '').split('/')
    let method = url.pop()
    let controller = url.slice(1).join('/')
    let api = require('../api/' + controller)
    let result = await api[method](req.params)

    res.end(JSON.stringify(result))
}
