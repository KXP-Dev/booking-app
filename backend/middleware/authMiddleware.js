const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Verify the token using the JWT secret from your environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user's details to the request object
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error();
    }
    
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized to access this resource' });
  }
};

module.exports = authMiddleware;