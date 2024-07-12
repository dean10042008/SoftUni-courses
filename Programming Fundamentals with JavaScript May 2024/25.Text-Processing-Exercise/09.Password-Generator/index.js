function passwordGenerator(arr) {
    let password = (arr[0].concat(arr[1])).split("");
    let letters = arr[2].split("");

    let j = 0;
    let i = 0;

    while (j < letters.length) {
        for (const passwordLetter of password) {
            if (j >= letters.length) {
                j = 0;
            }

            if (passwordLetter === "a" || passwordLetter === "e" || passwordLetter === "i" || passwordLetter === "o" || passwordLetter === "u") {
                let index = password.indexOf(passwordLetter);
                let uppercased = (letters[j]).toUpperCase();

                password.splice(index, 1, uppercased);

                j++;
            }
        }

        if (i >= password.length) {
            break;
        }

        i++;
    }

    console.log(`Your generated password is ${password.reverse().join("")}`);
}

passwordGenerator(['ilovepizza', 'ihatevegetables', 'orange']);