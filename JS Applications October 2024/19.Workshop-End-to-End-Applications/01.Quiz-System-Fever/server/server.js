// This is a basic server created by softuni student, made specifically for the Quiz System Fever Workshop.
// Everyone is free to use/test/modify this server. The server is similar to the SoftUni practice server.
// The server is very easy to understand and use, is also friendly for the front-end.
// Server will always return an object in JSON format with key "message" and sometimes key "data".
// There are total of 19 (19 main "if" statements) type of requests which the server will respond to, for every requst there is an "if" statement created.
// After every main "if" statement there is a comment on what the server expects and what will return.
// You can literally open the "if" statements and check what the server will do.
// Along with this server I will also post the full solution for the Quiz System Fever Workshop, but I recommend to try and do the front-end yourself or in a team with someone!
// The server starts the same way like the SoftUni practice server - with command "node server.js".
// Example: if (req.url === '/users/register' && req.method === 'POST') { // Register user - This means you have to send POST request to URL - "http://localhost:5001/users/register",
// and when you open this if statement, inside you will see what it expects, an email, password and username in the body.
// You can change the port if you want at the very end of the server! Remember after every change on the server you have to stop it and restart it for the changes to take effect!
// Another example: if (query.quizIdDetails && req.method === 'GET') { // Get a specific quiz. URL - /data/&&quizIdDetails=${quizId} - Means You have to send GET request
// to URL "http://localhost:5001/data/&&quizIdDetails=${quizId}" where the ${quizId} is the actual id of the quiz - "http://localhost:5001/data/&&quizIdDetails=52f4683a-15d1-4253-9a6b-166f515d061d"
// Authorization required. - Means you have to send headers with key 'X-Authorization' and value the accessToken returned by the server at login and register.

const http = require('http');
const querystring = require('querystring');

const users = [
    {
        username: 'pesho',
        email: 'pesho@abv.bg',
        password: '1234',
        userId: '8e96bc1f-3a14-4ea1-b9cf-474009d26e7a'
    },
    {
        username: 'ivan',
        email: 'ivan@abv.bg',
        password: '1234',
        userId: 'b0f29e34-323d-43ab-bcfb-d6aad940c4b9'
    },
    {
        username: 'atanas',
        email: 'atanas@abv.bg',
        password: '1234',
        userId: '3905c3f1-1bda-4880-9335-04c423a5e724'
    }
];

const quizzes = [
    {
        title: 'JavaScript Fundamentals',
        topic: 'Languages',
        questionCount: 15,
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d',
        quizOwnerId: '8e96bc1f-3a14-4ea1-b9cf-474009d26e7a',
        quizCreatedOn: 1734626439,
        quizCreatedOnDate: '2024-12-19T16:40:39.672Z',
        quizEditedOnDate: '2024-12-19T16:55:26.672Z',
        takenCount: 1,
        quizOwnerUsername: 'pesho',
        quizOwnerEmail: 'pesho@abv.bg',
        description: 'Quiz about JS programming language. Level of difficulty: easy/medium.'
    },
    {
        title: 'Hardware Quiz',
        topic: 'Hardware',
        questionCount: 15,
        quizId: '17990891-e90d-444b-a834-4aebeb64ee92',
        quizOwnerId: '8e96bc1f-3a14-4ea1-b9cf-474009d26e7a',
        quizCreatedOn: 1734629294,
        quizCreatedOnDate: '2024-12-19T17:28:14.889Z',
        quizEditedOnDate: '2024-12-19T17:39:41.889Z',
        takenCount: 1,
        quizOwnerUsername: 'pesho',
        quizOwnerEmail: 'pesho@abv.bg',
        description: 'Difficulty level: medium'
    },
    {
        title: "Ivan's Software Quiz",
        topic: 'Tools and Software',
        questionCount: 10,
        quizId: '2d6c9770-dd67-45f4-806f-23d788e091ac',
        quizOwnerId: 'b0f29e34-323d-43ab-bcfb-d6aad940c4b9',
        quizCreatedOn: 1734630420,
        quizCreatedOnDate: '2024-12-19T17:47:00.330Z',
        quizEditedOnDate: '2024-12-19T17:56:05.330Z',
        takenCount: 1,
        quizOwnerUsername: 'ivan',
        quizOwnerEmail: 'ivan@abv.bg',
        description: 'Difficulty level: hard'
    },
    {
        title: 'JS Advanced Quiz',
        topic: 'Languages',
        questionCount: 15,
        quizId: '068371a9-bfca-4f97-b75a-bcfa782ff93e',
        quizOwnerId: '3905c3f1-1bda-4880-9335-04c423a5e724',
        quizCreatedOn: 1734631718,
        quizCreatedOnDate: '2024-12-19T18:08:38.722Z',
        quizEditedOnDate: '2024-12-19T18:15:58.722Z',
        takenCount: 2,
        quizOwnerUsername: 'atanas',
        quizOwnerEmail: 'atanas@abv.bg',
        description: 'Difficulty level: medium/hard'
    }
];

