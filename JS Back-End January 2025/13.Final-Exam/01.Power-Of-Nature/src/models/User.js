import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        minLength: 10
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    }
});

userSchema.pre('save', async function () {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = model("User", userSchema);
export default User;