import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        match: /@([a-zA-Z0-9]+).([a-zA-Z0-9]+)$/
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        match: /[a-zA-Z0-9]{6,}/,
    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", userSchema);

export default User;