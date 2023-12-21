const jwt = require('jsonwebtoken');

const adminauthMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded; // Add decoded user info to the request

    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = adminauthMiddleware;