// Import - services
const authService = require("../services/auth_service");

// Import - models
const model = require("../models/user_model");

// Import - utils
const rm = require("../utils/constants/response_constant");
const { getNameFromEmail } = require("../services/image_service");

// Global variables
const { verifyToken } = authService;

// Middleware to check for the validity of the authentication cookie
const checkForAuthCookie = (cookieName) => {
  return (req, res, next) => {
    try {
      const tokenCookieValue = req.cookies[cookieName];

      if (!tokenCookieValue) {
        return rm.userUnauthorizedResponse(res);
      }

      try {
        const decoded = verifyToken(tokenCookieValue);
        req.user = decoded;
        next();
      } catch (error) {
        return rm.userTokenVerifyErrorResponse(res);
      }
    } catch (error) {
      return rm.serverErrorResponse(res, error);
    }
  };
}

// Fetch unique title for the model while updating its image files & so on
const fetchUpdateCustomName = async (req, res, next) => {
  try {
    const item = await model.findById(req.query.id).lean();
    if (!item) {
      const error = new Error(`User with id ${req.query.id} not found`);
      error.status = 404; // Optionally set a status code
      throw error;
    }
    req.customName = getNameFromEmail(item.email);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkForAuthCookie,
  fetchUpdateCustomName,
};
