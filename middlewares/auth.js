const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to authenticate incoming requests using JWT.
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: "Invalid token, please login again" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ msg: "Access denied. No token provided." });
  }
};

module.exports = { authenticate };
