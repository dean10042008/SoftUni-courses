function largestNum(input) {
   let i = 0;
   let currentWord = input[i];
   let maxNumber = -99999999999;

   while (currentWord !== "Stop") {
        currentNumber = Number(currentWord);

        if (currentNumber > maxNumber) {
            maxNumber = currentNumber
        }

        i++;
        currentWord = input[i];
   }
   console.log(maxNumber);
}

largestNum(["100", "99", "80", "70", "Stop"]);