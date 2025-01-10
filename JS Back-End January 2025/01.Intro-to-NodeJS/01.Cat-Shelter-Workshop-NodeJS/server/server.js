import http from "http";
import querystring from "querystring";

const cats = [
    {
        id: 1,
        imageUrl: 'https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=',
        name: 'Pretty Kitty',
        breed: 'Bombay',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
        id: 2,
        imageUrl: 'https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=',
        name: 'Navcho',
        breed: 'Persian',
        description: 'A talkative and affectionate cat with striking yellow eyes.',
    },
    {
        id: 3,
        imageUrl: 'https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=',
        name: 'Sisa',
        breed: 'Siamese',
        description: 'Loves to cuddle and nap. Requires regular grooming for its luxurious coat.',
    },
    {
        id: 4,
        imageUrl: 'https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=',
        name: 'Garry',
        breed: 'Bombay',
        description: 'Mysterious and elegant. Often found lounging in sunny spots.',
    },
];

const breeds = [
    "Persian",
    "Siamese",
    "Bombay",
    "Maine Coon",
    "Unknown",
];

const port = 5001;

const server = http.createServer((req, res) => {
    const url = req.url;

    // Set CORS headers to allow cross-origin requests
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify a domain)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization'); // Allowed headers

    if (req.method === "OPTIONS") {
        res.writeHead(204); // No Content
        res.end();
        return;
    }

    if (url === "/getAllCats") { // Gets all cats.
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(cats));
    }
    else if (url === "/getAllBreeds") { // Gets all breeds.
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(breeds));
    }
    else if (url === "/addBreed" && req.method === "POST") { // Adds breed.
        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            const newBreed = JSON.parse(data).breed;
            
            if (newBreed === "") {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Breed name is required." }));
                return;
            }
            else {
                res.statusCode = 201;
                breeds.push(newBreed);
                res.end(JSON.stringify({ message: "Breed added successfully!" }));
                return;
            }
        });
    }
    else if (url === "/addCat" && req.method === "POST") { // Adds cat.
        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            const catData = JSON.parse(data);

            if (catData.name === "" || catData.description === "" || catData.imageUrl === "" || catData.breed === "") {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "All fields are required!" }));
            }
            else {
                const newCat = {
                    name: catData.name,
                    description: catData.description,
                    imageUrl: catData.imageUrl,
                    breed: catData.breed,
                    id: cats.length + 1,
                };
                
                cats.push(newCat);
                
                res.statusCode = 201;
                return res.end(JSON.stringify({ message: "Cat added successfully!" }));
            }
        });
    }
    else if (url === "/editCat" && req.method === "PUT") { // Edits cat by id.
        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            const parsedData = JSON.parse(data);

            const catIndex = cats.indexOf(cats.find(cat => cat.id === parsedData.id));

            if (catIndex >= 0 && catIndex < cats.length) {
                const newCat = {
                    name: parsedData.name,
                    description: parsedData.description,
                    imageUrl: parsedData.imageUrl,
                    breed: parsedData.breed,
                    id: parsedData.id,
                };

                cats[catIndex] = newCat;
                return res.end(JSON.stringify({ message: "Cat edited successfully!" }));
            }
            else {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: "Cat not found" }));
            }
        });
    }
    else if (url === "/shelterCat" && req.method === "DELETE") { // Deletes cat by id.
        let data = "";
        
        req.on("data", (chunk) => {
            data += chunk;
        })

        req.on("end", () => {
            const catId = JSON.parse(data).id;
            const indexToDelete = cats.indexOf(cats.find(cat => cat.id === catId));
            
            if (indexToDelete >= 0 && indexToDelete < cats.length) {
                cats.splice(indexToDelete, 1);
                return res.end(JSON.stringify({ message: "Cat sheltered successfully!" }));
            }
            else {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: "Cat not found" }));
            }
        });
    }
    
    const query = querystring.parse(req.url);
    
    if (query["search"] && req.method === "GET") { // Searches for a cat by string of it.
        const searchValue = query["search"].toLowerCase();

        if (searchValue === "show_everything") {
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify(cats));
        }
        else {
            const foundMatch = cats.filter(cat => {
                return cat.name.toLowerCase().includes(searchValue);    
            });

            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify(foundMatch));
        }
    }
    else if (query["catId"] && req.method === "GET") { // Returns cat data by id.
        const catId = query["catId"];
        const cat = cats.find(cat => cat.id === Number(catId));
        
        if (cat) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(cat));
        }
        else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Cat not found!" }));
        }
    }
});

server.listen(port);

console.log(`Server listening on http://localhost:${port}...`);