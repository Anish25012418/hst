# Dashboard system for HST (Himalayan Single Track)

## File structure
<!-- File structure -->
project-root (dashboard)/
├── config/                   // Configuration files
│   └── database.js           // Database configuration
│   └── app.js                // Application-specific configuration
│   └── env.js                // Environment variables configuration
│
├── middlewares/              // Middleware functions
│   └── authMiddleware.js     // Authentication middleware
│   └── errorMiddleware.js    // Error handling middleware
│   └── loggerMiddleware.js   // Logging middleware
│
├── routes/                   // Route handlers
│   └── authRoutes.js         // Authentication-related routes
│   └── bookingRoutes.js      // Booking-related routes
│   └── bikeRoutes.js         // Bike-related routes
│   └── userRoutes.js         // User-related routes
│   └── index.js              // Main routes file that combines all routes
│
├── controllers/              // Controllers to handle route logic
│   └── authController.js     // Logic for authentication routes
│   └── bookingController.js  // Logic for booking routes
│   └── bikeController.js     // Logic for bike routes
│   └── userController.js     // Logic for user routes
│
├── models/                   // Database models
│   └── bookingModel.js       // Booking schema
│   └── bikeModel.js          // Bike schema
│   └── userModel.js          // User schema
│
├── services/                 // Business logic and services
│   └── authService.js        // Authentication service logic
│   └── bookingService.js     // Booking service logic
│   └── bikeService.js        // Bike service logic
│   └── userService.js        // User service logic
│
├── utils/                    // Utility functions
│   └── helpers.js            // General helper functions
│   └── validators.js         // Validation functions
│
├── tests/                    // Test files
│   └── auth.test.js          // Tests for authentication functionality
│   └── booking.test.js       // Tests for booking functionality
│   └── bike.test.js          // Tests for bike functionality
│   └── user.test.js          // Tests for user functionality
│
├── .env                      // Environment variables file
├── .gitignore                // Git ignore file
├── app.js                    // Main application file
├── package.json              // NPM package file
└── README.md                 // Project README file