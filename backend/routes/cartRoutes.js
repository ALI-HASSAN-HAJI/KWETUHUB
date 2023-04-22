import express from 'express';
import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js';
import checkAuth from './checkAuth.js';

const router = express.Router();

router.get('/getitems', checkAuth, async (req, res) => {
  console.log(req.user)
  let cartItems = req.user.cart

  let products = []

  for(let i = 0; i < cartItems.length; i++) {
    let product = await productModel.findOne({_id: cartItems[i]._id})
    products = [...products, {product, cartQuantity: cartItems[i].quantity}]
  }
  console.log(products)
  res.send({
    message: 'Fetched cart successfully',  
    data: products
  });
});

router.post('/remove/:id', checkAuth, async (req, res) => {
// get product id
// get user
let productId = req.params.id; 
const user = await userModel.findOne({_id: req.user._id});
const cart = user.cart;

let newCart = [];
let i;
for(i = 0; i < cart.length; i++) {
  if(cart[i]._id !== productId) {
    newCart = [...newCart, cart[i]]
  }
}
console.log(newCart);
user.cart = newCart;
const doc = await user.save();
console.log(doc)
res.send({
  message: 'removed from cart successfully!',
  data: doc
});

});

router.post('/checkout', checkAuth, async (req, res) => {
  // reduce quantity from stock for each product

  let cart = req.user.cart
  let i;
  for(i = 0; i < cart.length; i++) {
    let product = await productModel.findOne({_id: cart[i]._id}); 
    product.quantity = product.quantity - cart[i].quantity;
    let doc = await product.save();
    console.log(doc)
  }
  // remove everything from cart
  const user = await userModel.findOne({_id: req.user._id});
  user.cart = [];
  const userDoc = await user.save();
  res.send({
    message: 'Checked out successfully',
    data: userDoc
  })
})

export default router;