function cutAndReverse(str) {
    let arr = str.split('');
    let first = arr.splice(0, str.length / 2);
    console.log(first.reverse().join(''));
    console.log(arr.reverse().join(''));
}

cutAndReverse('tluciffiDsIsihTgnizamAoSsIsihT');