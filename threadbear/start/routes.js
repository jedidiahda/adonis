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

Route.get("/", ({ view }) => {
    return view.render("page/home")
})

Route.get("/register", ({ view }) => {
    return view.render("user.register")
})

Route.get("/login", ({ view }) => {
    // show login form
    return view.render("user/login")
})

Route.post("/register", ({ request }) => {
    // ...create new customer profile
    return JSON.stringify(request.all())
})

Route.put("/logout", () => {
    // expire current customer session
    return "PUT /logout"
})

Route.get("/register", () => {
    // show registration form
    return "GET /register"
})

Route.post("/register", () => {
    // create new customer profile
    return "POST /register"
})

Route.get("/forgot-password", () => {
    // show forgot password form
    return "GET /forgot-password"
})

Route.post("/forgot-password", () => {
    // create new password reset token and send e-mail
    return "POST /forgot-password"
})

//Reset Password
Route.get(
    "/reset-password/:token",
    ({ params }) => {
        // show forgot password form
        return "GET /reset-password " + params.token
    },
)
Route.post(
    "/reset-password/:token",
    ({ params }) => {
        // create new password reset token and send e-mail
        return "POST /reset-password " + params.token
    },
)

Route.patch(
    "/reset-password/:token",
    ({ request, params }) => {
        // create new password reset token and send e-mail
        return JSON.stringify(request.all())
    },
)

//** Customer */

Route.get("/:customer", ({ view, params }) =>
    view.render("user/profile", {
        name: params.customer,
    }),
)

Route.put("/:customer", ({ params }) => {
    // update customer profile
    return "PUT /:customer " + params.customer
})
Route.delete("/:customer", ({ params }) => {
    // delete customer profile
    return "DELETE /:customer " + params.customer
})
Route.get("/:customer/products", ({ params }) => {
    // show customer's products
    return (
        "GET /:customer/products " + params.customer
    )
})

Route.post(
    "/:customer/products",
    ({ params }) => {
        // create a new product
        return (
            "POST /:customer/products " +
            params.customer
        )
    },
)

Route.get("/:customer/:product", ({ params }) => {
    // show customer profile
    return (
        "GET /:customer/:product " +
        params.customer +
        " " +
        params.product
    )
})
Route.put("/:customer/:product", ({ params }) => {
    // update customer profile
    return (
        "PUT /:customer/:product " +
        params.customer +
        " " +
        params.product
    )
})

Route.delete(
    "/:customer/:product",
    ({ params }) => {
        // delete customer profile
        return (
            "DELETE /:customer/:product " +
            params.customer +
            " " +
            params.product
        )
    },
)
