function cinemaTickets(input) {
    let standardTickets = 0;
    let studentTickets = 0;
    let kidTickets = 0;

    let i = 0;
    let command = input[i];
    i++;

    let seatsTaken = 0;

    while (command !== "Finish") {
        let movieName = command;
        let totalSeats = Number(input[i]);
        i++;

        let command1 = input[i];
        i++;

        seatsTaken = 0;

        while (command1 !== "End") {
            let ticketType = command1;
            seatsTaken++;

            if (ticketType === "standard") {
                standardTickets++;
            }
            else if (ticketType === "student") {
                studentTickets++;
            }
            else if (ticketType === "kid") {
                kidTickets++;
            }

            if (seatsTaken === totalSeats) {
                break;
            }

            command1 = input[i];
            i++;
        }

        console.log(`${movieName} - ${((seatsTaken / totalSeats) * 100).toFixed(2)}% full.`);

        command = input[i];
        i++;
    }

    let totalTickets = standardTickets + kidTickets + studentTickets;
    console.log(`Total tickets: ${totalTickets}`);
    console.log(`${((studentTickets / totalTickets) * 100).toFixed(2)}% student tickets.`);
    console.log(`${((standardTickets / totalTickets) * 100).toFixed(2)}% standard tickets.`);
    console.log(`${((kidTickets / totalTickets) * 100).toFixed(2)}% kids tickets.`);
}

cinemaTickets(["Taxi", "10", "standard", "kid", "student", "student", "standard", "standard", "End", "Scary Movie", "6", "student", "student", "student", "student", "student", "student", "Finish"]);