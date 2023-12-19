export default {
    port: process.env.PORT!!,
    jwtSecret: process.env.JWT_SECRET!!,
    accessTokenLifetimeSeconds: 300,
    refreshTokenLifetimeSeconds: 24 * 60 * 60,
    refreshTokenBytesNumber: 32,

    // Format compatible with isStrongPassword function from package 'validator'
    passwordPolicy: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    },

    mongodb: {
        username: process.env.MONGO_USERNAME!!,
        password: process.env.MONGO_PASSWORD!!,
        database: process.env.MONGO_DATABASE!!,
        hostname: process.env.MONGO_HOST!!,
        port: process.env.MONGO_PORT!!,
    },
}
