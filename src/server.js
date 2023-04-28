const { PORT } = require('./modules/consts')
const routes = require('./modules/routes')

const path = require('path')
const express = require('express')
const app = express()

const { History } = require('./modules/classes/history')

app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)

console.log('\nCreazione articolo...\n')

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})

