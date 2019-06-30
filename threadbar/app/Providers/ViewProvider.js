'use strict'

const {
    ServiceProvider,
} = require('@adonisjs/fold')

class ViewProvider extends ServiceProvider{
    boot() {
        const View = this.app.use('Adonis/Src/View')
        View.global('toTitleCase', string =>
            string.replace(/^(.)|\s+(.)/g, match => match.toUpperCase()))
    }
}

module.exports = ViewProvider