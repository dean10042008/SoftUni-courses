function playingCards(face, type) {
    const types = {
        "S": "\u2660",
        "H": "\u2665",
        "D": "\u2666",
        "C": "\u2663"
    }

    const faces = new Set(["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]);

    if (!faces.has(face)) {
        throw new Error("Invalid face");
    }
    if (!type in types) {
        throw new Error("Invalid type");
    }

    return {
        face,
        type,

        toString() {
            return this.face + types[this.type];
        }
    }
}

playingCards('A', 'S').toString();