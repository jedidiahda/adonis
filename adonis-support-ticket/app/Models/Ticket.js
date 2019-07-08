'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ticket extends Model {
    /**
     * A ticket belongs to a category
     */
    category() {
        return this.belongsTo('App/Model/Category')
    }
}

module.exports = Ticket
