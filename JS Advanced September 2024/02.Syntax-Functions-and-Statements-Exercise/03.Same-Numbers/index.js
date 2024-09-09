function sameNumbers(input) {
    const str = input.toString();

    let arr = str.split('');
    let isDifferent = true;
    let sum = 0;

    let result = [Number(arr[0])];

    for (const numberAsStr of arr) {
        const num = Number(numberAsStr);

        if (!result.includes(num)) {
            isDifferent = false;
        }

        sum += num;
    }

    console.log(isDifferent);
    console.log(sum);
}

sameNumbers(2222222);