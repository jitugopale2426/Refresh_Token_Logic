import express from "express";
import { GetUserController, Login, RefreshTokenController, Register } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const authRouter = express.Router();

authRouter.post("/register",Register)
authRouter.post("/login",Login)
authRouter.get("/getUser",authMiddleware,GetUserController)
authRouter.post("/refresh", RefreshTokenController);

export default authRouter;