let questions = [
    {
        text: 'Which of these is NOT a valid way to declare a variable in JavaScript?',
        answers: ['let', 'const', 'varname'],
        correctIndex: 2,
        questionId: '9fb1ff5a-442b-44fc-9f7e-6181fe853ee0',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'What is the output of console.log(typeof NaN)?',
        answers: ['number', 'NaN', 'undefined'],
        correctIndex: 0,
        questionId: 'c27baf65-d6e0-4b0c-b1e1-84566a9854b1',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'What will console.log(0.1 + 0.2 === 0.3) output?',
        answers: ['true', 'false', 'undefined'],
        correctIndex: 1,
        questionId: '2b219944-ff6f-4049-b564-77d18b62e7dc',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'Which method is used to combine two or more arrays in JavaScript?',
        answers: ['combine()', 'concat()', 'merge()'],
        correctIndex: 1,
        questionId: '0dfdbac2-f5e4-49e1-b36f-3c2057679462',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'What is the purpose of setTimeout in JavaScript?',
        answers: [
            'To execute a function immediately',
            'To execute a function after a specified delay',
            'To repeat a function at regular intervals'
        ],
        correctIndex: 1,
        questionId: '3a724d97-e2e0-4d4c-a8a1-157e494a5e78',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'How do you declare a function in JavaScript?',
        answers: [
            'function myFunction() {}',
            'def myFunction() {}',
            'func myFunction() {}'
        ],
        correctIndex: 0,
        questionId: '8b3bda67-b8d1-4d29-ba0d-be0d901789f7',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'What does the this keyword refer to in a regular JavaScript function?',
        answers: [
            'The global object or the object that owns the function',
            'The function itself',
            'A variable called this'
        ],
        correctIndex: 0,
        questionId: '46c9487b-b0fc-4bc8-a665-81dd57ea6c39',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'What is the purpose of the Array.prototype.map method?',
        answers: [
            'To transform each element of an array',
            'To filter elements in an array',
            'To find an element in an array'
        ],
        correctIndex: 0,
        questionId: '972eb0b0-3fe2-47cd-8072-9974e0e8ea30',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'Which JavaScript statement stops the execution of a loop?',
        answers: ['stop', 'break', 'exit'],
        correctIndex: 1,
        questionId: '8c4ba64e-afc9-4382-8e91-8268c56022fc',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'What is the output of the expression [1, 2, 3].length?',
        answers: ['3', 'undefined', 'null'],
        correctIndex: 0,
        questionId: 'b2afc012-a1f5-4af6-a84d-ea6f64d26e2e',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'How do you check if a variable is null in JavaScript?',
        answers: [
            'variable.isNull',
            'variable === null',
            "typeof variable === 'null'"
        ],
        correctIndex: 1,
        questionId: '4517c631-0171-4b5f-876d-ac688578901a',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'What is the difference between == and === in JavaScript?',
        answers: [
            '== compares values only, while === compares both values and types',
            'They are the same',
            '=== compares values only, while == compares both values and types'
        ],
        correctIndex: 0,
        questionId: '8ad5bd00-4fcc-4b2a-a262-cc2860a8abc9',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'What will console.log("Hello".toUpperCase()) output?',
        answers: ['"hello"', '"HELLO"', '"Hello"'],
        correctIndex: 1,
        questionId: 'add7fb24-bdcd-4218-869f-86faa0b34c04',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'How do you create a promise in JavaScript?',
        answers: [
            'new Promise((resolve, reject) => { ... })',
            'Promise.create(() => { ... })',
            'Promise(() => { ... })'
        ],
        correctIndex: 0,
        questionId: '27a07135-113b-4c6a-83be-d94537f62adc',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: 'What will console.log([1, 2] + [3, 4]) output?',
        answers: ['[1, 2, 3, 4]', '"1,23,4"', '"12,34"'],
        correctIndex: 1,
        questionId: '140eca00-454f-4b84-af2b-0b86bc3c55e2',
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d'
    },
    {
        text: "What is the primary function of the CPU in a computer?",
        answers: [
            "Store data temporarily",
            "Manage power distribution",
            "Perform calculations and execute instructions"
        ],
        correctIndex: 2,
        questionId: "32d8ea87-347e-4f6f-b485-81b02a4bafce",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "Which component is responsible for rendering graphics in modern computers?",
        answers: [
            "Network Interface Card (NIC)",
            "Graphics Processing Unit (GPU)",
            "Sound Card"
        ],
        correctIndex: 1,
        questionId: "33f4d3bd-2fc7-4cd8-937b-f1337110db0e",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "What does the term 'RAM' stand for?",
        answers: [
            "Random Access Memory",
            "Readable Archive Module",
            "Rotational Access Memory"
        ],
        correctIndex: 0,
        questionId: "1f9bfe77-e71b-47bf-977d-d6e9c52bb1b2",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "What type of storage is known for being faster and more durable than HDDs?",
        answers: [
            "Solid State Drive (SSD)",
            "Optical Drive",
            "Magnetic Tape Drive"
        ],
        correctIndex: 0,
        questionId: "6c388549-2655-4b53-aa67-90777968af48",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "What is the typical voltage provided by a computer's power supply to the motherboard?",
        answers: [
            "3.3V, 5V, and 12V",
            "10V and 20V",
            "110V and 240V"
        ],
        correctIndex: 0,
        questionId: "82118249-fb43-4d11-bb3e-82f3180e4eac",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "Which component connects the CPU to other parts of the motherboard?",
        answers: [
            "Chipset",
            "Heat Sink",
            "CMOS Battery"
        ],
        correctIndex: 0,
        questionId: "07a9d88e-663b-49b4-ad02-b74f92a3861c",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "What is the primary purpose of a heat sink in a computer?",
        answers: [
            "Protect the CPU from dust",
            "Cool down electronic components",
            "Enhance performance of the motherboard"
        ],
        correctIndex: 1,
        questionId: "de3baee3-d23c-40d3-82f0-e4072ce79bc1",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "Which port is commonly used for connecting monitors to a PC?",
        answers: [
            "HDMI",
            "RJ45",
            "USB-C"
        ],
        correctIndex: 0,
        questionId: "fb9c60b8-13eb-4d2b-9219-ab3d95a8b40b",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "What is the function of the BIOS in a computer system?",
        answers: [
            "Load the operating system",
            "Provide internet access",
            "Control the GPU"
        ],
        correctIndex: 0,
        questionId: "d6d5c6b3-077c-4c5d-957e-00e311fcb9df",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "Which type of RAM is typically used in modern desktop computers?",
        answers: [
            "SDRAM",
            "DDR2",
            "DDR4"
        ],
        correctIndex: 2,
        questionId: "3641e4ab-31bb-4702-ac63-5aedbd5bfd40",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "What is the purpose of a thermal paste?",
        answers: [
            "Enhance the visual appearance of hardware",
            "Facilitate better heat transfer between CPU and heat sink",
            "Insulate electrical connections"
        ],
        correctIndex: 1,
        questionId: "507a749a-1d6d-4b41-b854-5027370e92e1",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "Which component is responsible for storing the system time when the computer is powered off?",
        answers: [
            "CMOS Battery",
            "PSU",
            "RAM"
        ],
        correctIndex: 0,
        questionId: "a2414e12-879d-4729-935c-b790fe7d4e5b",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "What is the main advantage of modular power supplies?",
        answers: [
            "Reduced noise levels",
            "Ability to connect only the cables you need",
            "Increased data transfer speed"
        ],
        correctIndex: 1,
        questionId: "68c6c095-a639-41d3-b2e1-d1293ed3cbd5",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "Which bus is used to connect high-speed peripherals such as SSDs in modern systems?",
        answers: [
            "PCIe (Peripheral Component Interconnect Express)",
            "ISA (Industry Standard Architecture)",
            "AGP (Accelerated Graphics Port)"
        ],
        correctIndex: 0,
        questionId: "25cbb17f-f0d7-42a2-91a5-5a36272e1c9c",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        text: "What does an uninterruptible power supply (UPS) primarily protect a computer from?",
        answers: [
            "Software viruses",
            "Power outages and surges",
            "Overheating"
        ],
        correctIndex: 1,
        questionId: "0a79fdef-fc00-4362-b374-003caee681da",
        quizId: "17990891-e90d-444b-a834-4aebeb64ee92"
    },
    {
        "text": "Which component connects the CPU to the memory and other hardware?",
        "answers": [
            "PCIe Controller",
            "BIOS",
            "Southbridge",
            "Northbridge"
        ],
        "correctIndex": 3,
        "questionId": "ba9b0f93-a7fc-4042-b781-2d5f8c3d734d",
        "quizId": "2d6c9770-dd67-45f4-806f-23d788e091ac"
    },
    {
        "text": "What is the primary purpose of thermal paste in computer hardware?",
        "answers": [
            "Insulate electrical components",
            "Enhance heat transfer between CPU and cooler",
            "Improve air circulation within the case",
            "Reduce noise from cooling fans"
        ],
        "correctIndex": 1,
        "questionId": "589eced0-af6b-4ab7-9f6b-4b4aa72d286e",
        "quizId": "2d6c9770-dd67-45f4-806f-23d788e091ac"
    },
    {
        "text": "What is the function of a GPU in a computer system?",
        "answers": [
            "Perform network operations",
            "Control memory allocation",
            "Render graphics and process visual data",
            "Manage power distribution"
        ],
        "correctIndex": 2,
        "questionId": "021405b7-ab19-4cdf-9953-0f4563b0b213",
        "quizId": "2d6c9770-dd67-45f4-806f-23d788e091ac"
    },
    {
        "text": "Which of the following is a non-volatile storage type?",
        "answers": [
            "CPU Registers",
            "HDD",
            "RAM",
            "Cache"
        ],
        "correctIndex": 1,
        "questionId": "236844a2-2138-480f-b1a4-d7f13361f59b",
        "quizId": "2d6c9770-dd67-45f4-806f-23d788e091ac"
    },
    {
        "text": "What does RAID stand for in hardware configurations?",
        "answers": [
            "Real-time Access Interface Data",
            "Rapid Application Installation Disk",
            "Redundant Array of Independent Disks",
            "Random Access Integrated Devices"
        ],
        "correctIndex": 2,
        "questionId": "d4a447fa-12be-4dfe-afc6-e5c0fc70af27",
        "quizId": "2d6c9770-dd67-45f4-806f-23d788e091ac"
    },
    {
        "text": "What is the main advantage of SSDs over traditional HDDs?",
        "answers": [
            "Higher storage capacity",
            "Faster data access speeds",
            "More compatibility with older systems",
            "Lower cost per GB"
        ],
        "correctIndex": 1,
        "questionId": "2657514d-e7e6-4ba0-89ae-7d82be58a6c7",
        "quizId": "2d6c9770-dd67-45f4-806f-23d788e091ac"
    },
    {
        "text": "Which hardware component is responsible for executing instructions?",
        "answers": [
            "GPU",
            "Motherboard",
            "RAM",
            "CPU"
        ],
        "correctIndex": 3,
        "questionId": "b9c7e373-d351-4360-b596-c614aff0b4e9",
        "quizId": "2d6c9770-dd67-45f4-806f-23d788e091ac"
    },
    {
        "text": "What is the primary function of the power supply unit (PSU)?",
        "answers": [
            "Store power for future use",
            "Convert electrical power to usable forms",
            "Control fan speed",
            "Distribute data between hardware components"
        ],
        "correctIndex": 1,
        "questionId": "5a764421-3368-444d-98d6-2351f4fe607a",
        "quizId": "2d6c9770-dd67-45f4-806f-23d788e091ac"
    },
    {
        "text": "Which type of memory is used to store the firmware of a computer?",
        "answers": [
            "Virtual Memory",
            "ROM",
            "Cache",
            "RAM"
        ],
        "correctIndex": 1,
        "questionId": "249a3a73-e54a-4f45-8320-771715c07dc1",
        "quizId": "2d6c9770-dd67-45f4-806f-23d788e091ac"
    },
    {
        "text": "What is the purpose of a chipset on a motherboard?",
        "answers": [
            "Control graphics rendering",
            "Generate clock signals for the CPU",
            "Provide a power source to all components",
            "Manage data flow between CPU, memory, and peripherals"
        ],
        "correctIndex": 3,
        "questionId": "63ee89c6-73af-4cdc-ab4a-9b27caf06344",
        "quizId": "2d6c9770-dd67-45f4-806f-23d788e091ac"
    },
    {
        "text": "Which of the following is true about closures in JavaScript?",
        "answers": [
            "Closures can access only variables defined outside of the function",
            "Closures cannot access variables inside the function",
            "Closures can access both variables inside and outside the function",
            "Closures create new variables when called",
            "Closures are not a feature in JavaScript"
        ],
        "correctIndex": 2,
        "questionId": "a99c5d3d-9b80-474b-9a13-4b327c6c672f",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "What will be the value of 'x' after the following code is executed?\n\nlet x = 10;\n(function() { let x = 20; })();",
        "answers": [
            "10",
            "20",
            "undefined",
            "ReferenceError",
            "null"
        ],
        "correctIndex": 0,
        "questionId": "41f013a8-6c8d-45b2-a65f-2c1e62fd5c19",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "Which method is used to attach an event listener to an element in JavaScript?",
        "answers": [
            "addEvent",
            "addListener",
            "onEvent",
            "attachEvent",
            "addEventListener"
        ],
        "correctIndex": 4,
        "questionId": "d6c74eaf-2073-42f3-bfe2-d423d8a5a003",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "What does the 'this' keyword refer to in a regular function?",
        "answers": [
            "The global object",
            "The function itself",
            "The object from which the function was called",
            "An undefined value",
            "The function's return value"
        ],
        "correctIndex": 0,
        "questionId": "a4d33d55-d96b-4933-9e43-7dbf25f4db3e",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "What is the output of this code?\n\nconsole.log(0.1 + 0.2 === 0.3);",
        "answers": [
            "true",
            "false",
            "undefined",
            "NaN",
            "ReferenceError"
        ],
        "correctIndex": 1,
        "questionId": "bde3c7b4-3be2-49b3-a72f-7c8d7ff5b7e5",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "Which of the following methods is used to execute a promise in JavaScript?",
        "answers": [
            "resolve()",
            "then()",
            "catch()",
            "async()",
            "execute()"
        ],
        "correctIndex": 1,
        "questionId": "5429eab3-d21e-40f1-82f3-b6823f76f4d2",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "What is the correct syntax for creating an object in JavaScript?",
        "answers": [
            "let obj = {key: value};",
            "let obj = [key: value];",
            "let obj = (key: value);",
            "let obj = <key: value>;",
            "let obj = {key: value};"
        ],
        "correctIndex": 0,
        "questionId": "476ca1f3-b6b0-4b73-b91b-9d10b8cd4f98",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "Which JavaScript function is used to serialize an object into a JSON string?",
        "answers": [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.format()",
            "JSON.toString()",
            "serialize()"
        ],
        "correctIndex": 1,
        "questionId": "3a442d4b-f717-4311-a0d4-eef617dbf431",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "What is the output of the following code?\n\nconsole.log([1, 2, 3] == '1,2,3');",
        "answers": [
            "true",
            "false",
            "undefined",
            "NaN",
            "ReferenceError"
        ],
        "correctIndex": 0,
        "questionId": "69ecf937-2e60-4695-a20e-cb6db2e92202",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "What is the correct way to use the 'bind()' method in JavaScript?",
        "answers": [
            "function.bind()",
            "object.bind()",
            "function.call()",
            "object.call()",
            "function.bind(object)"
        ],
        "correctIndex": 4,
        "questionId": "c8f6f38c-b3a0-44f1-baf3-1d778c4649d9",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "What does 'async' do in JavaScript?",
        "answers": [
            "It makes the function synchronous",
            "It makes the function return a Promise",
            "It pauses the function",
            "It prevents the function from returning a value",
            "It is used to define a constructor"
        ],
        "correctIndex": 1,
        "questionId": "2a16aab5-5df4-43c0-b758-4a75574264ea",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "What does the 'await' keyword do in JavaScript?",
        "answers": [
            "It blocks the execution of the script",
            "It immediately resolves a Promise",
            "It creates a Promise",
            "It waits for a Promise to resolve or reject",
            "It ends the execution of the function"
        ],
        "correctIndex": 3,
        "questionId": "fd39f9cf-19e9-4fdb-9c7d-2ec2b8c0f75c",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "Which of the following is true about the 'strict mode' in JavaScript?",
        "answers": [
            "It allows the use of undeclared variables",
            "It prevents the use of undeclared variables",
            "It is mandatory for all JavaScript code",
            "It makes the code run faster",
            "It is a deprecated feature"
        ],
        "correctIndex": 1,
        "questionId": "cf9fa364-d6ae-4168-93ad-407f25b0a2c1",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "Which method in JavaScript allows you to execute code after a specific delay?",
        "answers": [
            "setInterval()",
            "setTimeout()",
            "wait()",
            "delay()",
            "timeout()"
        ],
        "correctIndex": 1,
        "questionId": "ebee3cd4-8f8d-44ad-9066-e3a35c6a9934",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    },
    {
        "text": "What does the 'new' keyword do in JavaScript?",
        "answers": [
            "It creates a new instance of a class",
            "It creates a new variable",
            "It makes the function return a Promise",
            "It is used to declare a constant",
            "It adds a new method to the object"
        ],
        "correctIndex": 0,
        "questionId": "21439f37-d5cd-4752-96c4-d59f6b4d0c85",
        "quizId": "068371a9-bfca-4f97-b75a-bcfa782ff93e"
    }
];

