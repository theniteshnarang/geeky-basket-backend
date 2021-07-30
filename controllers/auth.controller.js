const {User} = require("../models/user.model");
const { Cart } = require('../models/cart.model');
const { Wishlist } = require('../models/wishlist.model')

var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signUp = async (req,res) => {
  try{
    const user = req.body;
    const hashPassword = await bcrypt.hash(user.password, 10)
    user.password = hashPassword
    const NewUser = new User(user)
    const data = await NewUser.save()
    const initCart = new Cart({_id: data._id, cartlist:[]})
    const initWishlist = new Wishlist({_id: data._id, wishlist:[]})
    await initCart.save()
    await initWishlist.save()
    data.password = undefined;
    res.status(201).json({ success:"true", message: "Ask user, to login"})
  }catch(error){
    res.status(500).json({ success:false, message:"Couldn't add new user", errorMessage: error.message })
  }
}

const login = async (req,res) => {
  const user = req.body
  try {
    const validUser = await User.findOne({ email : user.email })
    if(!validUser) {
      return res.status(401).json({ success:false,message:'Unauthorised Access, No such user exist'})
    }
    const verified = await bcrypt.compare(user.password,validUser.password)
    if (!verified){
      return res.status(401).json({ success:false,message:'Unauthorised Access, Please check your credentials'})
    }
    validUser.password = undefined
    validUser.__v = undefined
    const token = jwt.sign(validUser.toJSON(),process.env.SECRET_KEY, { expiresIn: '7d' })
    res.status(200).json({ success:true, token})
  }catch(error){
    console.error(error)
    res.status(500).json({ success:false,message:'Unauthorised Access, Unable to Login User',errorMessage: error.message })
  }
}

module.exports = {signUp, login}