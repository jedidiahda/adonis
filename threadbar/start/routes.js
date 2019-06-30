'use strict'

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

//Route.on('/').render('welcome')

Route.get('/', ({view}) => {
    return view.render('page/home')
})

Route.get('/login', ({view}) => {
    //show login form
    return view.render('user/login')
})

Route.post('/login', () => {
    return 'POST /login'
})

Route.put('/logout', () => {
    return 'PUT /logout'
})

Route.get('/register', ({view}) => view.render('user/register'))

Route.post('/register', () => {
    return JSON.stringify(request.all())
})

Route.get('/forgot-password', () => {
    return 'GET /forgot-password'
})

Route.post('/forgot-password', () => {
    return 'POST /forgot-password'
})

Route.get(
    '/reset-password/:token',
    ({params}) => {
        return 'GET /reset-password ' + params.token
    }
)

Route.post('/reset-password/:token', ({params}) => {
        return 'POST /reset-password ' + params.token
    }
)

Route.get('/:customer', ({ view, params}) => 
    view.render('user/profile', {
        name: params.customer,
    })
)

Route.put('/:customer', ({params}) => {
    return 'PUT /:customer ' + params.customer
})

Route.delete('/:customer', ({params}) => {
    return 'DELETE /:customer ' + params.customer
})

Route.get('/:customer/products', ({params}) => {
    return (
        'GEt /:customer/products ' + params.customer
    )
})

Route.post('/:customer/products', ({params}) => {
        return ('POST /:customer/products ' + params.customer)
    }
)

Route.get('/:customer/:product', ({params}) => {
    return (
        'GET /:customer/:product ' + params.customer + ' ' + params.product
    )
})

Route.put('/:customer/:product', ({params}) => {
    retunr ('PUT /:customer/:product ' + params.customer + ' ' + params.product)
})

Route.delete('/:customer/:product', ({params}) => {
    return ('DELETE /:customer/:product ' + params.customer + ' ' + params.product)
})