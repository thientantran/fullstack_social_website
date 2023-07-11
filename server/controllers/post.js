import Post from "../models/Post.js";
import User from "../models/User.js";
export const createPost = async(req, res) => {
  try {
    const {userId, description, picturePath} = req.body
    const user =await User.findById(userId)
    const {firstName, lastName, location} = user
    const newPost = new Post({
      userId,
      firstName,
      lastName,
      location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: []
    })
    // console.log(newPost)
    await newPost.save();
    const post = await Post.find()
    res.status(201).json(post)
  } catch (err) {
    res.status(409).json({error: err.message})
  }
}