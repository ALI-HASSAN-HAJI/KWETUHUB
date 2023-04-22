import express from 'express';
import userModel from '../models/userModel.js';
import pickupPointModel from '../models/pickUpPointModel.js';
import checkAuth from './checkAuth.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const pickupPoints = await pickupPointModel.find();
    res.send({
      message: 'Pickup points fetched successfully',
      data: pickupPoints
    })
  } catch (error) {
    console.log(error)
    res.send({
      message: error.message
    });
  }
});


router.post('/create', async (req, res) => {
  try {
    const newPickupPoint = new pickupPointModel({
      name: req.body.name,
      location: req.body.location,
      lat: req.body.lat,
      long: req.body.long
    })
     const data = await newPickupPoint.save();
     res.send({
      message: 'Pickup point added successfully',
      data: data
     })
  } catch (error) {
    console.log(error)
    res.send({
      message: error.message
    });
  }
});


export default router;