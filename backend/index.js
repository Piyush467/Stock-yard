require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Import middleware
const { setupSecurity } = require('./middleware/security');
const errorHandler = require('./middleware/errorHandler');
const { protect } = require('./middleware/auth');

// Import routes
const authRoutes = require('./routes/authRoutes');

// Import models
const { HoldingsModel } = require('./model/HoldingsModel');
const { PositionsModel } = require('./model/PositionsModel');
const { OrdersModel } = require('./model/OrdersModel');

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// Trust proxy (CRITICAL for Render)
app.set('trust proxy', 1);

// Security (CORS, Helmet, Rate Limiting) - MUST BE FIRST
setupSecurity(app);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Origin:', req.get('origin'));
  next();
});

// Sanitization
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    for (let key in obj) {
      if (key.startsWith('$')) delete obj[key];
      else if (typeof obj[key] === 'object') obj[key] = sanitize(obj[key]);
    }
    return obj;
  };
  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  if (req.params) req.params = sanitize(req.params);
  next();
};
app.use(sanitizeInput);

// Routes
app.use('/api/auth', authRoutes);

app.get("/allHoldings", protect, async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", protect, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", protect, async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });
    await newOrder.save();
    res.json({ success: true, message: "Order saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving order" });
  }
});

app.get("/", (req, res) => {
  res.json({ 
    message: "Zerodha Clone API is running",
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use(errorHandler);

// Start server
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected");
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Frontend URL:", process.env.FRONTEND_URL);
    console.log("Dashboard URL:", process.env.DASHBOARD_URL);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Server started at ${new Date().toISOString()}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
