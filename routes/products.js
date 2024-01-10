const router = require('express').Router();
const productController = require("../controllers/productControllers");

router.post('/', productController.createProduct);
router.get('/', productController.getAllProduct);
router.get('/:id', productController.getProduct);
router.get('/search/:key', productController.searchProducts);


module.exports = router;
