const winston = require('winston');
const appConfig = require('../configs/app.js');
const loggingTransports = [
  new winston.transports.Console({
    level: appConfig.logging.console.level,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    colorize: true
  })
];
winston.Logger({
  transports: loggingTransports,
  exitOnError: false
});
module.exports = winston;
