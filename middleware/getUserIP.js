export default async ({ store, req }) => {
    if (process.server) {
        const ip = req.connection.remoteAddress || req.socket.remoteAddress
        await store.commit("modules/auth/setUserIP", ip)
    }
}
