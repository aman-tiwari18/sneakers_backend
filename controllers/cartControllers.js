// const Product = require("../models/Product");
// const Cart = require("../models/Cart");


// module.exports = {
//     addCart: async (req, res) => {
//         const userId = req.user.id;
//         const { cartItem, quantity } = req.body;

//         try {
//             const cart = await Cart.findOne({ userId });
//             if (cart) {
//                 const existingProduct = cart.products.find(
//                     (product) => product.cartItems.toString() === cartItem
//                 );

//                 if (existingProduct) {
//                     existingProduct.quantity += quantity;

//                 } else {
//                     cart.products.push({ cartItems, quantity: 1 })
//                 }

//                 await cart.save();
//                 res.status(200).json("Product added to cart");;

//             } else {
//                 const newCart = new Cart({
//                     userId,
//                     products: [
//                         { cartItems, quantity: 1 }
//                     ]
//                 })
//                 await newCart.save();
//                 res.status(200).json("Product added to cart");
//             }
//         } catch (error) {
//             res.status(500).json({error :"Error in adding the cart"}, error)
//         }


//     },


//     getCart: async (req, res) => {
//         const userId = req.user.id;

//         try {
//             const cart = await Cart.find({ userId });
//             res.status(200).json(cart);
            
//         } catch (error) {
//             res.status(500).json({ error: "Error in getting cart" });
//         }
//     },

//     deleteCartItem: async (req, res) => {
//         const cartItemId = req.params.cartItem;

//         try {
//             const updatedCart = await Cart.findByIdAndUpdate(
//                 { 'products._id': cartItemId },
//                 { $pull: { products: { _id: cartItemId } } },
//                 { new: true }
//             );

//             if (!updatedCart) {
//                 res.status(404).json({ message: "cart item not found" });
//             }

//             res.status(200).json(updatedCart);
//         } catch (error) {
//             res.status(500).json({ error: "Error in deleting cart" }, error);
//         }
        
//     }
// }


// controllers/cartController.js
const Cart = require("../models/Cart");

const cartController = {
  addToCart: async (req, res) => {
        try {
            console.log("called controller");
      const { userId, productId, quantity } = req.body;

      let cart = await Cart.findOne({ userId });

      if (!cart) {
        // If the user's cart doesn't exist, create a new one
        cart = new Cart({ userId, products: [{ cartItems: productId, quantity }] });
      } else {
        // If the user's cart already exists, update it
        const existingProduct = cart.products.find((item) => item.cartItems.equals(productId));

        if (existingProduct) {
          // If the product is already in the cart, update the quantity
          existingProduct.quantity += quantity;
        } else {
          // If the product is not in the cart, add it
          cart.products.push({ cartItems: productId, quantity });
        }
      }

      await cart.save();

      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ userId }).populate("products.cartItems");

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOneAndDelete({ userId });

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      res.json({ message: "Cart deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
    },
  
  deleteCartItem: async (req, res) => {
    try {
      const { userId, productId } = req.params;

      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      const updatedProducts = cart.products.filter((item) => !item.cartItems.equals(productId));

      cart.products = updatedProducts;

      await cart.save();

      res.json(cart,{message: "deleted item"});
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

};

module.exports = cartController;
