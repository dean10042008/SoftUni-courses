function pass(input) {
    let username = input[0];
    let password = input[1];

    let i = 2;

    while (input[i] !== password) {
        i++;
    }

    console.log(`Welcome ${username}!`);
}

pass(["Nakov", "1234", "Pass", "1324", "1234"]);