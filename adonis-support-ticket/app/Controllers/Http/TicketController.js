'use strict'
// remember to add these to the top of file

const Mail = use('Mail')
const { validate } = use('Validator')
const Ticket = use('App/Models/Ticket')
const RandomString = use('randomstring')
const Category = use('App/Models/Category')

class TicketController {

    /**
     * Show the form for opening a new ticket.
     */
    async create({ view, request, response }) {
        const categories = await Category.pair('id', 'name')
        return view.render('tickets.create', {categories: categories})
    }

    async store({ request, response, session, auth }){
        const user = auth.user
        const validation = await validate(request.all(), {
            title: 'required',
            category: 'required',
            priority: 'required',
            message: 'required'
        })
        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const ticket = await Ticket.create({
            title: request.input('title'),
            user_id: user.id,
            ticket_id: RandomString.generate({ length: 10, capitalization: 'uppercase'}),
            category_id: request.input('category'),
            priority: request.input('priority'),
            message: request.input('message'),
            status: 'open',
        })

        // const ticket = {
        //     title: request.input('title'),
        //     user_id: user.id,
        //     ticket_id: RandomString.generate({ length: 10, capitalization: 'uppercase'}),
        //     category_id: request.input('category'),
        //     priority: request.input('priority'),
        //     message: request.input('message'),
        //     status: 'open',
        // }

        // await Mail.send('emails.ticket_info', {}, (message) => {
        //     message.to(user.email, user.username)
        //     message.from('jedidiahda@gmail.com')
        //     message.subject(`[Ticket ID: ${ticket.ticket_id}] ${ticket.title}`)
        // })
        await session.flash({ status: `A ticket with ID: #${ticket.ticket_id} has been opened.`})
        return response.redirect('back')
    }

    /**
    * Display all tickets by a user.
    */
    async userTickets({ request, response, auth,view }) {
        // Get all the tickets created by the currently authenticated user
        //console.log(auth)
        const tickets = await Ticket.query().where('user_id', auth.user.id).fetch()
        // Get all categories
        const categories = await Category.all()


        return view.render('tickets.user_tickets', { tickets: tickets.toJSON(), categories: categories.toJSON() })
    }

    /**
    * Display a specified ticket.
    */
    async show({ request, response, view, params }) {
        // Get the ticket with the user that created it
        const ticket = await Ticket.query()
                                .where('ticket_id', params.ticket_id)
                                .with('user')
                                .firstOrFail()
        // Get the ticket category
        const comments = await ticket.comments().with('user').fetch()
        const category = await ticket.category().fetch()

        return view.render('tickets.show', {
            ticket: ticket.toJSON(),
            comments: comments.toJSON(),
            category: category.toJSON()
        })
    }

    /**
    * Display all tickets.
    */
    async index({ request, response, view }) {
        // Get all tickets
        const tickets = await Ticket.all()
        // Get all categories
        const categories = await Category.all()

        return view.render('tickets.index', {
            tickets: tickets.toJSON(),
            categories: categories.toJSON()
        })
    }

    /**
    * Close the specified ticket.
    */
    async close({request, response, session, params}) {
        // Get the ticket with the specified ticket_id
        const ticket = await Ticket.query()
                                .where('ticket_id', params.ticket_id)
                                .firstOrFail()
        // Change the ticket status to closed
        ticket.status = 'Closed'
        // Persist to database
        await ticket.save()

        // Get the user that created the ticket
        const ticketOwner = await ticket.user().fetch()

        // send email
        // await Mail.send('emails.ticket_status', { ticketOwner, ticket }, (message) => {
        //     message.to(ticketOwner.email, ticketOwner.username)
        //     message.from('support@adonissupport.dev')
        //     message.subject(`RE: ${ticket.title} (Ticket ID: ${ticket.ticket_id})`)
        // })

        await session.flash({ status: 'The ticket has been closed.' })
        return response.redirect('back')
    }
}

module.exports = TicketController
