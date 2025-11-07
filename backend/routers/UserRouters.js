import express from "express";
import { isAuth, loginUser, logoutUser, registerUser } from "../controllers.js/UserControllers.js";
import { protectUser } from "../middleware/protectUser.js";




const UserRouter = express.Router();

// Authentication routes
UserRouter.post('/register', registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/me", protectUser, isAuth);
UserRouter.post("/logout", logoutUser);


export default UserRouter;