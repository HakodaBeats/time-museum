const db = require('../db')

class Users {
  static getRecord(userID) {
    const query = `
      SELECT * FROM Users 
      WHERE UserID = ? AND Active = TRUE
    `
    const stmt = db.prepare(query)

    const userPromise = new Promise ((resolve, reject) => {
      stmt.get(userID, (err, user) => {
        if (err) throw err
        user 
          ? resolve(user)
          : reject(new Error("Error: user not found"))
      })
    })

    stmt.finalize()

    return userPromise
  }

  static getAllRecords() {
    const query = `
      SELECT * FROM Users;
    `
    const stmt = db.prepare(query)

    const usersPromise = new Promise((resolve, reject) => {
      stmt.all((err, users) => {
        if (err) throw err

        users
          ? resolve(users)
          : reject(new Error("Error: users not found"))
      })
    })

    stmt.finalize()

    return usersPromise
  }

  static insert(user) {
    const {email, password, role} = user

    const query = `
      INSERT INTO Users (
        Email, Password, Rolw
      ) VALUES (?, ?, ?);
    `
    const stmt = db.prepare(query)
    stmt.run(email, password, role)
    stmt.finalize()
  }

  static delete(userID) {
    const query = `
      UPDATE Users
      SET Active = FALSE
      WHERE UserID = ?;
    `
    const stmt = db.prepare(query)
    stmt.run(userID)
    stmt.finalize()
  }

  static update(userID, newUser) {
    const {email, password, role} = newUser

    const query = `
      UPDATE Users
      SET Email = ?, Password = ?, Content = ?
      WHERE UserID = ?;
    `
    const stmt = db.prepare(query)
    stmt.run(email, password, role, userID)
    stmt.finalize()
  }

  static recover(userID) {
    const query = `
      UPDATE Users
      SET Active = TRUE
      WHERE UserID = ?
    `
    const stmt = db.prepare(query)
    stmt.run(userID)
    stmt.finalize()
  }
}

module.exports.Users = Users