const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const verifyJWT = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Middleware to verify session
const verifySession = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ error: 'Access denied. No valid session.' });
};

// Middleware that accepts either JWT or session authentication
const authenticate = async (req, res, next) => {
  // First try JWT authentication
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (user) {
        req.user = user;
        req.authMethod = 'jwt';
        return next();
      }
    } catch (error) {
      // JWT failed, continue to session check
    }
  }

  // If JWT fails or no token, try session authentication
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        req.user = user;
        req.authMethod = 'session';
        return next();
      }
    } catch (error) {
      // Session user lookup failed
    }
  }

  // Both authentication methods failed
  return res.status(401).json({ error: 'Access denied. Please login.' });
};

module.exports = {
  verifyJWT,
  verifySession,
  authenticate
};
