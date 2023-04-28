const db = require('../db')

class History {
  constructor(title, description, content) {
    this.title = title,
    this.description = description,
    this.content = content
  }

  static createArticle(article) {
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

  static getArticle(articleID) {
    const query = `
      SELECT * FROM History WHERE ArticleID = ? & Active <> FALSE;
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

  static async getAllArticles() {
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

  static deleteArticle(articleID) {
    const query = `
      UPDATE History 
      SET Active = FALSE 
      WHERE ArticleID = ?; 
    `
    const stmt = db.prepare(query)
    stmt.run(articleID)
    stmt.finalize()
  }

  static changeArticle(articleID, newArticle) {
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
}

module.exports.History = History


