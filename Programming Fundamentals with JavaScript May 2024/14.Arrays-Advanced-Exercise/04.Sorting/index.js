function sorting(arr) {
    let sliced = arr.slice();
    let biggest = arr.sort((a, b) => b - a);
    let smallest = sliced.sort((a, b) => a - b);

    let concat = [];

    biggest.forEach((x, y) => {
        concat.push(x);
        concat.push(smallest[y]);
    })

    console.log(
        concat.splice(concat.length / 2).reverse().join(" ")
    )
}

sorting([1, 21, 3, 52, 69, 63, 31, 2, 18, 94]);