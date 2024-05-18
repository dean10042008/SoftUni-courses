function login(array) {
    let username = array[0];
    let count = 0;
    let pass = '';

    for (let i = 1; i <= array.length; i++) {
        let password = array[i];
        let neededPassword = '';

        for (let j = password.length - 1; j >= 0; j--) {
            let currentLetter = password[j];
            neededPassword += currentLetter;
        }

        if (neededPassword === username) {
            pass = neededPassword;
            break;
        }

        count += 1;

        if (count === 4) {
            console.log(`User ${username} blocked!`);
            return;
        }

        console.log("Incorrect password. Try again.");
    }

    if (pass === username) {
        console.log(`User ${username} logged in.`)
    }

}

login(['Acer','login','go','let me in','recA']);