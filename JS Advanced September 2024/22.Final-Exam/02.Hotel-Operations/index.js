class Hotel {
    constructor(initialBudget) {
        this.initialBudget = initialBudget;
        this.roomAvailability = {};
        this.supplyStock = {};
    }

    restockSupplies(supplies) {
        let result = [];

        for (const supply of supplies) {
            const [supplyName, supplyQuantity, supplyTotalPrice] = supply.split(" ");

            if (this.initialBudget >= Number(supplyTotalPrice)) {
                this.initialBudget -= Number(supplyTotalPrice);
                if (this.supplyStock.hasOwnProperty(supplyName)) {
                    this.supplyStock[supplyName] += Number(supplyQuantity);
                }
                else {
                    this.supplyStock[supplyName] = Number(supplyQuantity);
                }

                result.push(`Successfully stocked ${supplyQuantity} ${supplyName}`);
            }
            else {
                result.push(`There was not enough money to restock ${supplyQuantity} ${supplyName}`);
            }
        }

        return result.join("\n").trim();
    }

    addRoomType(roomType, neededSupplies, pricePerNight) {
        if (this.roomAvailability.hasOwnProperty(roomType)) {
            return `The ${roomType} is already available in our hotel, try something different.`;
        }
        else {
            this.roomAvailability[roomType] = {
                roomType: roomType,
                neededSupplies: neededSupplies,
                pricePerNight: pricePerNight,
            }

            return `Great idea! Now with the ${roomType}, we have ${Object.entries(this.roomAvailability).length} types of rooms available, any other ideas?`;
        }
    }

    showAvailableRooms() {
        if (!Object.entries(this.roomAvailability).length) {
            return "Our rooms are not ready yet, please come back later...";
        }

        let result = [];

        for (const key in this.roomAvailability) {
            result.push(`${this.roomAvailability[key].roomType} - $ ${this.roomAvailability[key].pricePerNight}`);
        }

        return result.join("\n").trim();
    }

    bookRoom(roomType) {
        if (!(this.roomAvailability.hasOwnProperty(roomType))) {
            return `There is no ${roomType} available, would you like to book another room?`;
        } else {
            const needs = this.roomAvailability[roomType].neededSupplies;
            let hasAllNeeds = true;
    
            for (const need of needs) {
                const [supply, quantity] = need.split(" ");
    
                if (!(this.supplyStock.hasOwnProperty(supply)) || this.supplyStock[supply] < Number(quantity)) {
                    hasAllNeeds = false;
                    break;
                }
            }
    
            if (hasAllNeeds) {
                for (const need of needs) {
                    const [supply, quantity] = need.split(" ");
                    this.supplyStock[supply] -= Number(quantity);
                }
    
                return `Your booking for ${roomType} has been confirmed! The price is $${this.roomAvailability[roomType].pricePerNight} per night.`;
            } else {
                return `We are currently unable to accommodate your request for ${roomType}, sorry for the inconvenience.`;
            }
        }
    }
}

let hotel = new Hotel(500);
console.log(hotel.restockSupplies(["Soap 100 50", "Towels 20 100", "Shampoo 50 75"]));