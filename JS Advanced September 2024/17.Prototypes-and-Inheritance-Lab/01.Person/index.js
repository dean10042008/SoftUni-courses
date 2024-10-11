function createPerson(firstName, lastName) {
    const result = {
        firstName,
        lastName,
    }

    Object.defineProperty(result, 'fullName', {
        configurable: true,
        enumerable: true,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            const [firstName, lastName] = value.split(' ');
            if (firstName && lastName) {
                this.firstName = firstName;
                this.lastName = lastName;
            }
        }
    });

    return result;
}

let Person = createPerson;
let a = new Person("Albert", "Simpson");
let actual = a.fullName;
let expected = "Albert Simpson";
console.log(actual,expected);
a.firstName = "Simon";
let actualFullName = a.fullName;
let expectedFullName = "Simon Simpson";
console.log(actualFullName,expectedFullName);
a.fullName = "Peter";
let b = a.firstName;
let expectedB = "Simon"
console.log(b,expectedB);
let v = a.lastName;
let expectedV = "Simpson";
console.log(v,expectedV);

// let person = createPerson("Peter", "Ivanov");
// console.log(person.fullName); //Peter Ivanov
// person.firstName = "George";
// console.log(person.fullName); //George Ivanov
// person.lastName = "Peterson";
// console.log(person.fullName); //George Peterson
// person.fullName = "Nikola Tesla";
// console.log(person.firstName); //Nikola
// console.log(person.lastName); //Tesla