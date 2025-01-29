import Movie from "../models/Movie.js";

export async function getAll() {
    return await Movie.find().lean();
}