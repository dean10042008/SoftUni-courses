function smallestNum(input) {
    let i = 0;
    let currentWord = input[i];
    let minNumber = 99999999999;
 
    while (currentWord !== "Stop") {
         currentNumber = Number(currentWord);
 
         if (currentNumber < minNumber) {
             minNumber = currentNumber
         }
 
         i++;
         currentWord = input[i];
    }
    console.log(minNumber);
}

smallestNum(["100", "99", "80", "70", "Stop"]);