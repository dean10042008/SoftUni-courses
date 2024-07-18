function matchFullName(str) {
    const pattern = /\b[A-Z][a-z]+ \b[A-Z][a-z]+/g
    let result = str.match(pattern);
    console.log(result.join(" "));
}

matchFullName("Ivan Ivanov, Ivan ivanov, ivan Ivanov, IVan Ivanov, Test Testov, Ivan	Ivanov");