// Import - default
const fs = require("fs");

// Import - helpers
const helpers = require("../utils/helpers");

// Global variables
const { winstonLogger } = helpers;

// Middleware to print logs onto a file
const customApiLogger = (fileName) => {
  return (req, res, next) => {
    const logData = `${Date.now()}: ${req.method}: ${req.path}\n`;

    fs.appendFile(fileName || './logs/custom-api-logs.txt', logData, (err) => {
      if (err) {
        console.error('Error appending log:', err);
        // Decide whether to continue or stop the request based on the error
      } else {
        console.log('API log appended successfully.');
        next(); // Continue to the next middleware or route handler
      }
    });
  };
};

// Log API requests
const logRequest = (req, res, next) => {
  winstonLogger.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    body: req.body,
    query: req.query,
    params: req.params,
  });
  next();
};

// Log API responses
const logResponse = (req, res, next) => {
  const oldSend = res.send;
  res.send = function (data) {
    winstonLogger.info({
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      status: res.statusCode,
      body: data,
    });
    res.send = oldSend;
    return res.send(data);
  };
  next();
};

module.exports = {
  customApiLogger,
  logRequest,
  logResponse,
};
