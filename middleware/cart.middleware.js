const { Cart } = require('../models/cart.model');

const findCartModelByUserId = async (req,res,next) =>{
  const userId = req.user
  console.log({userId})
  try{ 
    const cartModel = await Cart.findById(userId).populate('cartlist.product','name desc price image')
    if(!cartModel){
      return res.status(400).json({success:false, message:"Sorry, This user doesn't exist. Please check with your userId again"})
    }
    req.cartModel = cartModel
    next()
  }catch(err){
    return res.status(401).json({success:false, message:"Unauthorized Access, Please login again", errorMessage:err.message})
  }
}

const findCartItemByCartId = async (req,res,next,id) =>{
  try{
    const cartItem = req.cartModel.cartlist.find(item => item._id == id)
    if(!cartItem){
      return res.status(400).json({success:false, message:'Sorry, This cart item doesn\'t exist. Please check with your cartId again.'})
    }
    req.cartItem = cartItem;
    next()
  }catch(err){
    return res.status(500).json({success:false, message:"Sorry, Something went wrong", errorMessage:err.message})
  }
}

module.exports = { findCartModelByUserId, findCartItemByCartId }