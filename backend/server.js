import express from 'express';
import cors from 'cors';
import  dotenv from 'dotenv';
import connectDB from './config/DB.js';
import FoodModel from './Models/FoodModel.js';
import FoodRouter from './Routes/FoodRoute.js';
import UserRouter from './Routes/UserRoute.js';

import cookieParser from 'cookie-parser';
import CartRouter from './Routes/CartRoute.js';
import OrderRouter from './Routes/OrderRoute.js';




dotenv.config();

const app = express();
const allowedOrigins = [
  'https://food-delivery-frontend-7x3f.onrender.com',
  'https://food-delivery-admin-5brw.onrender.com', // Add more origins as needed
];

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  credentials: true, // Allow credentials (cookies) to be sent
}));

// Database connction
connectDB()

// app.get('/', async(req, res) => {
//     // intialize database
//     const food=await FoodModel.find();
//     res.send(food)
// });

app.use('/api/food',FoodRouter);
app.use('/api/user',UserRouter);
app.use('/api/cart',CartRouter);
app.use('/api/order',OrderRouter);

app.use('/images',express.static('uploads'));

const PORT =process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});