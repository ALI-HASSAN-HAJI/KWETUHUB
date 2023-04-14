import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';


// This is a middleware function
const checkAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization) {
    return res.status(401).send({error: 'You must be logged in!'})
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, data) => {
    console.log(data)  
    if(err) {
      res.send('You must be logged in')
    }
    const {userId} = data;
    const user = await userModel.findOne({_id: userId}); 
    req.user = user;
    next();
  })
}

export default checkAuth;