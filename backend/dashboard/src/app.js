// Import - default
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// Import - config
const { ALLOWED_ORIGINS } = require("./config/_app");
const connectDB = require("./config/database");
const { PORT } = require("./config/env");

// Import - middlewares
const { checkForAuthCookie } = require("./middlewares/auth_middleware");
const {
  customApiLogger,
  logRequest,
  logResponse,
} = require("./middlewares/logger_middleware");

// Import - routes
const authRoute = require("./routes/auth_route");
const blogRoute = require("./routes/blog_route");
const categoryRoute = require("./routes/category_route");
const categoryMenuRoute = require("./routes/category_menu_route");
const publicRoute = require("./routes/public_route");
const subcategoryRoute = require("./routes/subcategory_route");
const subcategoryDraftRoute = require("./routes/subcategory_draft_route");
const staticPageRoute = require("./routes/static_page_route");

// Initialize app
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Accept form data requests

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
      console.error("❌ Rejected CORS origin:", origin);
      return callback(new Error("The CORS policy for this site does not allow access from the specified Origin."), false);
    }
    console.log("✅ Allowed CORS origin:", origin);
    return callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests globally
app.options("*", cors(corsOptions));

app.use(cookieParser()); // Enable cookies
app.use(express.static(path.resolve(__dirname, "../public"))); // Middleware to serve static files from the "public" folder
app.use(customApiLogger(), logRequest, logResponse); // Logs

// Routers
app.use("/health", (req, res, next) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            color: green;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
          }
        </style>
      </head>
      <body>
        <h1>Health Check: All Systems Operational</h1>
        <p>Your application is running normally. All systems are up and functional.</p>
      </body>
    </html>
  `);
});
app.use("/user", authRoute);
app.use("/public", publicRoute);
app.use("/blog", checkForAuthCookie("HST_TOKEN"), blogRoute);
app.use("/category", checkForAuthCookie("HST_TOKEN"), categoryRoute);
app.use("/category_menu", checkForAuthCookie("HST_TOKEN"), categoryMenuRoute);
app.use("/static_page", checkForAuthCookie("HST_TOKEN"), staticPageRoute);
app.use("/subcategory", checkForAuthCookie("HST_TOKEN"), subcategoryRoute);
app.use(
  "/subcategory_draft",
  checkForAuthCookie("HST_TOKEN"),
  subcategoryDraftRoute
);

// Async function for connecting to the database
const startServer = async () => {
  try {
    console.log("Trying to connect to the database...\n");
    await connectDB(); // Wait for the database connection to be established

    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1); // Exit process with failure
  }
};

// Start the server
startServer();
