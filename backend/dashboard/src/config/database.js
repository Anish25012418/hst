// Import - default
const mongoose = require("mongoose");

// Import - config
// Non-package imports
const env = require("./env");

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
