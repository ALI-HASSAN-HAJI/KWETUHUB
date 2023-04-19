import express from 'express';
import categoryModel from '../models/categoryModel.js';


const router = express.Router();

router.get('/', async (req, res) => {
try {
  const categories = await categoryModel.find();
  res.send({
    message: 'Categories fetched successfully!',
    data: categories
  });
} catch (error) {
  console.log(error)
  res.send({
    message: error.message
  });
}
});

router.get('/:id', async (req, res) => {
  try {
    const categories = await categoryModel.find({_id: req.params.id});
    res.send({
      message: 'Category fetched successfully!',
      data: category
    });
  } catch (error) {
    console.log(error)
    res.send({
      message: error.message
    });
  }
});

router.post('/create', async (req, res) => {
  try {
    const newCategory = new categoryModel({
      name: req.body.name
    })
    const data = await newCategory.save();
    res.send({
      message: 'Category added successfully',
      data: data
    })
  } catch (error) {
    console.log(error)
    res.send({
      message: error.message
    });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const category = await categoryModel.find({_id: req.params.id});
    category.name = req.body.name;
    const data = await category.save();
    res.send({
      message: 'Category updated successfully!',
      data: data
    })
  } catch (error) {
    console.log(error)
    res.send({
      message: error.message
    });
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await category.deleteOne({_id: req.params.id});
    res.send({
      message: 'Category deleted successfully!',
    });
  } catch (error) {
    console.log(error)
    res.send({
      message: error.message
    })
  }
})



export default router;