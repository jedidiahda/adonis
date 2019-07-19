'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
// remember to add these to the top of file
const Database = use('Database')

class DatabaseSeeder {
  async run() {

    await Database.table('categories').insert([
      {
        name: 'Technical',
        created_at: '2017-03-07 00:00:00',
        updated_at: '2017-03-07 00:00:00'
      },
      {
        name: 'Sales',
        created_at: '2017-03-07 00:00:00',
        updated_at: '2017-03-07 00:00:00'
      }
    ])
  }
}

module.exports = DatabaseSeeder
