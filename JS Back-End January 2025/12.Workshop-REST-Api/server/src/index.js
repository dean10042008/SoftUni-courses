import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes.js';
import { auth } from './middlewares/authMiddleware.js';

const app = express();

try {
    const uri = 'mongodb://localhost:27017/furnitures'
    await mongoose.connect(uri);

    console.log('DB connected successfully! ');
} catch (err) {
    console.log('Connection to DB failed!');
    console.log(err.message);
}

// Setup CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');

//     next();
// });
app.use(express.json());
app.use(cors());
app.use(auth);

app.use(routes);

app.listen(3030, () => console.log('RESTful server is running on http://localhost:3030...'))
