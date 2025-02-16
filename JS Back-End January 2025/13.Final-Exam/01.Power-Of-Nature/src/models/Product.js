import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    location: {
        type: String,
        required: true,
        minLength: 3,
    },
    year: {
        type: Number,
        required: true,
        min: 0,
        max: 2024,
    },
    type: {
        type: String,
        required: true,
        enum: ["Wildfire", "Flood", "Earthquake", "Hurricane", "Drought", "Tsunami", "Other"]
    },
    description: {
        type: String,
        required: true,
        minLength: 10
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

const Product = model("Product", productSchema);
export default Product;