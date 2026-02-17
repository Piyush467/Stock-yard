const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const setupSecurity = (app) => {
  // 1. Helmet - Secure HTTP headers
  app.use(helmet());

  // 2. CORS - Allow frontend and dashboard
  const allowedOrigins = [
    // Local development
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    // Production URLs 
    process.env.FRONTEND_URL,
    process.env.DASHBOARD_URL,
    // Added deployed URLs directly as backup
    'https://stockyard-frontend-uuyr.onrender.com',
    'https://stockyard-dashboard.onrender.com' 
  ].filter(Boolean); // Remove undefined values

  const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));

  // 3. Handle preflight requests
  app.options('*', cors(corsOptions));

  // 4. Rate Limiting
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      success: false,
      message: 'Too many requests, please try again later'
    }
  });
  app.use('/api/', generalLimiter);

  // 5. Auth Rate Limiting
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
      success: false,
      message: 'Too many login attempts, please try again later'
    }
  });
  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
};

module.exports = { setupSecurity };
