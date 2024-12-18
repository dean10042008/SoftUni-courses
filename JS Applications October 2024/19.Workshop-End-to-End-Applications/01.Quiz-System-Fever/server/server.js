const http = require('http');
const querystring = require('querystring');

const users = [
    {
        username: 'admin',
        email: 'admin@quiz.com',
        password: '1234',
        userId: '1'
    },
    {
        username: "1",
        email: "1",
        password: "1",
        userId: "eb892aad-fc0f-4356-bee3-4fd9ba6f3107"
    },
    {
        username: "2",
        email: "2",
        password: "2",
        userId: "newUserId"
    }
];

const quizzes = [
    {
        quizCreatedOn: 1734191778,
        quizId: "8cd51d40-f716-4397-ae3f-39ba6a880d05",
        quizOwnerId: "eb892aad-fc0f-4356-bee3-4fd9ba6f3107",
        title: "Title Test 1",
        topic: "Languages",
        questionCount: 0,
        takenCount: 0,
        quizOwnerUsername: "Gosho",
        description: "Description Test"
    },
    {
        quizCreatedOn: 1734192028,
        quizId: "6f5071cd-0ce8-462e-822e-28a141987d26",
        quizOwnerId: "eb892aad-fc0f-4356-bee3-4fd9ba6f3107",
        title: "Title Test 2",
        topic: "Hardware",
        questionCount: 3,
        takenCount: 2,
        quizOwnerUsername: "Petko",
        description: "Description Test"
    }
];

let questions = [
    {
        answers: ['1', '2', '3'],
        correctIndex: 1,
        questionId: "0e596b6e-e394-4ae0-a546-89228bd11a3c",
        quizId: "8cd51d40-f716-4397-ae3f-39ba6a880d05",
        text: "Question Test 1"
    }
];

let solutions = [
    {
        quizId: '8cd51d40-f716-4397-ae3f-39ba6a880d05',
        correct: 1,
        userId: 'newUserId',
        solutionId: 'newSolutionId1'
    },
    {
        quizId: '8cd51d40-f716-4397-ae3f-39ba6a880d05',
        correct: 2,
        userId: 'newUserId',
        solutionId: 'newSolutionId2'
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

                if (typeof parsedBody.password !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Password must be a string!' }));
                }

                if (typeof parsedBody.username !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'Username must be a string!' }));
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
            return res.end(JSON.stringify({ message: 'Logout successfull!' }));
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Failed to find user!' }));

    }

    if (req.url === '/users/verify' && req.method === 'GET') { // Get verification for the current user. Authorization required.
        if (!req.headers['x-authorization']) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Authorization required!' }));
        }
        const findUser = users.find(user => user.accessToken === req.headers['x-authorization']);

        if (findUser) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: `Verification successfull. User ${findUser.username} is currently logged-in!` }));
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
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

        // if (questionsForCurrentQuiz.length === 0) {
        //     res.writeHead(404, { 'Content-Type': 'application/json' });
        //     return res.end(JSON.stringify({ message: 'There are no questions yet for this quiz!' }));
        // }

        //If the quiz has no questions yet, an empty array wil be returned in the data.
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

                const findSolution = solutions.find(solution => solution.quizId === findQuiz.quizId && solution.userId === findUser.userId);

                if (findSolution) {
                    res.writeHead(409, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: `User ${findUser.username} has already sent a solution for quiz: ${findQuiz.title}` }));
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

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Solution added successfully!', data: newSolution }));
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

        return res.end(JSON.stringify({ message: 'Worked' }));
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

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'There is nothing here' }));
});

const port = 5001;
server.listen(port);

console.log(`Server is listening on port ${port}`);