module.exports = {
    server: {
        port: process.env.PORT || 3000,
    },
    jwt: {
        secret: 'mysecret',
        algorithms: ['HS256'],
    },
    dbURL: process.env.DATABASE_URL || "postgres://user:pass@postgres:5432/db",
    postgre: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "db",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        dialect: process.env.DB_DIALECT || "postgres",
        pool: {
            max: process.env.DB_MAX_CONNECT || 10,
            min: process.env.DB_MIN_CONNECT || 0,
            acquire: process.env.DB_ACQUIRE_TIMEOUT || 30000,
            idle: process.env.DB_IDLE_TIMEOUT || 10000
        }
    },
    postgreMaster: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "db",
        host: process.env.DBM_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        dialect: process.env.DB_DIALECT || "postgres",
        pool: {
            max: process.env.DB_MAX_CONNECT || 10,
            min: process.env.DB_MIN_CONNECT || 0,
            acquire: process.env.DB_ACQUIRE_TIMEOUT || 30000,
            idle: process.env.DB_IDLE_TIMEOUT || 10000
        }
    }
}