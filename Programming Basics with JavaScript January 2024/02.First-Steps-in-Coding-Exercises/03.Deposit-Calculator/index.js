function depositCalc(arr) {
    let depositedSum = Number(arr[0]);
    let depositPeriod = Number(arr[1]);
    let annualInterestPercent = Number(arr[2]);

    let annualInterestDecimal = annualInterestPercent / 100;
    
    let sum = depositedSum + depositPeriod * ((depositedSum * annualInterestDecimal) / 12);

    console.log(sum);
}

depositCalc(["200", "3", "5.7"])