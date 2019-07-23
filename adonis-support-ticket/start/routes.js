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

Route.on('/').render('home')
Route.get('register', 'AuthController.showRegisterPage')
Route.post('register', 'AuthController.register')
Route.get('login', 'AuthController.showLoginPage')
Route.post('login', 'AuthController.login')
Route.get('logout', 'AuthController.logout')
Route.get('new_ticket', 'TicketController.create').middleware('auth')
Route.post('new_ticket', 'TicketController.store').middleware('auth')
Route.get('my_tickets', 'TicketController.userTickets').middleware('auth')
Route.get('ticket/:ticket_id', 'TicketController.show').middleware('auth')
Route.post('comment', 'CommentController.postComment')
Route.get('tickets', 'TicketController.index').middleware('auth')
Route.group('admin',() => {
    Route.get('tickets', 'TicketController.index');
    Route.post('close_ticket/:ticket_id', 'TicketController.close');
}).prefix('admin').middleware(['auth','admin'])

