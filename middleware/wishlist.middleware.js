const { Wishlist } = require('../models/wishlist.model')

const findWishModelByUserId = async (req,res,next) =>{
  const userId = req.user
  console.log({userId})
  try{
    const wishModel = await Wishlist.findById(userId).populate('wishlist.product','name desc image price')
    if(!wishModel){
      return res.status(400).json({success:false,message:"Sorry, This user doesn't exist. Please check with your userId again"})
    }
    req.wishModel = wishModel
    next()
  }catch(err){
    return res.status(401).json({success:false, message:"Unauthorized Access, Please login again", errorMessage:err.message})
  }
}

const findWishItemByWishId = async (req,res,next,id) =>{
  try{
    const wishItem = req.wishModel.wishlist.find(item => item._id == id)
    if(!wishItem){
      return res.status(400).json({success:false, message:'Sorry, This Wish item doesn\'t exist, Please check with your wishId again.'})
    }
    req.wishItem = wishItem;
    next()
  }catch(err){
    return res.status(500).json({success:false, message:"Sorry, Something went wrong", errorMessage:err.message})
  }
}

module.exports = {findWishModelByUserId, findWishItemByWishId}