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
    products = [...products, product]
  }
  console.log(products)
  res.send({
    message: 'Fetched cart successfully',
    data: products
  })
})



export default router;