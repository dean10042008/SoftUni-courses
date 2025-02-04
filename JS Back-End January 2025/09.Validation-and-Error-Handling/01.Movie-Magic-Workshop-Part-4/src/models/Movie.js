import { Schema, model, Types } from "mongoose";
import { validator } from "../services/common-service.js";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        match: /([a-zA-Z0-9]+)/,
    },
    category: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        minLength: 5,
        match: /([a-zA-Z0-9]+)/,
    },
    director: {
        type: String,
        required: true,
        minLength: 5,
        match: /([a-zA-Z0-9]+)/,
    },
    year: {
        type: Number,
        min: 1900,
        max: 2025,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        match: /([a-zA-Z0-9]+)/,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator,
            message: "Image URL must be a valid URL."
        }
    },
    creatorId: {
        type: String,
        required: true,
    },
    // cast: [{
    //     type: Types.ObjectId,
    //     ref: "Cast",
    //     required: false,
    // }]
    cast: [{
        _id: false,
        character: {
            type: String,
            required: true,
            minLength: 5,
            match: /([a-zA-Z0-9]+)/,
        },
        castData: {
            type: Types.ObjectId,
            ref: "Cast",
            required: false
        },
    }]
});

const Movie = model("Movie", movieSchema);

export default Movie;