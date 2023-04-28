const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('database-time.db', err => {
  if (err) throw err
  console.log('Connessione avvenuta con successo')
})

class History {
  createArticle(article) {
    const { title, subtitle, description, content } = article 

    const query = `
      INSERT INTO History
      (Title, Subtitle, Description, Content)
      VALUES (?, ?, ?, ?);
    `
    const stmt = db.prepare(query)
    stmt.run(title, subtitle, description, content)
    stmt.finalize()
  }

  getArticle(articleID) {
    const query = `
      SELECT * FROM History WHERE ArticleID = ?;
    `
    let article

    db.get(query, [articleID], (err, row) => {
      if (err) return console.error(err.message) // TODO: Error handling
      article = row
    })

    return article
  }

  getAllArticles() {
    const query = `
      SELECT * FROM History;
    `
    let articles

    db.all(query, [], (err, rows) => {
      if (err) return console.error(err.message) // TODO: Error handling
      articles = rows
    })

    return articles
  }

  deleteArticle(articleID) {
    const query = `
      DELETE FROM History WHERE ArticleID = ?;
    `
    const stmt = db.prepare(query)
    stmt.run(articleID)
    stmt.finalize()
  }

  changeArticle(articleID, newArticle) {
    this.deleteArticle(articleID)
    this.createArticle(newArticle)
  }
}

let history = new History()

console.log('Creazione articolo\n')

history.createArticle({
   title: "Titolo dell'articolo", 
   subtitle: "Sottititolo bellissimo", 
   description: "Descrizione meravigliosa", 
   content: "Contenuto dell'audace articolo"
})

console.log('Selezione primo articolo:\n')

let firstArticle = history.getArticle(1)
console.log(firstArticle)

console.log('Selezione di tutti gli articoli\n')

let articles = history.getAllArticles()
console.log(articles)

console.log('Cambiamento del primo articolo:\n')

history.changeArticle(1, {
   title: "Titolo dell'articolo modificato", 
   subtitle: "Sottititolo bellissimo modificato", 
   description: "Descrizione modificata meravigliosa", 
   content: "Nuovo ontenuto dell'audace articolo"
})

console.log('Stampa di controllo dopo cambiamento articolo:\n')

articles = history.getAllArticles()
console.log(articles)

console.log('Eliminazione primo articolo:\n')

history.deleteArticle(1)

console.log('Seconda stampa di controllo dopo cancellamento articolo:\n')

articles = history.getAllArticles()
console.log()

db.all('SELECT * FROM History', [], (err, rows) => {
  console.log(rows)
})