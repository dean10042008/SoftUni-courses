function winningTicket(str) {
    const tickets = str.split(',').map(ticket => ticket.trim());

    const validSymbols = /([@#$^])\1{5,9}/;

    for (let ticket of tickets) {
        if (ticket.length !== 20) {
            console.log('invalid ticket');
            continue;
        }

        const leftHalf = ticket.substring(0, 10);
        const rightHalf = ticket.substring(10, 20);

        const leftMatch = validSymbols.exec(leftHalf);
        const rightMatch = validSymbols.exec(rightHalf);

        if (leftMatch && rightMatch && leftMatch[0][0] === rightMatch[0][0]) {
            const length = Math.min(leftMatch[0].length, rightMatch[0].length);
            if (length === 10) {
                console.log(`ticket "${ticket}" - ${length}${leftMatch[0][0]} Jackpot!`);
            }
            else {
                console.log(`ticket "${ticket}" - ${length}${leftMatch[0][0]}`);
            }
        }
        else {
            console.log(`ticket "${ticket}" - no match`);
        }
    }
}

winningTicket('Cash$$$$$$Ca$$$$$$sh, $$$$$$Cash$$$$$$, @@@@@@@@abcdefghij, @@@@@@@@@@@@@@@@, ######12#$%^&*##');