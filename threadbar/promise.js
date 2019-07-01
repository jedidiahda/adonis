const delay = (shouldResolve, having, after = 1000) => {
    return new Promise( (resolve, reject) => {
        if (shouldResolve){
            setTimeout(() => resolve(having), after)
        }else{
            setTimeout(() => reject(having), after)
        }
    })
}

// delay(true, 'some data').then(data => {
//     console.log('resolved with ' + data)
// })

// delay(false, 'a reason').catch(reason => {
//     console.log('rejected with ' + reason)
// })

// const run = async () => {
//     const data = await delay(true, 'some data')
//     console.log('resolved with ' + data)
//     try{
//         await delay(false, 'a reason')
//     }catch(reason){
//         console.log('rejected with ' + reason)
//     }
// }

// run()

const fs = require('fs')
// fs.readFile('.gitignore', (error, data) => {
//     if(error){
//         throw error
//     }
//     console.log(data.toString())
// })

const readFile = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        })
    })
}

//readFile('.gitignore').then(data => console.log(data.toString()))

// const run = async () => {
//     const data = await readFile('.gitignore')
//     console.log(data.toString())
//     console.log('stop')
// }

//run()

const promisify = require('promisify-node')
const fss = promisify('fs')

const run = async () => {
    // const data = await fss.readFile('.gitignore')
    // console.log(data.toString())

    try{
        const [gitignore, env] = await Promise.all([
            fss.readFile('.gitignore'),
            fss.readFile('.env.example')
        ])
        console.log(
            gitignore.toString(),
            env.toString()
        )
    }catch(e){

    }
}

run()