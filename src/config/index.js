module.exports = {
    server: {
        port: process.env.PORT || 3000,
    },
    jwt: {
        secret: 'mysecret',
        algorithms: ['HS256'],
    }
}