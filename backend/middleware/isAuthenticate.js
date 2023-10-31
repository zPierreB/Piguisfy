import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { findOneByEmailAndId } from '../models/user.model.js'

const isAuthenticated = (req, res, next) => {

  const token = getTokenFromHeaders(req);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized token' });
  }
  
  jwt.verify(token, process.env.TOKEN_SECRET, async(err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized verify' });
    }
  
    req.payload = decoded;

    const checkUser = await findOneByEmailAndId([req.payload.email, req.payload.id])
    if(checkUser.length < 1) {
      return res.status(401).json({ message: 'User uncheck' });
    }

    req.user = checkUser[0];
    console.log('req.user: ', req.user)
    next();
  });
};

function getTokenFromHeaders(req) {
  console.log(req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }

  return null;
}

export default isAuthenticated; getTokenFromHeaders;
