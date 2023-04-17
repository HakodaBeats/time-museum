require('dotenv').config()

const express = require('express')
const app = express()

// Routes handling
const home = require('./routes/home')
app.use('/', home)

const login = require('./routes/login')
app.use('/login', login)

const register = require('./routes/register')
app.use('/register', register)

const events = require('./routes/events')
app.use('/events', events)

app.use(express.static('public'))
app.set('view engine', 'ejs')

// Database handling
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

