'use strict'

const Redirect = use('App/Models/Redirect')
const Product = use('App/Models/Product')
const Customer = use('App/Models/Customer')

const redirects = {
    assertchris: 'christopher',
    thetutlage: 'harminder'
}

const Controller = use(
    'App/Controllers/Http/Controller'
)
const Database = use('Database')

class CustomerController extends Controller{

    doRegister(context){
        this.showRequestParameters(context)
    }
    showLogin({ view }){
        return view.render('customer/login')
    }
    doLogin(){
        return 'POST /login'
    }
    logout(){
        return 'PUT /logout'
    }
    showRegister({ view }){
        return view.render('customer/register')
    }
    doRegister({ request, response}){
        response.json(request.all())
    }
    showForgotPassword({ view }){
        return view.render('customer/forgot-password')
    }
    doForgotPassword({ request }){
        //return JSON.stringify(request.all())
        this.showRequestParameters(context)
    }
    showResetPassword({ view, params }){
        return view.render('customer/reset-password',{
            token: params.token,            
        })
    }
    doResetPassword({ request }){
        //return JSON.stringify(request.all())
        this.showRequestParameters(context)
    }
    async showProfile({ params, response, view }){
        // const rows = await Database.select(
        //     'from',
        //     'to'
        // ).from('redirects')
        const rows = await Redirect.all()
        // const redirects = rows.reduce((accumulator, row) => {
        //     accumulator[row.from] = row.to 
        //     return accumulator
        // }, {})
        const redirects = Array.from(rows).reduce((accumulator, row) => {
            accumulator[row.from] = row.to 
            return accumulator
        }, {})


        // const redirect = redirects[params.customer]
        // if(redirect){
        //     return response.route('profile', {
        //         customer: redirect
        //     })
        // }

        // const customer = await Database.select('*')
        //             .from('customers')
        //             .where('nickname', params.customer)
        //             .first()
        const customer = await Customer.query().where('nickname', params.customer).first()
        // if(!customer){
        //     return view.render('oops', {
        //         type: 'PROFILE_MISSING'
        //     })
        // }

        // const products = await Database.select('*')
        //     .from('products')
        //     .where('customer_id', customer.id)
        //const products = await Product.query().where('customer_id', customer.id)
        const products = await customer.products()
        // return view.render('customer/profile',{
        //     customer,
        //     products
        // })
        return view.render('customer/profile',{
            customer,
            products
        })
    }
    updateProfile({ params }){
        return 'PUT /:customer ' + params.customer
    }
    deleteProfile({ params }){
        return 'DELETE /:customer ' + params.customer
    }
}

module.exports = CustomerController
