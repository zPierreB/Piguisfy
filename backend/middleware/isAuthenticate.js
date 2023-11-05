import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { findOneByEmailAndId } from '../models/user.model.js'

const isAuthenticated = async (req, res, next) => {

  const token = await getTokenFromHeaders(req);
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
    next();
  });
};

function getTokenFromHeaders(req) {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    return token;
  }

  return null;
}

export default isAuthenticated; getTokenFromHeaders;
