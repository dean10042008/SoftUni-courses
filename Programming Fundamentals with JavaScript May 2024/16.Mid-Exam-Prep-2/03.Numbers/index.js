function numbers(input) {
    let nums = input.split(' ').map(Number);

    let sum = 0;
    let result = [];

    for (const num of nums) {
        sum += num;
    }

    const average = sum / nums.length;
    nums.sort((a, b) => b - a);
    let count = 1;

    for (const num of nums) {
        if (num > average && count <= 5) {
            count++;
            result.push(num);
        }
    }

    if (count === 1) {
        console.log("No");
        return;
    }

    console.log(result.join(" "));
}

numbers('10 20 30 40 50');