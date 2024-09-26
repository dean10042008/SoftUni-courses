function filterEmployees(employeesAsJSON, filter) {
    function printEmployees(employeesList) {
        employeesList.map((employee, index) => {
            console.log(`${index}. ${employee.first_name} ${employee.last_name} - ${employee.email}`);
        })
    }

    const employees = JSON.parse(employeesAsJSON);

    if (filter === "all") {
        printEmployees(employees);
    }
    else {
        const [key, value] = filter.split("-");

        const filteredEmployees = employees.filter((employee) => {
            return employee[key] === value;
        });

        printEmployees(filteredEmployees);
    }
}

filterEmployees(`[{ "id": "1", "first_name": "Ardine", "last_name": "Bassam", "email": "abassam0@cnn.com", "gender": "Female"}, {  "id": "2",  "first_name": "Kizzee",  "last_name": "Jost",  "email": "kjost1@forbes.com",  "gender": "Female"},{ "id": "3", "first_name": "Evanne", "last_name": "Maldin", "email": "emaldin2@hostgator.com", "gender": "Male" } ]`, 'gender-Female', 'gender-Female');