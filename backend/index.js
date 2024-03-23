// index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
connectDB();

// Routes
app.use('/api/orders', orderRoutes);

// Start the server
const PORT = process.env.PORT || 5000;// set PORT=5000 in .env
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
