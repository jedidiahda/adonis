'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ViewProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    //
    const View = this.app.use("Adonis/Src/View")
    View.global("toTitleCase", string =>
      string.replace(/^(.)|\s+(.)/g, match =>
        match.toUpperCase(),
      ),
    )
  }
}

module.exports = ViewProvider
