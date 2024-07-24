function secretChat(arr) {
    let concealedMsg = arr.shift();

    let command = arr.shift();

    while (command !== "Reveal") {
        let msgArr = Array.from(concealedMsg);

        if (command.startsWith("InsertSpace")) {
            const index = command.split(":")[2];
            msgArr.splice(index, 0, " ");
            concealedMsg = msgArr.join("");

            console.log(concealedMsg);
        }
        else if (command.startsWith("Reverse")) {
            const substring = command.split(":|:")[1];
            if (concealedMsg.includes(substring)) {
                concealedMsg = concealedMsg.replace(substring, "");
                const substringArr = Array.from(substring);

                const reversed = substringArr.reverse().join("");
                concealedMsg = concealedMsg.concat(reversed);

                console.log(concealedMsg);
            }
            else {
                console.log('error');
            }
        }
        else if (command.startsWith("ChangeAll")) {
            const tokens = command.split(":");
            const letterToReplace = tokens[2];
            const letterToPut = tokens[4];

            while (concealedMsg.includes(letterToReplace)) {
                concealedMsg = concealedMsg.replace(letterToReplace, letterToPut);
            }

            console.log(concealedMsg);
        }

        command = arr.shift();
    }


    console.log(`You have a new text message: ${concealedMsg}`);
}

secretChat(['heVVodar!gniV', 'ChangeAll:|:V:|:l', 'Reverse:|:!gnil', 'InsertSpace:|:5', 'Reveal']);