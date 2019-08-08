'use strict'

const Redirect = use('App/Models/Redirect')
const Product = use('App/Models/Product')
const Customer = use('App/Models/Customer')
const Hash = use('Hash')

const redirects = {
    assertchris: 'christopher',
    thetutlage: 'harminder'
}

const Controller = use(
    'App/Controllers/Http/Controller'
)
const Database = use('Database')

class CustomerController extends Controller{

    // doRegister(context){
    //     this.showRequestParameters(context)
    // }
    showLogin({ view }){
        return view.render('customer/login')
    }
    async doLogin(){
        //return 'POST /login'
        const email = request.input('email')
        const password = request.input('password')
        const customer = await Customer.findByOrFail('email',email)
        const matches = await Hash.verify(password, customer.password)
        if(matches){
            return 'valid'
        }else{
            return 'invalid'
        }
    }
    logout(){
        return 'PUT /logout'
    }
    showRegister({ view }){
        return view.render('customer/register')
    }
    async doRegister({ request, response}){
        // const customer = await Customer.create(
        //     request.only([
        //         'first_name',
        //         'last_name',
        //         'email',
        //         'password',
        //         'nickname'
        //     ]),
        // )

        // const customer = new Customer()
        // customer.first_name = request.input('first_name')
        // customer.last_name = request.input('last_name')
        // customer.email = request.input('email')
        // customer.password = request.input('password')
        // customer.nickname = request.input('nickname')
        // await customer.save()
        console.log(request.all())
        response.json(request.all())
        //return 'done'
        //  return view.send('customer/reset-password')
        response.redirect('/')
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
