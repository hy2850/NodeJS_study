const winston = require('winston');

winston.addColors({ http: 'magenta', info: 'redBG black italic' });

const level = process.env.NODE_ENV === 'production' ? 'error' : 'silly';

const Logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      (info) => `${info.level}: ${info.message} - ${info.timestamp}`,
    ),
    winston.format.splat(),
  ),
  transports: [new winston.transports.Console()],
});

module.exports = Logger;
// export default Logger;
