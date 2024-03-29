const User = require("../models/User");


module.exports = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const { password, __v, updatedAt, createdAt, ...userData } = user._doc;

            res.status(200).json(userData);

        } catch (error) {

            res.status(500).json({ error: "Error in getting user" });
            
        }
    },


    delete: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.user.id);
            res.status(200).json(" User succesfully deleted");
            
        } catch (error) {
            res.status(500).json({
                error: "Error in deleting User"
            })
        }
    }
}