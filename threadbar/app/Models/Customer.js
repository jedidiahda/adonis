'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Customer extends Model {
    products(){
        return this.hasMany('App/Models/Product')
    }
    //As the nickname is set, it will be converted to all lowercase, thanks to the customer setter.
    setNickname(nickname){
        return nickname.toLowerCase()
    }
    //Before the model is saved to the database, the password will be hashed, thanks to the customer hook.
    static boot(){
        super.boot()
        this.addHook(
            'beforeCreate',
            async customer => {
                customer.password = await Hash.make(
                    customer.password
                )
            }
        )
    }
}

module.exports = Customer
