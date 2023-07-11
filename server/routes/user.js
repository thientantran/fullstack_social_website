import express from "express";
import { getUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.get("/:id", verifyToken,getUser)
export default userRouter