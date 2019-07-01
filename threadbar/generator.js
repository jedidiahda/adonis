'use strict'
const fetch = require('node-fetch')
const requests = function(urls){
    let index = 0
    return {
        next: function(){
            if(index < urls.length){
                return {
                    value: fetch(urls[index++]),
                    done: false,
                }
            }
            return {
                done: true
            }
        }
    }
}

const urls = [
    'https://adonisjs.com',
    'https://www.facebook.com/'
]

const iterator = requests(urls)
iterator.next().value
iterator.next().value
iterator.next().done

class Requests{
    constructor(urls){
        this.urls = urls
        this[Symbol.iterator] = () => new RemotesIterator(this)
    }
}

class RequestsIterator{
    constructor(remotes){
        this.remotes = remotes
        this.index = 0
    }
    next(){
        if (this.index < this.remotes.urls.length){
            return {
                value: fetch(this.remotes.urls[this.index++]),
                done: false
            }
        }
        return {
            done: true,
        }
    }
}

const iterableRequests = new Requests(urls)
for(let request of iterableRequests){

}

const generateRequests = function*(urls){
    for(let url of urls){
        yield fetch(url)
    }
}

const generatedRequests = generateRequests(urls)
for(let request of generatedRequests){

}

class Remotes {
    constructor(urls){
        this.urls = urls
        this[Symbol.iterator] = function*(){
            for (let url of this.urls){
                yield fetch(url)
            }
        }
    }
}

const remotes = new Remotes(urls)
for(let request of remotes){
    console.log(request)
}