function flightSchedule(arr) {
    const result = {};

    const flightsArr = arr.shift();
    for (const combination of flightsArr) {
        const tokens = combination.split(" ");
        const flightNumber = tokens.shift();
        const destination = tokens.join(" ");
        result[flightNumber] = {"Destination": destination, "Status": ""};
    }

    const statusesChanged = arr.shift();

    for (const statusCh of statusesChanged) {
        const [flightNumber, status] = statusCh.split(" ");

        if (flightNumber in result) {
            result[flightNumber].Status = status;
        }
    }

    const statusToCheck = arr.shift()[0];

    if (statusToCheck === "Ready to fly") {
        for (const resultKey in result) {
            if (result[resultKey].Status === "") {
                result[resultKey].Status = "Ready to fly";
                console.log(result[resultKey]);
            }
        }
    }
    else {
        for (const resultKey in result) {
            if (result[resultKey].Status === statusToCheck) {
                console.log(result[resultKey]);
            }
        }
    }
}

flightSchedule([['WN269 Delaware', 'FL2269 Oregon', 'WN498 Las Vegas', 'WN3145 Ohio', 'WN612 Alabama', 'WN4010 New York', 'WN1173 California', 'DL2120 Texas', 'KL5744 Illinois', 'WN678 Pennsylvania'], ['DL2120 Cancelled', 'WN612 Cancelled', 'WN1173 Cancelled', 'SK430 Cancelled'], ['Cancelled']]);