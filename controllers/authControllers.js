const User = require("../models/User");

const CryptoJS = require("crypto-js");
const { decrypt } = require("dotenv");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser:
        //     async (req, res) => {
        //     const newUser = new User({
        //         username: req.body.username,
        //         email: req.body.email,
        //         password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
        //         location: req.body.location
        //     });

        //     try {
        //         await newUser.save();
        //         res.status(201).json({message: "User created scuccessfully"});
        //     } catch (error) {
        //         res.status(500).json({"Error in creating new User" : error.message});
        //     }

        
        // },


        async (req, res) => {
            try {
                const { username, email, password, location } = req.body;
                let user = await User.findOne({ email })
                if (user) {
                    return res
                        .status(400)
                        .json({
                            success: false,
                            message: "User already",
                        })
        
                }
                user = await User.create({
                    username,
                    email,
                    password,
                    location,
                })
                const token = await user.generateToken();
                const option = {
                    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                }

                res.status(201).cookie("token", token, option)
                    .json({
                        success: true,
                        message: "congrats",
                        user,
                        token,
                    })

            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
        },
        

    loginUser:
//         async (req, res) => {
//         try {
//             const user = await User.findOne({ email: req.body.email });

//             if (!user || !user.password) {
//                 return res.status(401).json("User not found or password not set");
//             }

//             const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
//             const thepassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

//             if (thepassword !== req.body.password) {
//                 return res.status(401).json("Wrong password");
//             }

//             const userToken = jwt.sign({
//                 id: user._id
//             }, process.env.JWT_SECRET, { expiresIn: "21d" });

//             const { password, __v, createdAt, updatedAt, ...others } = user._doc;
//             console.log("Generated token:", userToken)
//             res.status(200).json({ ...others, userToken });

//         } catch (error) {
//             res.status(500).json({ "Error in login": error.message });
//         }
//     }
    // }
    

    async (req,res)=>{
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email}).select("+password");
            if(!user){
                return res.status(400).json({
                    success: false,
                    message: "User not found",
                })
            }
            const isMatched = await user.matchPassword(password);
            if(!isMatched){
                return res.status(400).json({
                    success: false,
                    message: "Invalid password",
                })
            }
            const token = await user.generateToken();
            const option = {
                expires: new Date(Date.now()+90*24*60*60*1000),
                httpOnly: true,
            }

            res.status(200).cookie("token" ,token, option )
            .json({
                success: true,
                user,
                token,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
}
}


