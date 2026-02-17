const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const setupSecurity = (app) => {
  // Define allowed origins
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'https://stockyard-frontend-uuyr.onrender.com',
    'https://stockyard-dashboard.onrender.com'
  ];

  // Add environment variables if they exist
  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }
  if (process.env.DASHBOARD_URL) {
    allowedOrigins.push(process.env.DASHBOARD_URL);
  }

  console.log('Allowed CORS origins:', allowedOrigins);

  // CORS configuration
  const corsOptions = {
    origin: function (origin, callback) {
      console.log('Request from origin:', origin);
      
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) {
        console.log('No origin - allowing');
        return callback(null, true);
      }
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        console.log('Origin allowed:', origin);
        callback(null, true);
      } else {
        console.log('Origin BLOCKED:', origin);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
    optionsSuccessStatus: 204
  };

  // Apply CORS
  app.use(cors(corsOptions));

  // Helmet with adjusted settings
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
  }));

  // Rate limiting with OPTIONS skip
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    skip: (req) => req.method === 'OPTIONS',
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests, please try again later'
    }
  });
  app.use('/api/', generalLimiter);

  // Auth rate limiting
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    skip: (req) => req.method === 'OPTIONS',
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many login attempts, please try again later'
    }
  });
  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
};

module.exports = { setupSecurity };
