const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('database-time.db', err => {
  if (err) throw err
  console.log('Connessione avvenuta con successo')
})

module.exports = db