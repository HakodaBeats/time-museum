const mariadb = require('mariadb')

module.exports = Object.freeze({
    pool: mariadb.createPool({
        host: 'localhost',
        user: `${process.env.DATABASE_USER}`,
        password: `${process.env.DATABASE_PASSWORD}`,
        connectionLimit: 5
    })
})
