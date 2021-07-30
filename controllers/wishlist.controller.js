const { Wishlist } = require('../models/wishlist.model')
const {extend, concat} = require('lodash');

const getWislist = async (req,res) => {
  try{
      const data = await Wishlist.find({}).populate     ('wishlist.product','name price image desc').populate('user','name');
      res.status(200).json({success:true, data})
    }catch(error){
      res.status(500).json({success:false, message:"Couldn't fetch Wishlist data", errorMessage:error.message})
    }
  }

const updateWishlist = async (req,res)=>{
  const inWishlist = req.body
  inWishlist.wishlist.map(item => item._id = item.product)
  try{
    const data = new Wishlist(inWishlist);
    await data.save();
    res.status(201).json({success:true, data})
  }catch(error){
    res.status(500).json({success:false, message:"Couldn't add new wish item", errorMessage:error.message})
  }
}

const deleteWishlist = async(req,res)=>{
  try{
    await Wishlist.deleteMany({});
    res.status(200).json({deleted:true, success:true})
  }catch(error){
    res.status(500).json({deleted:false, success:false, message:"Couldn't delete the collection", errorMessage:error.message})
  }
}

const getWishModel = (req,res) => {
  let {wishModel} = req
  wishModel.__v = undefined;
  res.status(200).json({success:true, data:wishModel})
}

const updateWishModel = async (req,res)=>{
    const updateWishModel = req.body
    let {wishModel} = req
    if(updateWishModel.hasOwnProperty('wishlist')){
      updateWishModel.wishlist._id = updateWishModel.wishlist.product
      const matched = wishModel.wishlist.some(item => item._id == updateWishModel.wishlist._id)
      if(matched){
        return res.status(400).json({success:false, message:"Item is already present in the list"})
      }
      wishModel.wishlist = concat(wishModel.wishlist, updateWishModel.wishlist)
    }else {
      wishModel = extend(wishModel, updateWishModel)
    }
    await wishModel.save()
    res.status(201).json({success:true, data:wishModel})
  }

const deleteWishModel = async (req,res)=>{
  let {wishModel}= req;
  await wishModel.remove();
  res.status(200).json({success:true, id:wishModel._id, deleted:true})
}

const getWishItem = (req,res) => {
  let {wishItem} = req
  wishItem.__v = undefined;
  res.status(200).json({success:true, data:wishItem})
}

const deleteWishItem = async (req,res)=>{
  let {wishItem, wishModel} = req
  await wishItem.remove();
  await wishModel.save();
  res.status(200).json({success:true, id:wishItem._id, deleted:true})
}

module.exports = { getWislist, updateWishlist, deleteWishlist, getWishModel, updateWishModel, deleteWishModel, getWishItem, deleteWishItem}