let solutions = [
    {
        quizId: '52f4683a-15d1-4253-9a6b-166f515d061d',
        correct: 15,
        userId: 'b0f29e34-323d-43ab-bcfb-d6aad940c4b9',
        solutionId: 'd37a9487-a51b-4f5f-9d49-e90689592c33',
        solutionOwnerUsername: 'ivan',
        solutionOwnerEmail: 'ivan@abv.bg',
        quizCompletedOnDate: '2024-12-19T17:02:21.415Z'
    },
    {
        quizId: '17990891-e90d-444b-a834-4aebeb64ee92',
        correct: 15,
        userId: 'b0f29e34-323d-43ab-bcfb-d6aad940c4b9',
        solutionId: 'e0d2bf8e-af22-458f-ae93-fef27d63d873',
        solutionOwnerUsername: 'ivan',
        solutionOwnerEmail: 'ivan@abv.bg',
        quizCompletedOnDate: '2024 - 12 - 19T17: 43: 36.705Z'
    },
    {
        quizId: '2d6c9770-dd67-45f4-806f-23d788e091ac',
        correct: 10,
        userId: '8e96bc1f-3a14-4ea1-b9cf-474009d26e7a',
        solutionId: 'def4bd1e-3b98-4daf-99c7-5c9d9b19dcb3',
        solutionOwnerUsername: 'pesho',
        solutionOwnerEmail: 'pesho@abv.bg',
        quizCompletedOnDate: '2024-12-19T18:04:49.827Z'
    },
    {
        quizId: '068371a9-bfca-4f97-b75a-bcfa782ff93e',
        correct: 2,
        userId: '8e96bc1f-3a14-4ea1-b9cf-474009d26e7a',
        solutionId: '2b348b84-05b5-4fa5-ae9d-be4df015d792',
        solutionOwnerUsername: 'pesho',
        solutionOwnerEmail: 'pesho@abv.bg',
        quizCompletedOnDate: '2024-12-19T18:24:22.482Z'
    },
    {
        quizId: '068371a9-bfca-4f97-b75a-bcfa782ff93e',
        correct: 15,
        userId: 'b0f29e34-323d-43ab-bcfb-d6aad940c4b9',
        solutionId: '729d6a7a-5217-4d6e-849e-ad411eaa198e',
        solutionOwnerUsername: 'ivan',
        solutionOwnerEmail: 'ivan@abv.bg',
        quizCompletedOnDate: '2024-12-19T18:28:48.052Z'
    }
];

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

