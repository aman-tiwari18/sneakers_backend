const router = require("express").Router();

const userController = require("../controllers/usersControllers");

const {verifyToken} = require("../middlware/verifyToken")


// router.get('/', verifyToken, userController.getUser)
// router.delete('/', verifyToken, userController.delete);


router.route("/").get(verifyToken, userController.getUser);
router.route("/:id").delete(verifyToken, userController.delete);


module.exports = router;