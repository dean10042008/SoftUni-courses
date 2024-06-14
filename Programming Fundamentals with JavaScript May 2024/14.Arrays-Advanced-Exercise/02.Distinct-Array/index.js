function distinctArray (arr) {
    let newArr = arr.filter((a, b) => arr.indexOf(a) === b);

    console.log(newArr.join(" "));
}

distinctArray([1, 2, 3, 4]);