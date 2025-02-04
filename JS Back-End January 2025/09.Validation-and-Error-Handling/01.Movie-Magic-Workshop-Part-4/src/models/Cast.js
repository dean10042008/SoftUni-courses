import { Schema, model } from "mongoose";
import { validator } from "../services/common-service.js";

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        match: /([a-zA-Z0-9]+)/,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120,
    },
    born: {
        type: String,
        required: true,
        minLength: 10,
        match: /([a-zA-Z0-9]+)/,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator,
            message: "Image URL must be a valid URL."
        }
    }
});

const Cast = model("Cast", castSchema);

export default Cast;