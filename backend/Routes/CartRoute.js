
 import express from 'express';
 import  isAuthenticated  from '../Middlewares/isAuthenticated.js';
 import { AddToCart, GetCart, RemoveFromCart } from '../Controllers/CartController.js';


 const CartRouter = express.Router();

 CartRouter.post('/add',isAuthenticated,AddToCart);
 CartRouter.get('/get',isAuthenticated,GetCart);
 CartRouter.post('/remove',isAuthenticated,RemoveFromCart);



 export default CartRouter;