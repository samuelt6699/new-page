const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (typeof authHeader !== 'undefined') {
    const parts = authHeader.split(' ');

    if (parts.length === 2 && parts[0] === 'Bearer' && parts[1]) {
      const token = parts[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.error("Token verification error:", err);
          return res.status(403).json({ message: "Forbidden: Unable to verify token." }); 
        }

        req.user = user;
        next();
      });
    } else {
      // The header is present but not in the correct 'Bearer token' format
      res.status(401).json({ message: "Unauthorized: Token is malformed or missing." });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: No token provided." });
  }
};

module.exports = authenticateToken;