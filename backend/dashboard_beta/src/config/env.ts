/**
 * @title Environment variables configuration
 **/

// Package imports
// import { configDotenv } from "dotenv";
import dotenv from "dotenv";

// Load environment variables from .env file
// configDotenv();
dotenv.config();

// Exports
export const PORT = process.env.PORT || 8000;
export const JWT_SECRET = process.env.JWT_SECRET || "udiprai@123UR";
export const DATABASE_URL =
  process.env.DATABASE_URL ||
  "mongodb+srv://raiudip:ohmongo0909M$@cluster0.974xbw3.mongodb.net/hst-demo?retryWrites=true&w=majority&appName=Cluster0";
