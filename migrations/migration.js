const fs = require('fs')
const path = require('path')

exports.up = function(knex) {
  const upPath = path.join(__dirname, 'up.sql')
  return knex.raw(fs.readFileSync(upPath, 'utf8'))
}

exports.down = function(knex) {
  const downPath = path.join(__dirname, 'down.sql')
  return knex.raw(fs.readFileSync(downPath, "utf8"))
}