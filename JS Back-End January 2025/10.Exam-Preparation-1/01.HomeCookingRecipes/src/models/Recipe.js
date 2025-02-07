import { Schema, model, Types } from "mongoose";

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
    },
    ingredients: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 200
    },
    instructions: {
        type: String,
        required: true,
        minLength: 10
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100
    },
    image: {
        type: String,
        required: true,
        match: /^(https?:\/\/)(\S+)$/
    },
    recommendList: [{
        type: Types.ObjectId,
        ref: "User",
    }],
    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const Recipe = model("Recipe", recipeSchema);
export default Recipe;