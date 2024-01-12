const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const crypto = require("crypto")


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: {
        type: String,
        default: "India",
    }

    


}, { timestamps: true });

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10)
}

next()

});



// Compare user password
UserSchema.methods.matchPassword = async function (password) {
    console.log("filled password", this.password)
    console.log("user password", password);
    return await bcrypt.compare(password, this.password);

}

// Return JWT token
UserSchema.methods.generateToken = async function(){
    return jwt.sign({_id: this._id},process.env.JWT_SECRET);
}



module.exports = mongoose.model("User", UserSchema);