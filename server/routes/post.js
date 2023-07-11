import express from "express";
import { getFeedPosts, getUserPosts } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const postRouter = express.Router();

postRouter.get("/",verifyToken,getFeedPosts)
postRouter.get("/:userId",verifyToken, getUserPosts)
export default postRouter