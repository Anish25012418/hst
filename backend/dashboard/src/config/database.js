// Import - default
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Import - config
// Non-package imports
const envFilePath = path.resolve(__dirname, `../../.env`);

try {
  // Load environment variables from the selected file
  dotenv.config({ path: envFilePath });
} catch (err) {
  console.error(
    `Error loading environment variables from ${envFilePath}:`,
    err
  );
  process.exit(1); // Exit the process if there's an error loading env variables
}

// Global variables
const { DATABASE_URL } = process.env;

// Main
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB using URI:", DATABASE_URL); // Add this line for debugging
    await mongoose.connect(DATABASE_URL);
    console.log("\nMongoose connected to MongoDB!\n");
  } catch (err) {
    console.error("Mongoose connection error:", err);
    process.exit(1); // Exit process with failure
  }

  // Optional: Handle additional connection events
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB!");
  });

  // process.on('SIGINT', () => {
  //   mongoose.connection.close(() => {
  //     console.log('Mongoose disconnected due to app termination');
  //     process.exit(0);
  //   });
  // });
};

module.exports = connectDB;
