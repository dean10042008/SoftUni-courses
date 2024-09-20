function solve() {
    document.querySelector("#btnSend").addEventListener("click", onClick);

    function onClick() {
        const bestRestaurantEl = document.querySelector("#bestRestaurant p");
        const workersEl = document.querySelector("#workers p");

        const input = JSON.parse(document.querySelector("#inputs textarea").value);
        
        let result = {};

        for (const restaurant of input) {
            const [restaurantName, rest] = restaurant.split(" - ");
            const workerDetails = rest.split(", ");

            if (!result[restaurantName]) {
                result[restaurantName] = {
                    highestSalary: 0,
                    totalSalary: 0,
                    workers: [],
                };
            }

            let workers = [];

            for (const detail of workerDetails) {
                const [name, salary] = detail.split(" ");
                const salaryNum = Number(salary);

                workers.push({ name, salary: salaryNum });
                result[restaurantName].totalSalary += salaryNum;

                if (salaryNum > result[restaurantName].highestSalary) {
                    result[restaurantName].highestSalary = salaryNum;
                }
            }

            result[restaurantName].workers.push(...workers);
        }

        const arrToSort = Object.entries(result).map(([name, data]) => ({
            name,
            averageSalary: data.totalSalary / data.workers.length,
            highestSalary: data.highestSalary,
            workers: data.workers,
        }));

        arrToSort.sort((a, b) => b.averageSalary - a.averageSalary);

        const bestRestaurant = arrToSort[0];
        bestRestaurantEl.textContent = `Name: ${bestRestaurant.name} Average Salary: ${bestRestaurant.averageSalary.toFixed(2)} Best Salary: ${bestRestaurant.highestSalary.toFixed(2)}`;

        const sortedWorkers = bestRestaurant.workers.sort((a, b) => b.salary - a.salary);
        const workersText = sortedWorkers.map(worker => `Name: ${worker.name} With Salary: ${worker.salary}`).join(' ');

        workersEl.textContent = workersText;
    }
}