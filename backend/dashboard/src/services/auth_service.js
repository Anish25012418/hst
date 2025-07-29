// Package imports
const jwt = require("jsonwebtoken");

// Non-package imports
const { JWT_SECRET } = require("../config/env.js");

// Set user functionality from token
const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    imageProfilePic: user.imageProfilePic,
    role: user.role
  };
  const encoded = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
  return { payload, encoded };
};

// Get user functionality from token
const verifyToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
