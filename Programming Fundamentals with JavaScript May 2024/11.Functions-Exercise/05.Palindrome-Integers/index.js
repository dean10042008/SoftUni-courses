function palindromeIntegers(arr) {
    let currentStrReverse = '';

   for (let i = 0; i < arr.length; i++) {
       let currentStr = arr[i].toString();
       currentStrReverse = '';

       for (let j = currentStr.length - 1; j >= 0; j--) {
           currentStrReverse += currentStr[j];
       }

       if (currentStr === currentStrReverse) {
           console.log("true");
       }
       else {
           console.log("false");
       }
   }
}

palindromeIntegers([123,323,421,121]);