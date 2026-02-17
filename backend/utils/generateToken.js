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
    secure: isProduction,           // true in production (HTTPS)
    sameSite: isProduction ? 'none' : 'lax',  // 'none' for cross-origin in production
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    path: '/'
  };

  res.cookie('token', token, cookieOptions);

  return token;
};

module.exports = generateToken;
