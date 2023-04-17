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
const db = require('./modules/database')

async function dbAsyncConnection() {
	try {
		connection = await db.pool.getConnection()
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

const port = process.env.PORT || 3500

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})

