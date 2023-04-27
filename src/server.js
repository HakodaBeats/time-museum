const { PORT } = require('./modules/consts')
const routes = require('./modules/routes')

const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})

