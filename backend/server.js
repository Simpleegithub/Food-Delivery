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

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  // add mutiple origin
    origin: "https://food-delivery-frontend-7x3f.onrender.com/", 
     // Change this to match your frontend URL
    credentials: true  // Allow credentials (cookies) to be sent
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