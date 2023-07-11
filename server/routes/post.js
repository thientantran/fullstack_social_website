import express from "express";
import { getFeedPosts } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const postRouter = express.Router();

postRouter.get("/",verifyToken,getFeedPosts)

export default postRouter