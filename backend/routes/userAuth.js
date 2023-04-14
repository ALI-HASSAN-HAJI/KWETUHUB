import express from 'express';
import jwt from 'jsonwebtoken';// it gives yout a long string(token), when you have this string the system knows your authenticated.
import bcrypt from 'bcrypt';// It hashes or encrypts users password before storing in the db for securtiy purposes
import userModel from '../models/userModel.js';
import checkAuth from './checkAuth.js';


const router = express.Router(); 
const saltRound = 10;



router.get('/users', checkAuth, async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

router.post('/signin', async (req, res) => {
   console.log(req.body)
  try {
    if(req.body.email && req.body.password) {
      const user = await userModel.findOne({email: req.body.email });
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if(response === true) {
          const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
          res.send({
            token: token,
            message: 'User authenticated' 
          });
        }else {
          res.send({error: 'Invalid password or email'})
        }
      })
    }else{
      res.send({error: 'Must provide email and password'});
    }
  
  } catch (error) {
    res.send(error.message)
  }
})


router.post('/signup', (req, res) => {
  console.log(req.body)
  bcrypt.hash(req.body.password, saltRound, async (err, hash) => {
    if(err){
      res.send(err);
    }
    try {
      const newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        countryCode: req.body.countryCode
      });
      let result = await newUser.save();
      const token = jwt.sign({userId: result._id}, 'MY_SECRET_KEY');
      res.send({
        data: result,
        token: token,
        massage: 'Created account successfully!'
      });
    } catch (error) {
      res.send(error.message)
    }
  })
})


export default router;