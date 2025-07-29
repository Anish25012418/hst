// Package imports
import jwt from "jsonwebtoken";

// Non-package imports
import { JWT_SECRET } from "../config/env";
import { UserSchema } from "../utils/schemas/AuthSchema";

// Get user functionality from token
const verifyToken = (token: string) => {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Set user functionality from token
const generateToken = (user: UserSchema) => {
  const payload = { _id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, JWT_SECRET);
};

export { verifyToken, generateToken };
