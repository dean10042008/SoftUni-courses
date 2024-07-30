function deserializeString(arr) {
    let result = [];

    while (arr[0] !== "end") {
        const combination = arr.shift();

        const [char, rest] = combination.split(":");
        const indexes = rest.split("/");

        for (const index of indexes) {
            result.push([index, char]);
        }
    }

    result.sort((a, b) => {
        return Number(a[0]) - Number(b[0]);
    });

    let str = '';

    for (let i = 0; i < result.length; i++) {
        str += result[i][1];
    }

    console.log(str);
}

deserializeString(['a:0/2/4/6', 'b:1/3/5', 'end']);