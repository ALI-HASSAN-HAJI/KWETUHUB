import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import adminModel from '../models/adminModel.js';


const router = express.Router();
const saltRound = 12;

// THis is a middleware function and it should always be above the middleware;
const confirmAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization) {
    return res.status (401).send({error: 'You must be logged in!'})
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, data) => {
    if(err) {
      res.send('You must be logged in')
    }
    const { adminId } = data;
    const admin = await adminModel.findOne({_id: adminId});
    req.admin = admin;
    next();
  });
}

router.get('/admins', confirmAuth, async (req, res) => {
  const admins = await adminModel.find();
  res.send(admins)
})


// SignUp fr Admin
router.post('/signup', (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, saltRound, async (err, hash) => {
    if(err) {
      res.send(err);  
    }
    try {
      const newAdmin = new adminModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        phoneNumber: req.body.phoneNumber
      });
      let result = await newAdmin.save();
      const token = jwt.sign({adminId: result._id}, 'MY_SECRET_KEY');
      res.send({
        data: result,
        token: token,
        message: 'Created account successfully!'
      });
    } catch (error) {
      res.send(error.message)
    }
  });
});


// Signin for Admin
router.post('/signin', async (req, res) => {
  if(req.body.email && req.body.password) {
    const admin = await adminModel.findOne({email: req.body.email});
    bcrypt.compare(req.body.password, admin.password, (err, response) => {
      if(response === true) {
        const token = jwt.sign({adminId: admin._id}, 'MY_SECRET_KEY');
        res.send({
          token: token,
          message: 'User authonticated'
        });
      } else {
        res.send({error: 'Invalid Password or Email'})
      }
    })
  } else {
    res.send({error: 'Must Provide Email and Password'});
  }
})


export default router;
