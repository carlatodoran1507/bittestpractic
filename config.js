module.exports = {
    //DB_CONNECTION: String(process.env.DB_CONNECTION_REMOTE),
    DB_CONNECTION: String(process.env.DB_CONNECTION_LOCAL),
    TOKEN_SECRET: String(process.env.TOKEN_SECRET),
    HTTP_PORT: Number(process.env.HTTP_PORT)
};