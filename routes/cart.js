const router = require("express").Router();

const cartController = require("../controllers/cartControllers");


const {verifyToken} = require("../middlware/verifyToken")





// router.route("/find/").get(verifyToken, cartController.getCart);
// router.route("/").post(verifyToken, cartController.addCart);
// router.route("/").delete(verifyToken, cartController.deleteCartItem);

router.post("/",verifyToken, cartController.addToCart);
router.get("/:userId", verifyToken, cartController.getCart);
router.delete("/:userId", verifyToken, cartController.deleteCart);
router.delete("/:userId/:productId", cartController.deleteCartItem); // New route




module.exports = router;