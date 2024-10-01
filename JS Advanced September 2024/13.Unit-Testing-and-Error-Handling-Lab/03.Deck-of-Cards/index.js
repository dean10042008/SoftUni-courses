function deckOfCards(arr) {
    let result = [];

    for (const el of arr) {
        const face = el.slice(0, el.length - 1);
        const type = el.slice(-1);

        const response = createCard(face, type);

        if (response) {
            result.push(response);
        }
        else {
            console.log(`Invalid card: ${face}${type}`);
            return;
        }
    }

    console.log(result.join(' '));

    function createCard(face, type) {
        const types = {
            "S": "\u2660",
            "H": "\u2665",
            "D": "\u2666",
            "C": "\u2663"
        }

        const faces = new Set(["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]);

        if (!faces.has(face) || !types.hasOwnProperty(type)) {
            return false;
        }

        return face + types[type];
    }
}

deckOfCards(['AS', '10D', 'KH', '2C']);