function solve() {
    const textToConvert = document.getElementById("text").value;
    const namingConvention = document.getElementById("naming-convention").value;

    const resultEl = document.getElementById("result");

    let result = "";

    switch (namingConvention) {
        case "Camel Case": {
            const arr = textToConvert.split(" ");
            for (let i = 0; i < arr.length; i++) {

                let element = arr[i];
                let firstLetter = element.slice(0, 1);
                let rest = element.slice(1);
                const lowercased = rest.toLowerCase();

                firstLetter = firstLetter.toUpperCase();

                if (i !== 0) {
                    firstLetter = firstLetter.toUpperCase();
                    element = element.replace(element[0], firstLetter);
                }

                element = element.replace(rest, lowercased);

                arr[i] = element;
            }

            result = arr.join("");
            break;
        }

        case "Pascal Case": {
            const arr = textToConvert.split(" ");
            for (let i = 0; i < arr.length; i++) {
                let element = arr[i];
                let firstLetter = element.slice(0, 1);
                firstLetter = firstLetter.toUpperCase();
                let rest = element.slice(1);
                const lowercased = rest.toLowerCase();

                element = element.replace(element[0], firstLetter).replace(rest, lowercased);

                arr[i] = element;
            }

            result = arr.join("");
            break;
        }
        default: {
            result = "Error!";
            break;
        }
    }

    resultEl.textContent = result;
}