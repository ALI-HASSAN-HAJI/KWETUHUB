import express from 'express';
import multer from 'multer';
import productModel from '../models/productModel.js';
import fs from 'fs';
import checkAuth from './checkAuth.js';
import userModel from '../models/userModel.js';


const router = express.Router();

// Getting one product
router.get('/:id', async (req, res) => {
  let id = req.params.id;
  const result = await productModel.findOne({_id: id})
  res.send(result)
});

// Getting all the products
router.get('/', async (req, res) => {
  let product = await productModel.find();
  res.send(product);
});

// Creating Products;

const upload = multer({ dest: 'uploads/'});
const uploadProductImages = upload.fields([
  {name: 'image', maxCount: 1},
  {name: 'images', maxCount: 4}
])


router.post('/create', uploadProductImages, async (req, res) => {
   console.log(req.files.image[0])
   let img = req.files.image[0]
   let fileType = (img.mimetype).split('/')[1];
   let newFileName = img.filename + '.' + fileType;
   fs.rename(`./uploads/${img.filename}`, `./uploads/${newFileName}`, () => {
    console.log('File renamed successfully!!');
   });
   // Uploading Multiple images;

   let multipleImages = req.files.images
   let imagesArray = multipleImages.map((image) => {
    let mFileType = (image.mimetype).split('/')[1];
    let mNewFileName = image.filename + '.' + mFileType;
    fs.rename(`./uploads/${image.filename}`, `./uploads/${mNewFileName}`, () => {
      console.log("Files renamed Successfully!!")
    });
    return mNewFileName;
   })
   console.log(imagesArray);
   const newProduct = new productModel({
    name: req.body.name,
    image: newFileName,
    images: imagesArray,
    price: req.body.price,
    currency: req.body.currency,
    quantity: req.body.quantity,
    category: req.body.category,
    discount_percentage: req.body.discount_percentage
  })
  let result = await newProduct.save();
  res.send(result);
});


// Updating Products apart from image and images;
router.post('/update/:id', async (req, res) => {
  console.log(req.body);
  const product = await productModel.findOne({_id: req.params.id});
  product.name = req.body.name;
  product.price = req.body.price;
  product.currency = req.body.currency;
  product.quantity = req.body.quantity;
  product.category = req.body.category;
  const result = await product.save() 
  res.send(result)
})


router.post('/addtocart/:id', checkAuth, async (req, res) => {
  let productId = req.params.id
  console.log(req.user.id) 
  const user = await userModel.findOne({_id: req.user.id});
  let inCart = false
  user.cart.forEach((product) => {
    if(product._id === productId) {
      inCart = true
    }
  })
  if(inCart === true) {
    res.send({message: 'Item already in cart'})
  } else {
  user.cart = [...user.cart, {_id: productId, quantity: req.body.quantity}];
  const result = await user.save() 
  res.send({message: 'Added to cart successfully!!', data: result});
  }
  
})

// Deleting product;
router.post('/delete/:id', async (req, res) => {
  let id = req.params.id;
  await productModel.deleteOne({_id: id});
  res.send("Product has beeen deleted successfully");
})










export default router;
