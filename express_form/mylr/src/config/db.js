const env = process.env.NODE_ENV
let MYSQL_CONFIG = {}
if (env === 'dev') {
    // mysql
    MYSQL_CONFIG = {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        port: '3306',
        database: 'bank'
    }
    // redis
    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}
module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}
