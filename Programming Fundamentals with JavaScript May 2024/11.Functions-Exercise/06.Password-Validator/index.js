function passwordValidator(input) {
    function hasCorrectLength(str) {
        if (str.length >= 6 && str.length <= 10) {
            return true;
        }
        else {
            console.log(`Password must be between 6 and 10 characters`);
            return false;
        }
    }

    function hasOnlyNumbersAndStrings(str) {

        let incorrect = 0;

        for (let i = 0; i < str.length; i++) {
            if ((str[i].charCodeAt(0) >= 48 && str[i].charCodeAt(0) <= 57) || (str[i].charCodeAt(0) >= 65 && str[i].charCodeAt(0) <= 122)) {

            }
            else {
                incorrect++;
            }
        }

        if (incorrect === 0) {
            return true;
        }
        else {
            console.log(`Password must consist only of letters and digits`);
            return false;
        }

    }

    function hasTwoNumbers(str) {
        let numberCount = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === "0" || str[i] === "1" || str[i] === "2" || str[i] === "3" || str[i] === "4" || str[i] === "5" || str[i] === "6" || str[i] === "7" || str[i] === "8" || str[i] === "9") {
                numberCount++;
            }
        }

        if (numberCount >= 2) {
            return true;
        }
        else {
            console.log(`Password must have at least 2 digits`);
            return false;
        }
    }

    let isValid = hasCorrectLength(input);
    let isValid2 = hasOnlyNumbersAndStrings(input);
    let isValid3 = hasTwoNumbers(input);

    if (isValid && isValid2 && isValid3) {
        console.log(`Password is valid`);
    }
}

passwordValidator('logIn');