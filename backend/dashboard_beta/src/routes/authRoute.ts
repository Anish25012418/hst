/**
 * @title Authentication route
 **/

// Package imports
import { Router } from "express";

// Non-package imports
import {
  handleUserLogin,
  handleUserSignup,
} from "../controllers/authController";
import upload from "../middlewares/uploadMiddleware";

// Initialize router
const router = Router();

// Register user
router.post("/signup", upload.single("profileImageURL"), handleUserSignup);

// Login user
router.post("/login", handleUserLogin);

export default router;
