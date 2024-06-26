function convertToJSON(fn, ln, color) {
    let person = {
        "name": fn,
        "lastName": ln,
        "hairColor": color
    }

    let result = JSON.stringify(person);

    console.log(result);
}

convertToJSON('George', 'Jones', 'Brown');