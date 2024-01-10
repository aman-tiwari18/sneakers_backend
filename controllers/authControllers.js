const User = require("../models/User");

const CryptoJS = require("crypto-js");
const { decrypt } = require("dotenv");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
            location: req.body.location
        });

        try {
            await newUser.save();
            res.status(201).json({message: "User created scuccessfully"});
        } catch (error) {
            res.status(500).json({"Error in creating new User" : error.message});
        }

        
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user || !user.password) {
                return res.status(401).json("User not found or password not set");
            }

            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const thepassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

            if (thepassword !== req.body.password) {
                return res.status(401).json("Wrong password");
            }

            const userToken = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET, { expiresIn: "21d" });

            const { password, __v, createdAt, updatedAt, ...others } = user._doc;
            console.log("Generated token:", userToken)
            res.status(200).json({ ...others, userToken });

        } catch (error) {
            res.status(500).json({ "Error in login": error.message });
        }
    }
}


