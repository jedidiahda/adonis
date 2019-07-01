'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RedirectsSchema extends Schema {
  up () {
    this.create('redirects', (table) => {
      table.increments()
      table.string("from")
      table.string("to")
      table.timestamps()
    })
  }

  down () {
    this.drop('redirects')
  }
}

module.exports = RedirectsSchema
