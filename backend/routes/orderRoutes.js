// routes/orderRoutes.js
import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/', createOrder);


export default router;
