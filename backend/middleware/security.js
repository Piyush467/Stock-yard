const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const setupSecurity = (app) => {
  // 1. Helmet - Adds secure HTTP headers
  app.use(helmet());

  // 2. CORS - Allow only your frontend and dashboard
  const corsOptions = {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174'
    ],
    credentials: true,
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));

  // 3. Rate Limiting - Prevent too many requests
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { 
      success: false, 
      message: 'Too many requests, please try again later' 
    }
  });
  app.use('/api/', generalLimiter);

  // 4. Auth Rate Limiting - Stricter for login/register
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { 
      success: false, 
      message: 'Too many login attempts, please try again later' 
    }
  });
  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
};

module.exports = { setupSecurity };