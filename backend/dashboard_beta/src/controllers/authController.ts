/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @title Authentication middleware
 **/

// Package imports
import { Request, Response } from "express";

// Non-package imports
import UserModel from "../models/UserModel";
import { generateToken } from "../services/authService";
import * as rm from "../utils/constants/responseMessages";

// Login user
async function handleUserLogin(req: Request, res: Response) {
  try {
    // Variables
    const { email, password } = req.body;
    try {
      const hst_auth_token = await (
        UserModel as any
      ).matchPasswordAndGenerateToken(email, password);

      // Set jwt token as cookie in the response
      res.cookie("HST_AUTH_TOKEN", generateToken(hst_auth_token));
      return res.status(201).json(rm.GENERATED_COOKIE);
    } catch (error) {
      console.error(error);
      return res.status(500).json(rm.INVALID_AUTH_CREDENTIALS);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(rm.SERVER_ERROR);
  }
}

// Register user
async function handleUserSignup(req: Request, res: Response) {
  try {
    // Variables
    const { fullName, email, password } = req.body;

    // Validate input data (e.g., check email format)

    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json(rm.EMAIL_ALREADY_EXISTS);
    }

    // Create the user
    const user = await UserModel.create({
      fullName,
      email,
      password,
    });
    return res.status(201).json(rm.REGISTERED_USER_MSG(user as any));
  } catch (error) {
    return res.status(500).json(rm.SERVER_ERROR);
  }
}

export { handleUserLogin, handleUserSignup };
