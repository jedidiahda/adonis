'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')


class AuthController {
    
    /**
     * show register page
     */
    showRegisterPage({view, request, response}){
        return view.render('auth/register')
    }
    
    /**
     * Handle user registration
     */
    async register({request, response, session, view}){
        //validate form input
        //const validation = await validator.validateAll(request.all(), User.rules)

        const validation = await validate(request.all(), User.rules)
        console.log(validation)
        //show error messages upon validation fail
        if(validation.fails()){
            console.log('fail')
            session.withErrors(validation.messages()).flashExcept(['password'])
            // await request
            //     .withAll()
            //     .andWith({ errors: validation.messages() })
            //     .flash()

            //return validation.messages()
            return response.redirect('back')
        }
            //persist to database
            const user = await User.create({
                username: request.input('username'),
                email: request.input('email'),
                password: request.input('password')
            })

            //login the user
            await request.auth.login(user)
            console.log('pass')
            //redirect to homepage
            response.redirect('/')
    }

    /**
     * show login page
     */
    showLoginPage({ view, request, response }){
        return view.render('auth/login')
    }

    /**
     * Handle user authentication
     */
    async login({ auth, request, response, session}){
        const email = request.input('email')
        const password = request.input('password')

        try{
            await auth.attempt(email, password)
            console.log(result)
            //session.withErrors({ error: 'Invalid credentials'}).flashAll()
            response.redirect('/')
        }catch(e){
            //await session.withErrors({ error: 'Invalid credentials'}).flash()
            session.withErrors({ error: 'Invalid credentials'}).flashAll()
            //redirect back with error
            response.redirect('back')
        }

 
    }

    /**
     * Logout authenticated user
     */
    async logout({ auth, request, response }) {
        // logouts the user
        await auth.logout()

        // redirect to login page
        response.redirect('/login')
    }

}

module.exports = AuthController
