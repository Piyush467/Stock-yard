const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const setupSecurity = (app) => {

  const allowedOrigins = [
    "https://stockyard-frontend-uuyr.onrender.com",
    "https://stockyard-dashboard.onrender.com",
    "http://localhost:5173",
    "http://localhost:5174"
  ];

  // Simple & stable CORS
  app.use(cors({
    origin: allowedOrigins,
    credentials: true
  }));

  // Helmet
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));

  // General rate limit
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  });

  app.use('/api/', generalLimiter);
};

module.exports = { setupSecurity };
