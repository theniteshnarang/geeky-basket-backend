const {User} = require("../models/user.model");

const findUserById = async (req,res,next) =>{
  const userId = req.user
  try{
    const user = await User.findById(userId)
    if(!user){
      return res.status(400).json({ success:false, message:"Sorry, This user doesn't exist, Please check with userId again"})
    }
    req.user = user
    next()
  }catch(error){
    return res.status(400).json({success:false, message:"Sorry, Please check with your userId again", errorMessage:error.message})
  }
}

module.exports = {findUserById}