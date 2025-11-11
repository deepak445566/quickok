import express from "express";
import { forgotPassword, isAuth, loginUser, logoutUser, registerUser, resetPassword } from "../controllers.js/UserControllers.js";
import { protectUser } from "../middleware/protectUser.js";




const UserRouter = express.Router();

// Authentication routes
UserRouter.post('/register', registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/me", protectUser, isAuth);
UserRouter.post("/logout", logoutUser);

UserRouter.post('/forgot-password', forgotPassword);
UserRouter.post('/reset-password', resetPassword);


export default UserRouter;