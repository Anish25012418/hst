// Import - default
const DailyRotateFile = require("winston-daily-rotate-file");
const { createLogger, format, transports } = require("winston");

////////////////////////////////////////
////////////////////////////////////////
// Log mechanism with winston
////////////////////////////////////////
////////////////////////////////////////
const winstonLogger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new DailyRotateFile({
      level: "info",
      filename: "logs/api-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

// Add console transport only in development environment
if (process.env.mode === "development") {
  winstonLogger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

module.exports = {
  winstonLogger,
};
