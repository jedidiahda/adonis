'use strict'

const redirects = {
    assertchris: 'christopher',
    thetutlage: 'harminder'
}

const Controller = use(
    'App/Controllers/Http/Controller'
)

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
    showProfile({ params, response, view }){
        const redirect = redirects[params.customer]
        if(redirect){
            return response.route('profile', {
                customer: redirect
            })
        }
        response.send(
            view.render('customer/profile',{
                name: params.customer
            })
        )
    }
    updateProfile({ params }){
        return 'PUT /:customer ' + params.customer
    }
    deleteProfile({ params }){
        return 'DELETE /:customer ' + params.customer
    }
}

module.exports = CustomerController
