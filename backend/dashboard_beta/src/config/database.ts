/**
 * @title Database configuration
 **/

// Package imports
import mongoose from "mongoose";

// Non-package imports
import { DATABASE_URL } from "./env";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Mongoose connected to MongoDB");
  } catch (err) {
    console.error("Mongoose connection error:", err);
    process.exit(1); // Exit process with failure
  }

  // Optional: Handle additional connection events
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB");
  });

  // process.on('SIGINT', () => {
  //   mongoose.connection.close(() => {
  //     console.log('Mongoose disconnected due to app termination');
  //     process.exit(0);
  //   });
  // });
};

export default connectDB;
