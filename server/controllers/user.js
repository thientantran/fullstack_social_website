import User from "../models/User.js";

export const getUser = async(req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json({...a})
  } catch (err) {
    res.status(404).json({error: err.message})
  }
}
export const getUserFriends = async(req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);
    // nhớ await lại
    const friends = await Promise.all(
      user['friends'].map((id) => User.findById(id))
    )
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}