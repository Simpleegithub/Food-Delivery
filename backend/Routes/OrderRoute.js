import express from "express";
import  {listOrders, PlaceOrder, UpdateStatus, UserOrders, VerifyOrder}  from "../Controllers/OrderController.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";

const OrderRouter = express.Router();



OrderRouter.post("/place",isAuthenticated,PlaceOrder);
OrderRouter.post('/verify',isAuthenticated,VerifyOrder);
OrderRouter.post('/userorders',isAuthenticated,UserOrders);
OrderRouter.get('/list',listOrders);
OrderRouter.post('/status',UpdateStatus);


export default OrderRouter;