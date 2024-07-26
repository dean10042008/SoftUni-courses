function sortNumbers(n1, n2, n3) {
    const arr = [n1, n2, n3];
    console.log(arr.sort((a, b) => b - a).join("\n"));
}

sortNumbers(2, 1, 3);