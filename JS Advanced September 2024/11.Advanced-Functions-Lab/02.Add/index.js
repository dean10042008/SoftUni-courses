function result(number) {
    function addToNumber(number) {
        return this.number + number;
    }

    let numObj = {
        number,
    }

    const newAdd = addToNumber.bind(numObj);
    return newAdd;
}

let add5 = result(5);
console.log(add5(2));
console.log(add5(3));