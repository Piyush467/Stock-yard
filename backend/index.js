require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Import security middleware
const { setupSecurity } = require('./middleware/security');
const errorHandler = require('./middleware/errorHandler');

// Import auth middleware
const { protect } = require('./middleware/auth');

// Import routes
const authRoutes = require('./routes/authRoutes');

// Import existing models
const { HoldingsModel } = require('./model/HoldingsModel');
const { PositionsModel } = require('./model/PositionsModel');
const { OrdersModel } = require('./model/OrdersModel');

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// SECURITY MIDDLEWARE (MUST BE FIRST!)
setupSecurity(app);

// BODY PARSERS
app.use(express.json());
app.use(cookieParser());

// CUSTOM SANITIZATION MIDDLEWARE
const sanitizeInput = (req, res, next) => {
  // Function to remove $ from keys only (prevents NoSQL injection)
  const sanitize = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;  // Don't modify strings, numbers, etc.
    }
    
    for (let key in obj) {
      // Remove keys that start with $ (MongoDB operators)
      if (key.startsWith('$')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        obj[key] = sanitize(obj[key]);
      }
    }
    return obj;
  };

  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  if (req.params) req.params = sanitize(req.params);
  
  next();
};
// AUTH ROUTES (Public)
app.use('/api/auth', authRoutes);

// EXISTING ROUTES (Now Protected!)

// Holdings - Protected route
app.get("/allHoldings", protect, async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

// Positions - Protected route
app.get("/allPositions", protect, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// New Order - Protected route
app.post("/newOrder", protect, async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.send("Order saved!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving order");
  }
});

// TEST ROUTE (Public)
app.get("/", (req, res) => {
  res.json({ message: "Zerodha Clone API is running..." });
});

// ERROR HANDLER (MUST BE LAST!)
app.use(errorHandler);


// DATABASE CONNECTION & SERVER START
mongoose.connect(uri)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.log(err));