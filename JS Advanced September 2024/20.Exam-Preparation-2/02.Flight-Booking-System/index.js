class FlightBookingSystem {
    constructor(agencyName) {
        this.agencyName = agencyName;
        this.flights = [];
        this.bookings = [];
        this.bookingsCount = 0;
    }

    addFlight(flightNumber, destination, departureTime, price) {
        if (this.flights[flightNumber]) {
            return `Flight ${flightNumber} to ${destination} is already available.`;
        }
        else {
            const flight = { flightNumber, destination, departureTime, price };
            this.flights[flightNumber] = flight;
            return `Flight ${flightNumber} to ${destination} has been added to the system.`;
        }
    }

    bookFlight(passengerName, flightNumber) {
        if (! this.flights[flightNumber]) {
            return `Flight ${flightNumber} is not available for booking.`;
        }
        else {
            this.bookingsCount++;
            this.bookings.push([passengerName, flightNumber]);

            return `Booking for passenger ${passengerName} on flight ${flightNumber} is confirmed.`;
        }
    }

    cancelBooking(passengerName, flightNumber) {
        const indexOfPassenger = this.bookings.indexOf(this.bookings.find(booking => booking[0] === passengerName));

        if (indexOfPassenger !== -1) {
            this.bookings.splice(indexOfPassenger, 1);
            this.bookingsCount--;

            return `Booking for passenger ${passengerName} on flight ${flightNumber} is cancelled.`;
        }
        else {
            throw new Error(`Booking for passenger ${passengerName} on flight ${flightNumber} not found.`);
        }
    }

    showBookings(criteria) {
        let result = "";

        if (! this.bookings.length) {
            throw new Error(`No bookings have been made yet.`);
        }
        
        if (criteria === "all") {
            result += `All bookings(${this.bookingsCount}):` + "\n";

            for (const booking of this.bookings) {
                result += `${booking[0]} booked for flight ${booking[1]}.` + "\n";
            }
        }
        else if (criteria === "cheap") {
            const cheapFlights = this.bookings.filter(booking => this.flights[booking[1]].price <= 100);
            
            if (! cheapFlights.length) {
                return "No cheap bookings found.";
            }
            else {
                result += "Cheap bookings:" + "\n";

                cheapFlights.forEach(flight => {
                    result += `${flight[0]} booked for flight ${flight[1]}.` + "\n";
                });
            }
        }
        else if (criteria === "expensive") {
            const expensiveFlights = this.bookings.filter(booking => this.flights[booking[1]].price > 100);
            
            if (! expensiveFlights.length) {
                return "No expensive bookings found.";
            }
            else {
                result += "Expensive bookings:" + "\n";

                expensiveFlights.forEach(flight => {
                    result += `${flight[0]} booked for flight ${flight[1]}.` + "\n";
                });
            }
        }

        return result.trim();
    }
}

const system = new FlightBookingSystem("TravelWorld");
console.log(system.addFlight("AA101", "Los Angeles", "09:00 AM", 250));
console.log(system.addFlight("BB202", "New York", "10:30 AM", 180));
console.log(system.addFlight("CC303", "Chicago", "11:45 AM", 120));
console.log(system.addFlight("AA101", "Los Angeles", "09:00 AM", 250));