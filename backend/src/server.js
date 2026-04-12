import dotenv from 'dotenv';
// Load environment variables FIRST before any other imports
dotenv.config();

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { connectDB } from './config/database.js';
import passport from './config/passport.js';

import authRoutes from './routes/authRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import landParcelRoutes from './routes/landParcelRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import toolEquipmentRoutes from './routes/toolEquipmentRoutes.js';
import financialRoutes from './routes/financialRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration for passport
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/land-parcels', landParcelRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/tools', toolEquipmentRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
