'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Admin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth }, next) {
    // Redirect to homepage if the currently authenticated user is not an admin
    if (auth.user.is_admin !== 1) {
        response.redirect('/');
    } 

    await next()
  }
}

module.exports = Admin
