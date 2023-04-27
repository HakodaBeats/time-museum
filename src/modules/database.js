const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./database-time.db', err => {
  if (err) throw err
  console.log('Connessione avvenuta con successo')
})

class HistoryArticle {
  constructor(article) {
    this.article = article
  }

  createArticle() {
    const { title, subtitle, description, content } = this.article 

    const query = `
      INSERT INTO History
      (Title, Subtitle, Description, Content)
      VALUES (?, ?, ?, ?)
    `
    const stmt = db.prepare(query)
    stmt.run(title, subtitle, description, content)
    stmt.finalize()

    console.log("Articolo creato con successo!")
  }
}

let firtArticle = new HistoryArticle({
  title: "Una parola: time",
  subtitle: "Storia di un museo",
  description: "Lorem ipsum dolor sit amet",
  content: "sed do eiusmod tempor incididunt"
})

firtArticle.createArticle()

db.all('SELECT * FROM History', [], (err, rows) => {
  if (err) throw err
  console.log(rows)
})





