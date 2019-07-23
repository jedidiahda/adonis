'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
  
  /**
   * Define validation rules
   */
  static get rules(){
    return {
      username: 'required|unique:users',
      email:'required|email|unique:users,email',
      password:'required|confirmed|min:6'
    }
  }
  /**
  * A user can have many tickets
  */
  tickets() {
    return this.hasMany('App/Models/Ticket')
  }

  /**
  * A user can have many comments
  */
  comments() {
    return this.hasMany('App/Models/Comment')
  }

}

module.exports = User
