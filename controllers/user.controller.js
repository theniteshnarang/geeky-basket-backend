const {User} = require("../models/user.model")
const {extend} = require('lodash');

const getUserModel = async (req,res) => {
  try{
    const data = await User.find({},"name email image")
    res.status(200).json({ success:true, data })
  }catch(error){
    res.status(500).json({ success:false, message:"Couldn't fetch users data", errorMessage:error.message })
  }
}

const deleteUserModel = async(req,res)=>{
  try{
    await User.deleteMany({})
    res.status(200).json({ deleted:true, success:true })
  }catch(error){
    res.status(500).json({ deleted:false, success:false,message:"Couldn't Delete the collection",errorMessage:error.message })
  }
}

const getUser = (req,res)=>{
  let {user} = req
  user.__v = undefined;
  user.password = undefined;
  res.status(200).json({success:true, user})
}

const updateUser = async (req,res)=>{
  const updateUser = req.body
  let { user } = req
  user = extend(user, updateUser)
  await user.save()
  user.password = undefined
  res.status(201).json({success:true, user})
}

const deleteUser = async (req,res)=>{
  let {user}= req;
  await user.remove();
  res.status(200).json({success:true, id:user._id, deleted:true})
}

module.exports = { getUserModel, deleteUserModel, getUser, updateUser, deleteUser}