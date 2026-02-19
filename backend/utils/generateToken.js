const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );

  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    httpOnly: true,
    secure: true,          // Always true on Render (HTTPS)
    sameSite: 'none',      // Required for cross-origin
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/'
  };

  console.log('Setting cookie with options:', cookieOptions);
  res.cookie('token', token, cookieOptions);

  return token;
};

module.exports = generateToken;
