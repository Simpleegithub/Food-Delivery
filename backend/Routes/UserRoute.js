
import express from "express";
import { getAllUsers, Login, logout, Register } from "../Controllers/UserController.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";


const UserRouter = express.Router();

UserRouter.post("/register",Register);
UserRouter.post("/login",Login);
UserRouter.get('/all',isAuthenticated,getAllUsers);
UserRouter.get('/logOut',logout);


export default UserRouter;