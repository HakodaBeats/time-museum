require('dotenv').config()

const express = require('express')
const app = express()

const homeRouter = require('./routes/home')

app.set('view engine', 'ejs')
app.use('/', homeRouter)

const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: 'localhost',
    user: `${process.env.DATABASE_USER}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    connectionLimit: 5
})

let connection

async function dbAsyncConnection() {
    try {
        connection = await pool.getConnection()
        await connection.query("USE TimeModel")
        console.log('Connessione avvenuta')

    } catch (error) {
        throw error

    } finally {
        if (connection)
            return connection.end()
    }
}

dbAsyncConnection()

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})