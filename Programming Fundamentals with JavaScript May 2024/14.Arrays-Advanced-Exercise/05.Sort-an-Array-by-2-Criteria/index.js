function sortAnArrayBy2Criteria(arr) {
    function compare(a, b) {
        if (a.length !== b.length) {
            return a.length - b.length;
        }

        return a.localeCompare(b);
    }

    let arr2 = arr.sort(compare)

    console.log(arr2.join("\n"));
}

sortAnArrayBy2Criteria(['alpha', 'beta', 'gamma']);