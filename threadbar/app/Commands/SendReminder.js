'use strict'

const { Command } = require('@adonisjs/ace')

//SendReminder extends the built-in Command class. Command does most of the heavy
//lifting, but it does require a few properties/getters to be defined:

class SendReminder extends Command {
  //signature is the name by which the command will be called, but also the arguments
  //and extra parameters the command accepts.
  static get signature () {
    return 'send:reminder'
  }
  //description is useful when we run ./ace --help. It shows what the command does
  //and describes what the arguments and parameters are for.
  static get description () {
    return 'Tell something helpful about this command'
  }
  //handle is where we put all the code this command needs to use. We’re going to use it
  //to send reminder e-mails to our customers, but for now it can log text to the console.
  async handle (args, options) {
    this.info('Dummy implementation for send:reminder command')
  }
}

module.exports = SendReminder
