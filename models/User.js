const mongoose = require("mongoose");
const { type } = require("os");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: {
        type: String,
        default: "India",
    }

    


}, { timestamps: true });


module.exports = mongoose.model("User", UserSchema);