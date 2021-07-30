const { Cart } = require('../models/cart.model');
const {extend, concat} = require('lodash');

const getCartlist = async (req,res) => {
    try{
      const data = await Cart.find({}).populate('cartlist.product','name desc price image')
      res.status(200).json({success:true, data})
    }catch(error){
      res.status(500).json({success:false, message:"Couldn't fetch Cart data", errorMessage:error.message})
    }
  }

const updateCartlist = async (req,res)=>{
  const inCart = req.body
  inCart.cartlist.map(item => item._id = item.product)
  try{
    const data = new Cart(inCart)
    await data.save();
    res.status(201).json({success:true, data})
  }catch(error){
    res.status(500).json({success:false, message:"Couldn't add new cart item", errorMessage:error.message})
  }
}

const deleteCartlist = async(req,res)=>{
  try{
    await Cart.deleteMany({})
    res.status(200).json({deleted:true, success:true})
  }catch(error){
    res.status(500).json({deleted:false, success:false, message:"Couldn't Delete the collection", errorMessage:error.message})
  }
}

const getCartModel = (req,res)=>{
  let {cartModel} = req
  res.status(200).json({success:true, data:cartModel})
}

const updateCartModel = async (req,res)=>{
  const updateCartModel = req.body
  let {cartModel} = req
  if(updateCartModel.hasOwnProperty('cartlist')){
    updateCartModel.cartlist._id = updateCartModel.cartlist.product
    
    const matched = cartModel.cartlist.some(item => item._id ==updateCartModel.cartlist._id)

    if(matched){
      return res.status(400).json({success:false, message:"Sorry, Item is already present in the list. Please check with the id again"})
    }
    cartModel.cartlist = concat(cartModel.cartlist,updateCartModel.cartlist)
  }else {
    cartModel = extend(cartModel, updateCartModel)
  }
  await cartModel.save()
  res.status(201).json({success:true, data:cartModel})
  }

const deleteCartModel = async (req,res)=>{
  let {cartModel}= req;
  await cartModel.remove();
  res.status(200).json({success:true, id:cartModel._id, deleted:true})
}

const getCartItem = (req,res) => {
  let {cartItem} = req
  cartItem.__v = undefined;
  res.status(200).json({ success:true, data: cartItem })
}

const updateCartItem = async (req,res)=>{
  const updateCartItem = req.body
  let  {cartItem, cartModel} = req;
  cartItem = extend(cartItem, updateCartItem)
  await cartModel.save()
  res.status(201).json({ success:true, data:cartItem })
}

const deleteCartItem = async (req,res)=>{
  let  {cartItem, cartModel} = req
  await cartItem.remove();
  await cartModel.save();
  res.status(200).json({ success:true, id:cartItem._id, deleted:true })
}

module.exports = { getCartlist, updateCartlist, deleteCartlist, getCartModel, updateCartModel, deleteCartModel, getCartItem, updateCartItem, deleteCartItem }