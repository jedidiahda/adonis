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
    async create({ view, request, response, auth }) {
        const categories = await Category.pair('id', 'name')
        //console.log(auth.user)
        const user = auth.user

   

          await Mail.raw('plain text email', (message) => {
            message.from('jedidiahda@hotmail.com')
            message.to('y_uguest@yahoo.co.uk')
          })

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

        // const ticket = await Ticket.create({
        //     title: request.input('title'),
        //     user_id: user.id,
        //     ticket_id: RandomString.generate({ length: 10, capitalization: 'uppercase'}),
        //     category_id: request.input('category'),
        //     priority: request.input('priority'),
        //     message: request.input('message'),
        //     status: 'open',
        // })

        const ticket = {
            title: request.input('title'),
            user_id: user.id,
            ticket_id: RandomString.generate({ length: 10, capitalization: 'uppercase'}),
            category_id: request.input('category'),
            priority: request.input('priority'),
            message: request.input('message'),
            status: 'open',
        }



          

        // await Mail.send('emails.ticket_info', {}, (message) => {
        //     message.to(user.email, user.username)
        //     message.from('jedidiahda@gmail.com')
        //     message.subject(`[Ticket ID: ${ticket.ticket_id}] ${ticket.title}`)
        // })
        await request.with({ status: `A ticket with ID: #${ticket.ticket_id} has been opened.`}).falsh()
        response.redirect('back')
    }



}

module.exports = TicketController
