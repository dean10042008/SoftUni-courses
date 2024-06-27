function employees(arr) {
    class Worker {
        constructor(worker) {
            this.worker = worker;
            this.length = worker.length;
        }
    }

    for (const arrElement of arr) {
        let employee = new Worker(arrElement);
        let nameElement = employee.worker;
        let nameLength = employee.length;
        console.log(`Name: ${nameElement} -- Personal Number: ${nameLength}`);
    }
}

employees(['Silas Butler', 'Adnaan Buckley', 'Juan Peterson', 'Brendan Villarreal']);