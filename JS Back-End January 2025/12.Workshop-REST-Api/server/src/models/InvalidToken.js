import { model, Schema } from "mongoose";

const ivalidTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        index: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 2 * 60 * 60,
    }
}, {
    timestamps: true,
});

const InvalidToken = model('InvalidToken', ivalidTokenSchema);

export default InvalidToken;
