'use strict'

// remember to add these to the top of file
const Mail = use('Mail')
const { validate } = use('Validator')
const Comment = use('App/Models/Comment')


class CommentController {
    /**
    * Persist comment and mail user
    */
    async postComment({request, response, view, session, auth}) {
        // Get the currently authenticated user
        const user = request.currentUser

        // validate form input
        const validation = await validate(request.all(), {
            comment: 'required'
        })

        // show error messages upon validation fail
        if (validation.fails()) {
            await session.withErrors(validation.messages() )
                .flashAll()

            return response.redirect('back')
        }

        // persist comment to database
        const comment = await Comment.create({
            ticket_id: request.input('ticket_id'),
            user_id: auth.user.id,
            comment: request.input('comment'),
        })

        // Get the ticket the comment was made on
        const commentTicket = await comment.ticket().fetch()
        // Get the user that created the ticket that was just commentted on
        const commentUser = await commentTicket.user().fetch()
console.log(commentUser)
        // send mail if the user commenting is not the ticket owner
        if (commentUser.id != auth.user.id) {
            await Mail.send('emails.ticket_comments', { commentUser, user : auth.user , commentTicket, comment }, (message) => {
                message.to(commentUser.email, commentUser.username)
                message.from('support@adonissupport.dev')
                message.subject(`RE: ${commentTicket.title} (Ticket ID: ${commentTicket.ticket_id})`)
            })
        }

        await session.flash({ status: 'Your comment has been submitted.' })
        return response.redirect('back')
    }
}

module.exports = CommentController
