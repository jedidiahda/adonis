class Task{
    constructor(generator){
        this.generator = generator()
        this.complete = false
    }

    run() {
        const result = this.generator.next()
        this.complete = result.done
    }
    incomplete(){
        return !this.complete
    }
}

const task1 = new Task(function*(){
    for(let i = 0; i<5;i++){
        console.log('task 1, iteration ' + i)
        yield
    }
})

const task2 = new Task(function*(){
    for (let i = 0;i < 6; i++){
        console.log("task 2, iteration " + i)
        yield
    }
})

const task3 = new Task(function*(){
    for(let i =0;i<7;i++){
        console.log('task 3, iteration ' + 1)
        yield
    }
})

class Manager{
    constructor(){
        this.tasks = []
    }
    add(task){
        this.tasks.push(task)
    }
    run(){
        while(this.tasks.length){
            const next = this.tasks.shift()
            next.run()
            if(next.incomplete()){
                this.add(next)
            }
        }
    }
}

const manager = new Manager()
manager.add(task1)
manager.add(task2)
manager.add(task3)
manager.run()