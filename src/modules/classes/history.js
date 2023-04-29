const db = require('../db')

class History {
  static getRecord(articleID) {
    const query = `
      SELECT * FROM History WHERE ArticleID = ? AND Active = TRUE;
    `
    const stmt = db.prepare(query)

    const articlePromise = new Promise((resolve, reject) => {
      stmt.get(articleID, (err, article) => {
        if (err) throw err
        article 
          ? resolve(article) 
          : reject(new Error("Error: article not found"))
      })
    })

    stmt.finalize()

    return articlePromise
  }

  static getAllRecords() {
    const query = `
      SELECT * FROM History;
    `
    const stmt = db.prepare(query)

    const articlesPromise = new Promise((resolve, reject) => {
      stmt.all((err, articles) => {
        if(err) throw err
        
        articles 
          ? resolve(articles) 
          : reject(new Error("Error: article not found"))
      })
    })

    stmt.finalize()

    return articlesPromise
  }

  static insert(article) {
    const { title, description, content } = article 

    const query = `
      INSERT INTO History
      (Title, Description, Content)
      VALUES (?, ?, ?);
    `
    const stmt = db.prepare(query)
    stmt.run(title, description, content)
    stmt.finalize()
  }

  static delete(articleID) {
    const query = `
      UPDATE History 
      SET Active = FALSE 
      WHERE ArticleID = ?; 
    `
    const stmt = db.prepare(query)
    stmt.run(articleID)
    stmt.finalize()
  }

  static update(articleID, newArticle) {
    const {title, description, content} = newArticle

    const query = `
      UPDATE History
      SET Title = ?, Description = ?, Content = ?
      WHERE ArticleID = ?;
    `
    const stmt = db.prepare(query)
    stmt.run(title, description, content, articleID)
    stmt.finalize()
  }

  static recover(articleID) {
    const query = `
      UPDATE History
      SET Active = TRUE
      WHERE ArticleID = ?;
    `
    const stmt = db.prepare(query)
    stmt.run(articleID)
    stmt.finalize()
  }
}

module.exports.History = History