import { Schema, model } from "mongoose";
import { validator } from "../services/common-service.js";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear(),
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator,
            message: "Image URL must be a valid URL."
        }
    },
    cast: [{
        type: Schema.Types.ObjectId,
        ref: "Cast",
        required: false,
    }]
});

const Movie = model("Movie", movieSchema);

export default Movie;