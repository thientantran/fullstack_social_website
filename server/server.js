import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import { verifyToken } from "./middleware/auth.js";
// import Post from "./models/Post.js";
// import User from "./models/User.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
// import { posts, users } from "./seed/data.js";
// CONFIGURATIONs
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// phai co type=module de chay 2 rows o tren
dotenv.config()
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

app.use("/auth/register",upload.single('picture'), register)
// app.use("/auth/upload",verifyToken, upload.single('picture'), register) //test middle ware
// chỗ này vẫn chưa hài lòng lắm vì ko thể đưa vào route được, khi export cái upload này, rồi gắn hàm vào route thì ko chạy được, ==> fix sau
app.use("/post/createpost", verifyToken, upload.single("picture"),createPost)

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/post", postRouter)
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));