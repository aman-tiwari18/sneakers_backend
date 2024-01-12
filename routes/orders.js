const router = require("express").Router();

const orderController = require("../controllers/ordersController");

const {verifyToken} = require("../middlware/verifyToken")


// router.get('/', verifyToken, userController.getUser)
// router.delete('/', verifyToken, userController.delete);


router.route("/").get(verifyToken,orderController.getUserOrders);
// router.route("/:id").delete(verifyToken, userController.delete);


module.exports = router;