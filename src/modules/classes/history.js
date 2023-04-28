const db = require('../db')

class History {
  static getRecord(articleID) {
    const query = `
      SELECT * FROM History WHERE ArticleID = ? AND Active <> FALSE;
    `
    const stmt = db.prepare(query)

    const articlePromise = new Promise((resolve, _) => {
      stmt.get(articleID, (_, article) => {
        article ? resolve(article) : resolve(null)
      })
    })

    stmt.finalize()

    return articlePromise
  }

  static async getAllRecords() {
    const query = `
      SELECT * FROM History WHERE Active <> FALSE;
    `
    const stmt = db.prepare(query)

    const articlesPromise = new Promise((resolve, _) => {
      stmt.all((_, articles) => {
        articles ? resolve(articles) : resolve(null)
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
      WHERE ArticleID = ?
    `
    const stmt = db.prepare(query)
    stmt.run(title, description, content, articleID)
    stmt.finalize()
  }

  static recover(articleID) {
    const query = `
      UPDATE History
      SET Active = TRUE
      WHERE ArticleID = ?
    `
    const stmt = db.prepare(query)
    stmt.run(articleID)
    stmt.finalize()
  }
}

module.exports.History = History


