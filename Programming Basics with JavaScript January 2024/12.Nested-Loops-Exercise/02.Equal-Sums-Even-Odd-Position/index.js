function position(input) {
    let startNum = Number(input[0]);
    let endNum = Number(input[1]);

    let result = "";

    for (let curNum = startNum; curNum <= endNum; curNum++){
        let curNumStr = curNum.toString();

        let oddPositionSum = 0;
        let evenPositionSum = 0;

        for (let i = 0; i < curNumStr.length; i++) {
            let digit = Number(curNumStr[i]);

            if (i % 2 === 0) {
                evenPositionSum += digit;
            }
            else {
                oddPositionSum += digit;
            }
        }
        if (evenPositionSum === oddPositionSum) {
            result += curNumStr + " ";
        }
    }
    console.log(result);
}

position(["100000", "100050"]);