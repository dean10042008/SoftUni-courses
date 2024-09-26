function commandProcessor() {
    let word = '';

    let obj = {
        append: (str) => {
            word += str;
        },

        removeStart: (count) => {
            word = word.substring(count);
        },

        removeEnd: (count) => {
            word = word.substring(0, word.length - count);
        },

        print: () => {
            console.log(word);
        }
    }

    return obj;
}

let firstZeroTest = commandProcessor();
firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();