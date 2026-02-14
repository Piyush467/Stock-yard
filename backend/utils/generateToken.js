const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  // Create JWT token
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  // Cookie options
  const cookieOptions = {
    httpOnly: true,                                    // Cannot be accessed by JavaScript
    secure: process.env.NODE_ENV === 'production',     // HTTPS only in production
    sameSite: 'strict',                                // Prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000                   // 7 days
  };

  // Set cookie in response
  res.cookie('token', token, cookieOptions);

  return token;
};

module.exports = generateToken;