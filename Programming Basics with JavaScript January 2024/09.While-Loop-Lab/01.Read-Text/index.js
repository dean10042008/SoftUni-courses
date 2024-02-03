function text(input) {
    let i = 0;

    while (input[i] !== "Stop") {
        console.log(input[i]);
        i++;
    }
}

text(["Nakov", "SoftUni", "Sofia", "Bulgaria", "SomeText", "Stop", "AfterStop", "Europe", "HelloWorld"]);