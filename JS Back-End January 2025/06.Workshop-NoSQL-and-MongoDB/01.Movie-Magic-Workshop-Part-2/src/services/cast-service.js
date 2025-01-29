import Cast from "../models/Cast.js";

export async function getAllCast(filter = {}) {
    let query = Cast.find({});

    console.log();

    if (filter.exclude) {
        query = query.find({ _id: { $nin: filter.exclude.map(({character, castData}) => castData) } });
    }

    return await query.lean();
}