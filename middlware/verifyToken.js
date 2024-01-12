const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken =
//     (req, res, next) => {
//     const authHeader = req.headers.token;

//     if (authHeader) {
//         const token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
//             if (err) {
//                 console.error("Error verifying token:", err);
//                 return res.status(403).json({ error: "Token is not valid!" });
//             }
//             req.user = user;
//             next();
//         });
//     } else {
//         return res.status(401).json("You are not authenticated!");
//     }
    // }
    async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { verifyToken };
