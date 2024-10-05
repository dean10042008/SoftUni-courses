class Company {
    constructor() {
        this.departments = {};
    }

    addEmployee(name, salary, position, department) {
        if (name === undefined || name === null || name === "") {
            throw new Error("Invalid input!");
        }
        if (salary === undefined || salary === null || salary === "") {
            throw new Error("Invalid input!");
        }
        if (position === undefined || position === null || position === "") {
            throw new Error("Invalid input!");
        }
        if (department === undefined || department === null || department === "") {
            throw new Error("Invalid input!");
        }
        if (Number(salary) < 0) {
            throw new Error("Invalid input!");
        }

        if (!this.departments[department]) {
            this.departments[department] = {
                totalSalary: 0,
                workers: [],
            };
        }

        let workers = [];

        workers.push({ name, salary, position });
        this.departments[department].totalSalary += salary;

        this.departments[department].workers.push(...workers);

        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }

    bestDepartment() {
        const departmentsArr = Object.entries(this.departments).sort((a, b) => {
            return (b[1].totalSalary / b[1].workers.length) - (a[1].totalSalary / a[1].workers.length);
        });

        let output = [];

        output.push(`Best Department is: ${departmentsArr[0][0]}`);
        output.push(`Average salary: ${(departmentsArr[0][1].totalSalary / departmentsArr[0][1].workers.length).toFixed(2)}`);

        const sortedWorkers = departmentsArr[0][1].workers.sort((a, b) => {
            return b.salary - a.salary || a.name.localeCompare(b.name);
        });

        for (const workerObj of sortedWorkers) {
            output.push(`${workerObj.name} ${workerObj.salary} ${workerObj.position}`);
        }

        return output.join('\n');
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());