const server = http.createServer((req, res) => {
    //console.log(req.url);

    // Set CORS headers to allow cross-origin requests
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify a domain)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization'); // Allowed headers

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const query = querystring.parse(req.url);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9._]{3,30}$/;

    if (req.url === '/users/register' && req.method === 'POST') { // Register user
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            try {
                const parsedBody = JSON.parse(body);

                if (!parsedBody.email.trim() || !parsedBody.password.trim() || !parsedBody.username.trim()) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Required body keys: email, password, username' }));
                }

                if (typeof parsedBody.email !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Email must be a string!' }));
                }

                if (!emailRegex.test(parsedBody.email.trim())) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Please enter a valid email address.' }));
                }

                if (typeof parsedBody.password !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Password must be a string!' }));
                }

                if (parsedBody.password.trim().length < 6) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Password must be atleast 6 characters long!' }));
                }

                if (typeof parsedBody.username !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Username must be a string!' }));
                }

                if (parsedBody.username.trim().length < 3 || parsedBody.username.trim().length > 30) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Username must be between 3 and 30 characters long!' }));
                }

                if (!usernameRegex.test(parsedBody.username.trim())) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Username must include only letters, numbers, underscores or dots!' }));
                }

                const findAcc = users.find(x => x.username.toLowerCase() === parsedBody.username.toLowerCase());
                if (findAcc) {
                    res.writeHead(409, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Username already exists!' }));
                }

                const findEmail = users.find(x => x.email.toLowerCase() === parsedBody.email.toLowerCase());
                if (findEmail) {
                    res.writeHead(409, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Email already exists!' }));
                }

                const newAccessToken = crypto.randomUUID();
                const newUserId = crypto.randomUUID();

                const newUser = {
                    username: parsedBody.username.toLowerCase().trim(),
                    email: parsedBody.email.toLowerCase().trim(),
                    password: parsedBody.password.trim(),
                    userId: newUserId,
                    accessToken: newAccessToken
                }
                users.push(newUser);

                const data = { ...newUser };

                const hashedPassword = await hashPassword(newUser.password);
                delete data.password;
                data.passwordHash = hashedPassword;

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Account registered successfully!', data }));
            }
            catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid format!' }));
            }
        });
        return;
    }

    if (req.url === '/users/login' && req.method === 'POST') { // Login user
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            try {
                const parsedBody = JSON.parse(body);

                if (!parsedBody.email.trim() || !parsedBody.password.trim()) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Required body keys: email, password' }));
                }

                if (typeof parsedBody.email !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Email must be a string!' }));
                }

                if (typeof parsedBody.password !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Password must be a string!' }));
                }

                const findUser = users.find(x => x.email.toLowerCase() === parsedBody.email.toLowerCase());
                if (!findUser) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Email does not exist!' }));
                }

                if (!(parsedBody.password.trim() === findUser.password)) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Invalid password' }));
                }
                const token = crypto.randomUUID();
                findUser.accessToken = token;

                const data = { ...findUser };

                const hashedPassword = await hashPassword(findUser.password);
                delete data.password;
                data.passwordHash = hashedPassword;

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Account logged successfully!', data }));
            }
            catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid format!' }));
            }
        });
        return;
    }

    if (req.url === '/users/logout' && req.method === 'GET') { // Logout user. Authorization required.

        if (!req.headers['x-authorization']) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Authorization required!' }));
        }
        const findUser = users.find(user => user.accessToken === req.headers['x-authorization']);

        if (findUser) {
            delete findUser.accessToken;

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Logout successful!' }));
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Failed to find user!' }));

    }

    if (req.url === '/users/verify' && req.method === 'GET') { // Get verification for the current user. Authorization required.
        // this request is optional
        if (!req.headers['x-authorization']) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Authorization required!' }));
        }
        const findUser = users.find(user => user.accessToken === req.headers['x-authorization']);

        if (findUser) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `Verification successful.` }));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Failed to verify user! Wrong Access Token!' }));
    }

    if (req.url === '/data/quizzes' && req.method === 'POST') { // Create a new quiz. Authorization required.
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);

                if (!req.headers['x-authorization']) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Authorization required!' }));
                }

                const findUser = users.find(user => user.accessToken === req.headers['x-authorization']);

                if (!findUser) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Authorization failed! Wrong Access Token!' }));
                }

                if (!parsedBody.title.trim() || !parsedBody.topic.trim() || !parsedBody.description.trim()) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Required body keys: title, topic, description' }));
                }

                if (typeof parsedBody.title !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Title must be a string!' }));
                }

                if (typeof parsedBody.topic !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Topic must be a string!' }));
                }

                if (typeof parsedBody.description !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Description must be a string!' }));
                }

                const findQuiz = quizzes.find(quiz => quiz.title === parsedBody.title.trim());
                if (findQuiz) {
                    res.writeHead(409, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Quiz with the same title already exists!' }));
                }
                const quizToken = crypto.randomUUID();
                const timestampInSeconds = Math.floor(Date.now() / 1000);
                const currentDate = new Date();

                const newQuiz = {
                    title: parsedBody.title.trim(),
                    topic: parsedBody.topic.trim(),
                    questionCount: 0,
                    quizId: quizToken,
                    quizOwnerId: findUser.userId,
                    quizCreatedOn: timestampInSeconds,
                    quizCreatedOnDate: currentDate,
                    quizEditedOnDate: currentDate,
                    takenCount: 0,
                    quizOwnerUsername: findUser.username,
                    quizOwnerEmail: findUser.email,
                    description: parsedBody.description.trim()
                };
                quizzes.push(newQuiz);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Quiz created successfully!', data: newQuiz }));

            }
            catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid format!' }));
            }
        });
        return;
    }

    if (req.url === '/data/questions' && req.method === 'POST') { // Create a new question, requires correct quizId in the body. Authorization required.
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);

                if (!req.headers['x-authorization']) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Authorization required!' }));
                }

                const findUser = users.find(user => user.accessToken === req.headers['x-authorization']);

                if (!findUser) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Authorization failed! Wrong Access Token!' }));
                }

                if (!parsedBody.text.trim() || !parsedBody.answers || (!parsedBody.correctIndex && parsedBody.correctIndex !== 0) || !parsedBody.quizId) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Required body keys: text, answers, correctIndex, quizId' }));
                }

                if (typeof parsedBody.text !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Text must be a string!' }));
                }
                const isValidAnswers = Array.isArray(parsedBody.answers) && parsedBody.answers.every(question => typeof question === 'string' && question !== '');

                if (!isValidAnswers) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Answers must be an array of non empty strings!' }));
                }

                if (parsedBody.answers.length < 2) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Answers must be atleast two!' }));
                }

                if (typeof parsedBody.correctIndex !== 'number') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Correct index must be a number!' }));
                }

                if (parsedBody.correctIndex < 0 || parsedBody.correctIndex >= parsedBody.answers.length) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Correct Index must be in the range of answers array!' }));
                }

                const findQuiz = quizzes.find(quiz => quiz.quizId === parsedBody.quizId);

                if (!findQuiz) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Quiz with the provided ID does not exist!' }));
                }

                const findQuestions = questions.filter(question => question.quizId === parsedBody.quizId);
                const findQuestionText = findQuestions.find(question => question.text === parsedBody.text.trim());

                if (findQuestionText) {
                    res.writeHead(409, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: `Question with the same Text already exists in the quiz ${findQuiz.title}` }));
                }

                if (findUser.userId !== findQuiz.quizOwnerId) {
                    res.writeHead(403, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: `You are not the creator of the quiz ${findQuiz.title}!` }));
                }
                const questionToken = crypto.randomUUID();

                const newQuestion = {
                    text: parsedBody.text.trim(),
                    answers: parsedBody.answers,
                    correctIndex: parsedBody.correctIndex,
                    questionId: questionToken,
                    quizId: findQuiz.quizId
                };
                questions.push(newQuestion);
                findQuiz.questionCount++;

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: `Successfully added new question for Quiz: ${findQuiz.title}`, data: newQuestion }));
            }
            catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid format!' }));
            }
        });
        return;
    }

    if (req.url === '/data/quizzes' && req.method === 'GET') { // Get all quizzes. URL - /data/quizzes
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: `Total quizzes number: ${quizzes.length}`, data: quizzes }));
    }

    if (req.url === '/data/quizzes/recent' && req.method === 'GET') { // Get most recent quiz. URL - /data/quizzes/recent
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: `Most recently added quiz: ${quizzes.at(-1)}`, data: quizzes.at(-1) }));
    }

    if (query.quizId && !query.questionId && req.method === 'GET') { // Get all questions for a quiz. URL - /data/questions/&&quizId=${quizId}
        const quizId = query.quizId;
        const findQuiz = quizzes.find(quiz => quiz.quizId === quizId);

        if (!findQuiz) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Quiz with the given ID does not exist!' }));
        }

        const questionsForCurrentQuiz = questions.filter(question => question.quizId === findQuiz.quizId);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: `Total questions for quiz ${findQuiz.title}: ${questionsForCurrentQuiz.length}`, data: questionsForCurrentQuiz }));
    }

    if (query.quizId && query.questionId && req.method === 'GET') { // Get a specific question from a specific quiz. URL - /data/questions/&&quizId=${quizId}&&questionId=${questionId}
        const quizId = query.quizId;
        const findQuiz = quizzes.find(quiz => quiz.quizId === quizId);

        if (!findQuiz) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Quiz with the given ID does not exist!' }));
        }

        const findQuestions = questions.filter(question => question.quizId === findQuiz.quizId);
        if (findQuestions.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `The quiz ${findQuiz.title} has no questions yet!` }));
        }

        const findQuestion = findQuestions.find(question => question.questionId === query.questionId);
        if (!findQuestion) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `The quiz ${findQuiz.title} has no question with the provided ID!` }));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: `Found question ${findQuestion.text} in the quiz ${findQuiz.title}`, data: findQuestion }));
    }

    if (req.url === '/data/solutions' && req.method === 'POST') { // Create a new solution, requires correct quizId in the body. Authorization required.
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);

                if (!req.headers['x-authorization']) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Authorization required!' }));
                }

                const findUser = users.find(user => user.accessToken === req.headers['x-authorization']);

                if (!findUser) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Authorization failed! Wrong Access Token!' }));
                }

                if (!parsedBody.hasOwnProperty('quizId') || !parsedBody.hasOwnProperty('correct')) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Required body keys: quizId, correct' }));
                }

                if (typeof parsedBody.correct !== 'number') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Correct must be a number!' }));
                }

                const findQuiz = quizzes.find(quiz => quiz.quizId === parsedBody.quizId);

                if (!findQuiz) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Quiz with the provided ID does not exist!' }));
                }

                if (parsedBody.correct < 0 || parsedBody.correct > findQuiz.questionCount) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: `Correct must be in the range of the number of questions ( ${findQuiz.questionCount} ) for quiz ${findQuiz.title}` }));
                }

                if (findQuiz.quizOwnerId === findUser.userId) {
                    res.writeHead(409, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: `User ${findUser.username} is the creator of the quiz ${findQuiz.title}, so he can't solve it!` }));
                }

                const findSolution = solutions.find(solution => solution.quizId === findQuiz.quizId && solution.userId === findUser.userId);

                if (findSolution && findSolution.correct >= parsedBody.correct) {
                    findQuiz.takenCount++;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: `User ${findUser.username} already has a better or equal solution for the quiz ${findQuiz.title}`, data: findSolution }));
                }

                const solutionId = crypto.randomUUID();
                const currentDate = new Date();

                const newSolution = {
                    quizId: parsedBody.quizId,
                    correct: parsedBody.correct,
                    userId: findUser.userId,
                    solutionId: solutionId,
                    solutionOwnerUsername: findUser.username,
                    solutionOwnerEmail: findUser.email,
                    quizCompletedOnDate: currentDate
                };
                findQuiz.takenCount++;
                solutions.push(newSolution);

                if (findSolution) {
                    const indexOfFindSolution = solutions.indexOf(findSolution);
                    solutions.splice(indexOfFindSolution, 1);
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: `Best solution from user ${findUser.username} for quiz ${findQuiz.title} so far!`, data: newSolution }));
            }
            catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid format!' }));
            }
        });
        return;
    }

    if (query.quizIdDetails && req.method === 'GET') { // Get a specific quiz. URL - /data/&&quizIdDetails=${quizId}
        const quizId = query.quizIdDetails;

        const findQuiz = quizzes.find(quiz => quiz.quizId === quizId);

        if (!findQuiz) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Quiz with the given ID does not exist!' }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: `Found quiz with title: ${findQuiz.title}`, data: findQuiz }));
    }

    if ((query.title || query.title === '') && (query.topic || query.topic === '') && req.method === 'GET') { // Get by title and topic. URL - /data/&&title=${title}&&topic=${topic}
        // this request is for the filter search
        if (query.title.trim() === '' && (query.topic.trim() === 'all' || query.topic.trim() === '' || query.topic.trim() === 'All Categories')) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `Empty search by Title and Topic returns all quizzes. Total quizzes number: ${quizzes.length}`, data: quizzes }));
        }

        if (query.title.trim() !== '' && (query.topic.trim() === 'all' || query.topic.trim() === '' || query.topic.trim() === 'All Categories')) {
            const findQuizzesByTitle = quizzes.filter(quiz => quiz.title.toLowerCase().includes(query.title.toLowerCase()));

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `Search by Title "${query.title}" in all topics. Found quizzes number: ${findQuizzesByTitle.length}`, data: findQuizzesByTitle }));
        }

        if (query.title.trim() === '' && (query.topic.trim() !== 'all' || query.topic.trim() !== '' || query.topic.trim() !== 'All Categories')) {
            const findQuizzesByTopic = quizzes.filter(quiz => quiz.topic.toLowerCase() === query.topic.toLowerCase());

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `Search only by Topic "${query.topic}". Found quizzes number: ${findQuizzesByTopic.length}`, data: findQuizzesByTopic }));
        }

        if (query.title.trim() !== '' && (query.topic.trim() !== 'all' || query.topic.trim() !== '' || query.topic.trim() !== 'All Categories')) {
            const findQuizzesByTitle = quizzes.filter(quiz => quiz.title.toLowerCase().includes(query.title.toLowerCase()));
            const findQuizzesByTopicAndByTitle = findQuizzesByTitle.filter(quiz => quiz.topic.toLowerCase() === query.topic.toLowerCase());

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `Search by Title "${query.title}" in Topic "${query.topic}". Found quizzes number: ${findQuizzesByTopicAndByTitle.length}`, data: findQuizzesByTopicAndByTitle }));
        }
    }

    if (query.username && req.method === 'GET') { // Get all information for a specific user (username, email, userId, quizzes, (solutions + quizzes)). URL - /data/&&username=${username}
        const findUser = users.find(user => user.username === query.username);

        if (!findUser) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `User with username ${query.username} does not exist!` }));
        }

        const findQuizzes = quizzes.filter(quiz => quiz.quizOwnerId === findUser.userId);
        const findSolutions = solutions.filter(solution => solution.userId === findUser.userId);

        if (findQuizzes.length === 0 && findSolutions.length === 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `User ${query.username} does not have any quizzes or solutions!`, data: { username: findUser.username, email: findUser.email, userId: findUser.userId, } }));
        }

        const data = {
            username: findUser.username,
            email: findUser.email,
            userId: findUser.userId,
            quizzesOwnedByTheUser: findQuizzes,
            solutionsAndTheirQuizzes: []
        }

        if (findQuizzes.length !== 0 && findSolutions.length === 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `User ${query.username} does not have any solutions yet, but owns ${findQuizzes.length} quizzes!`, data }));
        }

        const solutionsAndTheirQuizzes = [];

        findSolutions.forEach(solution => {
            const findQuizForEachSolution = quizzes.find(quiz => quiz.quizId === solution.quizId); // There should always be a quiz for each solution!
            solutionsAndTheirQuizzes.push({ solution, quiz: findQuizForEachSolution });
        });

        data.solutionsAndTheirQuizzes = solutionsAndTheirQuizzes;

        if (findQuizzes.length === 0 && findSolutions.length !== 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `User ${query.username} does not have any quizzes yet, but has ${findSolutions.length} solutions!`, data }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: `User ${query.username} has ${findQuizzes.length} quizzes and also has ${findSolutions.length} solutions!`, data }));
    }

    if (query.quizIdDelete && req.method === 'DELETE') { // Delete a specific quiz and all of it questions and solutions (if any). Authorization required. URL - /data/&&quizIdDelete=${quizId}
        const quizId = query.quizIdDelete;

        const findQuiz = quizzes.find(quiz => quiz.quizId === quizId);

        if (!findQuiz) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Quiz with the given ID does not exist!' }));
        }

        if (!req.headers['x-authorization']) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Authorization required!' }));
        }

        const findUser = users.find(user => user.accessToken === req.headers['x-authorization']);

        if (!findUser) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Authorization failed! Wrong Access Token!' }));
        }

        if (findQuiz.quizOwnerId !== findUser.userId) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `User ${findUser.username} is not the creator of the quiz ${findQuiz.title}!` }));
        }

        questions = questions.filter(question => question.quizId !== findQuiz.quizId);

        solutions = solutions.filter(solution => solution.quizId !== findQuiz.quizId);

        const indexOfFindQuiz = quizzes.indexOf(findQuiz);
        quizzes.splice(indexOfFindQuiz, 1);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: `Successfully deleted quiz with title: ${findQuiz.title}, and all of it questions and solutions if there were any!` }));
    }

    if (query.questionIdDetails && req.method === 'GET') { // Get a specific question. URL - /data/&&questionIdDetails=${questionId}
        const questionId = query.questionIdDetails;

        const findQuestion = questions.find(question => question.questionId === questionId);

        if (!findQuestion) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Question with the given ID does not exist!' }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: `Found question with text: ${findQuestion.text}`, data: findQuestion }));
    }

    if (req.url === '/data/questions' && req.method === 'PUT') { // Edit an existing question, requires correct questionId in the body. Authorization required.
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);

                if (!req.headers['x-authorization']) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Authorization required!' }));
                }

                const findUser = users.find(user => user.accessToken === req.headers['x-authorization']);

                if (!findUser) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Authorization failed! Wrong Access Token!' }));
                }

                if (!parsedBody.text.trim() || !parsedBody.answers || (!parsedBody.correctIndex && parsedBody.correctIndex !== 0) || !parsedBody.questionId) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Required body keys: text, answers, correctIndex, questionId' }));
                }

                if (typeof parsedBody.text !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Text must be a string!' }));
                }
                const isValidAnswers = Array.isArray(parsedBody.answers) && parsedBody.answers.every(question => typeof question === 'string' && question !== '');

                if (!isValidAnswers) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Answers must be an array of non empty strings!' }));
                }

                if (parsedBody.answers.length < 2) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Answers must be atleast two!' }));
                }

                if (typeof parsedBody.correctIndex !== 'number') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Correct index must be a number!' }));
                }

                if (parsedBody.correctIndex < 0 || parsedBody.correctIndex >= parsedBody.answers.length) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Correct Index must be in the range of answers array!' }));
                }

                const findQuestion = questions.find(question => question.questionId === parsedBody.questionId);

                if (!findQuestion) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Question with the provided ID does not exist!' }));
                }

                const findQuiz = quizzes.find(quiz => quiz.quizId === findQuestion.quizId);

                if (findUser.userId !== findQuiz.quizOwnerId) {
                    res.writeHead(403, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: `You are not the creator of the question with Text: ${findQuestion.text} in the quiz: ${findQuiz.title}!` }));
                }

                const editQuestion = {
                    text: parsedBody.text.trim(),
                    answers: parsedBody.answers,
                    correctIndex: parsedBody.correctIndex,
                    questionId: findQuestion.questionId,
                    quizId: findQuestion.quizId
                };

                const indexOfFindQuestion = questions.indexOf(findQuestion);
                questions.splice(indexOfFindQuestion, 1, editQuestion);

                const currentDate = new Date();
                findQuiz.quizEditedOnDate = currentDate;

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: `Successfully edited question for Quiz: ${findQuiz.title}`, data: editQuestion }));
            }
            catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid format!' }));
            }
        });
        return;
    }

    if (query.questionIdDelete && req.method === 'DELETE') { // Delete a specific question. Authorization required. URL - /data/&&questionIdDelete=${questionId}
        const questionId = query.questionIdDelete;

        const findQuestion = questions.find(question => question.questionId === questionId);

        if (!findQuestion) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Question with the given ID does not exist!' }));
        }

        if (!req.headers['x-authorization']) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Authorization required!' }));
        }

        const findUser = users.find(user => user.accessToken === req.headers['x-authorization']);

        if (!findUser) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Authorization failed! Wrong Access Token!' }));
        }

        const findQuiz = quizzes.find(quiz => quiz.quizId === findQuestion.quizId);

        if (findQuiz.quizOwnerId !== findUser.userId) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `User ${findUser.username} is not the creator of the quiz ${findQuiz.title}!` }));
        }

        const indexOfFindQuestion = questions.indexOf(findQuestion);
        questions.splice(indexOfFindQuestion, 1);

        const currentDate = new Date();
        findQuiz.questionCount--;
        findQuiz.quizEditedOnDate = currentDate;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: `Successfully deleted question with text: ${findQuestion.text}` }));
    }

    if (query.quizIdCheckSolution && req.method === 'GET') { // Get a specific solution. Authorization required. URL - /data/&&quizIdCheckSolution=${quizId}
        // this request is to check if a user is logged in and is not the creator of the quiz, so it will determine if the user can solve or can't solve the quiz

        if (!req.headers['x-authorization']) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Authorization required!' }));
        }

        const findUser = users.find(user => user.accessToken === req.headers['x-authorization']);

        if (!findUser) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Authorization failed! Wrong Access Token!' }));
        }
        const quizId = query.quizIdCheckSolution;

        const findQuiz = quizzes.find(quiz => quiz.quizId === quizId);

        if (!findQuiz) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Quiz with the given ID does not exist!' }));
        }

        if (findQuiz.quizOwnerId === findUser.userId) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `User ${findUser.username} is the creator of the quiz ${findQuiz.title}, so he can't solve it!`, data: 0 }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: `User ${findUser.username}, is not the creator of the quiz ${findQuiz.title}, so he can solve it!`, data: 1 }));
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'There is nothing here' }));
});

const port = 5001;
server.listen(port);

console.log(`Server is listening on port ${port}`);