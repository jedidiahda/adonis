'use strict'

//import { runInThisContext } from 'vm';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const parser = use('js2xmlparser')
const Response = use('Adonis/Src/Response')
const Database = use('Database')

const redirects = {
    assertchris: 'christoper',
    theetutlage: 'harminder'
}

// Response.macro('xml', function(data, root = 'root'){
//     this.type('application/xml')
//     this.send(parser.parse(root, data))
// })

//Route.on('/').render('welcome')

Route.get('/', async ({view}) => {
    const result = await Database.raw('Select current_time as time')
    console.log('success connection ' + result[0].time)
    return view.render('page/home')
})

Route.get('/', ({ view }) => {
    return view.render('page/home')
})

Route.get('/login','CustomerController.showLogin')
Route.post('/login','CustomerController.doLogin')
Route.put('/logout', 'CustomerController.logout')
Route.get('/register', 'CustomerController.showRegister')
Route.post('/register','CustomerController.doRegister')
// Route.post('/register', ({ request, response }) => {
//     //return JSON.stringify(request.all())
//     response.safeHeader(
//         'content-type',
//         'application/json'
//     )

//     response.send(JSON.stringify(request.all()))
// })

Route.get('/forgot-password','CustomerController.showForgotPassword')
Route.post('/forgot-password','CustomerController.doForgotPassword')
Route.get('/reset-password/:token','CustomerController.showResetPassword')
Route.patch('/reset-password/:token','CustomerController.doResetPassword')
Route.get('/:customer', 'CustomerController.showProfile').as('profile')
// Route.get('/:customer', ({ response, view, params }) => {
//     // view.render('user/profile', {
//     //     name: params.customer,
//     // })
//     //JSON.stringify(Object.keys(response))
//     const redirect = redirects[params.customer]
//     if (redirect) {
//         return response.route('profile', {
//             customer: redirect
//         })
//     }
//     response.send(
//         view.render('user/profile', {
//             name: params.customer
//         })
//     )
// }).as('profile')

Route.put('/:customer', 'CustomerController.updateProfile')
Route.delete('/:customer','CustomerController.deleteProfile')

Route.get('/:customer/products', ({ params, response }) => {
    const products = [
        { price: 4.1, title: "coca colar" },
    ]

    return response.for(params, {
        xml: () => [
            {
                product: products.map(product => ({
                    "@": { price: product.price },
                    "#": product.title,
                })),
            },
            "products",
        ],
        json: () => [
            {
                products,
            },
        ],
        default: () => "...render normal view",
    })
}).formats(['xml', 'json'])

Route.post('/:customer/products', ({ params }) => {
    return ('POST /:customer/products ' + params.customer)
}
)

Route.get('/:customer/:product', ({ params }) => {
    return (
        'GET /:customer/:product ' + params.customer + ' ' + params.product
    )
})

Route.put('/:customer/:product', ({ params }) => {
    retunr('PUT /:customer/:product ' + params.customer + ' ' + params.product)
})

Route.delete('/:customer/:product', ({ params }) => {
    return ('DELETE /:customer/:product ' + params.customer + ' ' + params.product)
})

Response.macro('for', function (params, handlers) {
    if (params.format === '.xml') {
        const handler = handlers.xml
        const data = handler()

        return this.xml(...data)
    }

    if (params.format === '.json') {
        const handler = handlers.json
        const data = handler()
        return this.json(...data)
    }

    return (handlers.default || function () { })()
})

Route.get('/add-redirects', async () => {
    console.log('hi')
    const created_at = Database.raw('current_timestamp()')
    await Database.insert({
        from: 'assertchris',
        to: 'christopher',
        created_at,
    }).into('redirects')
    await Database.insert({
        from: 'thetutlage',
        to: 'harminder',
        created_at
    }).into('redirects')
    return 'done'
})