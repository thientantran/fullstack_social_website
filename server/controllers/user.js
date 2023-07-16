import User from "../models/User.js";

export const getUser = async(req, res) => {
  console.log(req)
  try {
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user)
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

export const addRemoveFriend = async(req, res) =>{
  try {
    const {id, friendId} = req.params
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if(user['friends'].includes(friendId)){
      user['friends'] = user['friends'].filter((id) => id !== friendId)
      friend['friends'] = user['friends'].filter((idInFriend) => idInFriend !== id)
    }else{
      user['friends'].push(friendId)
      friend['friends'].push(id)
    }
    await user.save()
    await friend.save()

    const friends = await Promise.all(
      user['friends'].map((id)=> {
        const friendOfUser = User.findById(id)
        if(friendOfUser !== null){
          return friendOfUser
        }
      })
    );
    console.log(friends)
    const formattedFriends = friends.map(({_id, firstName, lastName, occupation, location, picturePath})=>{
      return {_id, firstName, lastName, occupation, location, picturePath}
    })
    res.status(200).json(formattedFriends)
  } catch (err) {
    res.status(404).json({error:err.message})
  }
}