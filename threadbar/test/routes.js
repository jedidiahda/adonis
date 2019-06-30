const assert = require('assert')
const http = require('http')
const cheerio = require('cheerio')

const {
    request,
    shouldBeOk,
    shouldHaveMessage
} = require('./helpers')

require('dotenv').config()


describe('GET /login', () => {
    it('should have the corrrect status(200)', done => {
        shouldBeOk('GET', '/login', done)
    })

    it('should have the correct markup', done => {
        request('GET', '/login', markup => {
            const find = cheerio.load(markup)
            assert.equal(find('.btn-primary').text(), 'Log in')

            done()
        })
    })
})

// describe('POST /login', () => {
//     it('should have the correct status (200)', done => {
//         shouldBeOk('POST', '/login', done)
//     })
    
//     it('should have the correct message', done => {
//         shouldHaveMessage(
//             'POST',
//             '/login',
//             'POST /login',
//             done
//         )
//     })
// })

// describe('POST /forget-password', () => {
//     it('should have the correct status (200)', done => {
//         shouldBeOk('POST', '/forgot-password', done)
//     })
//     it('should have the correct message', done => {
//         shouldHaveMessage(
//             'POST',
//             '/forgot-password',
//             'POST /forgot-password',
//             done
//         )
//     })
// })

// describe('GET /reset-password', () => {
//     it('should have the correct status (200)', done => {
//         shouldBeOk('GET', '/reset-password/token123', done)
//     })
//     it('should have the correct message', done => {
//         shouldHaveMessage('GET', '/reset-password/token123', 'GET /reset-password token123', done)
//     })
// })

// describe('POST /reset-password', () => {
//     it('should have the correct status (200)', done => {
//         shouldBeOk(
//             'POST',
//             '/reset-password/token123',
//             done
//         )
//     })
//     it('should have the correct message', done => {
//         shouldHaveMessage('POST', '/reset-password/token123','POST /reset-password token123', done)
//     })
// })

// describe('GET /:customer', () => {
//     it('should have the correct status (200)', done => {
//         shouldBeOk('GET', '/assertchris', done)
//     })
//     it('should have the correct message', done => {
//         shouldHaveMessage('GET','/assertchris','GET /:customer assertchris', done)
//     })
// })

// // //tests omitted for brevity

// describe('DELETE /:customer/:product', () => {
//     it('should have the correct status (200)', done => {
//         shouldBeOk('DELETE', '/assertchris/teddy',done)
//     })
//     it('should have the correct message', done => {
//         shouldHaveMessage('DELETE', '/assertchris/teddy','DELETE /:customer/:product assertchris teddy', done)
//     })
// })

describe('GET /register', () => {
    it('should have the corrrect status(200)', done => {
        shouldBeOk('GET', '/register', done)
    })

    it('should have the correct markup', done => {
        request('GET', '/register', markup => {
            const find = cheerio.load(markup)
            assert.equal(find('h1').text(), 'Register')

            done()
        })
        // http.request({ 
        //         host: process.env.HOST, 
        //         port: process.env.PORT, 
        //         method: 'GET', 
        //         path: '/register'
        //     },
        //     response => {
        //         let buffer = ''
        //         response.on('data', data => {
        //             buffer += data
        //         })
        //         response.on('end', () => {
        //             callback(buffer, response)
        //         })
        //     }
        // ).end()
    })
})