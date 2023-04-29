const { PORT } = require('./modules/consts')
const routes = require('./modules/routes')

const path = require('path')
const express = require('express')
const app = express()

const { History } = require('./modules/classes/history')
const db = require('./modules/db')

app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)

History.insert({
	title: "Articolo1",
	description: "Descrizione1",
	content: "Contenuto1"
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})