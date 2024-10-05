function tickets(arr, sortingMethod) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        };
    }

    let result = [];

    for (const element of arr) {
        const [destination, price, status] = element.split("|");
        const ticket = new Ticket(destination, Number(price), status);
        result.push(ticket);
    }

    let sorted = [];

    if (sortingMethod === "destination") {
        sorted = result.sort((a, b) => a.destination.localeCompare(b.destination));
    }
    else if (sortingMethod === "price") {
        sorted = result.sort((a, b) => a.price - b.price);
    }
    else if (sortingMethod === "status") {
        sorted = result.sort((a, b) => a.status.localeCompare(b.status));
    }

    // Should be returned, but I like to keep the console.log() instead.
    console.log(sorted);
}

tickets(['Philadelphia|94.20|available', 'New York City|95.99|available', 'New York City|95.99|sold', 'Boston|126.20|departed'], 'destination');