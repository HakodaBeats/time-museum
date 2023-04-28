const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./database-time.db', err => {
  if (err) throw err
  console.log('Connessione avvenuta con successo')
})

class History {
  createArticle(article) {
    const { title, subtitle, description, content } = article 

    const query = `
      INSERT INTO History
      (Title, Subtitle, Description, Content)
      VALUES (?, ?, ?, ?)
    `
    const stmt = db.prepare(query)
    stmt.run(title, subtitle, description, content)
    stmt.finalize()
  }

  getArticle(articleID) {
    const query = `
      SELECT * FROM History WHERE ArticleID = ?;
    `
    const stmt = db.prepare(query)
    let article = stmt.run(articleID)
    stmt.finalize()

    return article
  }

  getAllArticles() {
    const query = `
      SELECT * FROM History;
    `
    return db.run(query)
  }

  deleteArticle(articleID) {
    const query = `
      DELETE * FROM History WHERE ArticleID = ?
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

console.log('Selezione di tutti gli articoli')

let articles = history.getAllArticles()
console.log(articles)

console.log('Cambiamento del primo articolo: ')

history.changeArticle(1, {
   title: "Titolo dell'articolo modificato", 
   subtitle: "Sottititolo bellissimo modificato", 
   description: "Descrizione modificata meravigliosa", 
   content: "Nuovo ontenuto dell'audace articolo"
})

console.log('Stampa di controllo dopo cambiamento articolo: ')

articles = history.getAllArticles()
console.log(articles)

console.log('Eliminazione primo articolo')

history.deleteArticle(1)

console.log('Seconda di controllo dopo cambiamento articolo: ')

articles = history.getAllArticles()
console.log(articles)