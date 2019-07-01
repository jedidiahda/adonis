'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const geoip = use('geoip-lite')
const {
  getCountry,
  getCountryByAbbreviation,
  getCurrency
} = use('currency-map-country')

class CurrencySelector {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    const ip = request.ip()
    const reference = geoip.lookup('207.97.227.239')
    let currency
    if(!reference){
      request.country = 'Unknown'
      request.currency = 'US'
      currency = getCurrency('USD')
    }else{
      request.country = reference.country
      const name = getCountryByAbbreviation(request.country)
      const country = getCountry(name)
      request.currency = country.currency 
      currency = getCurrency(country.cur)
    }
    request.currencyFormat = currency.symbolFormat
    // call next to advance the request
    await next()
  }
}

module.exports = CurrencySelector
