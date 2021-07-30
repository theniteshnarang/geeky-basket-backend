const router = require("express").Router();
const {Product} = require('../models/product.model')
const books = require('../data/books.json')
// const {productData} = require('../data/products')
const {extend} = require('lodash')

router.route("/")
  .get(async (req,res)=>{
    try{
      const products = await Product.find({})
      res.status(200).json({ success:true, data:products })
    }catch(error){
      res.status(500).json({ success:false, message:"Couldn't get products data", errorMessage: error.message })
    }
  })
  .post(async (req,res)=> {
    try{
      const product = req.body;
      const NewProduct = new Product(product)
      const data = await NewProduct.save()
      res.status(201).json({ success:"true", data })
    }catch(error){
      res.status(500).json({ success:false, message: "Couldn't add new product to the database", errorMessage: error.message })
    }
  })
  .delete(async (req,res)=>{
    try{
      await Product.deleteMany({})
      res.status(200).json({ success:true, deleted: true })
    }catch(error){
      res.status(500).json({ success:false, deleted:false, message:"Couldn't delete the collection", errorMessage:error.message })
    }
  })

router
  .route("/seed")
  .get( async(req,res) => {
    try{
        books.forEach( async (product) => {
        const matched = await Product.findOne({ name: product.name })
        if(matched) return;

        const newProduct = new Product({
          name: product.name,
          image: product.image,
          desc: product.desc.text.slice(0,80),
          reviews: product.desc.reviews,
          author_desc: product.desc.author,
          buy_link: product.external.link,
          price: {
            mrp: product.price.mrp - (product.price.mrp * product.price.discount)/100,
            discount: product.price.discount,
            save: (product.price.mrp * product.price.discount) / 100
          },
          fastDelivery: product.fastDelivery,
          ratings:{
            total : product.ratings.total,
            avg: product.ratings.avg
          },
          authors: product.authors,
          genre: product.genre,
          stock_qty: product.qty,
        })
        const saved = await newProduct.save();
        if(!saved){
          console.log("This product is not saved:", saved)
        }
      })
      res.status(200).json({ success:'true', message:"All Products are saved to the database" })
    }catch(error){
      res.status(500).json({
        success:'false', message:"Products Insertion failed, please try seeding again.", errorMessage: error.message
      })
    }
  })

router.param('productId', async (req, res, next, id) =>{
  try{
    const product = await Product.findById(id)
    if(!product){
      return res.status(400).json({ success:false, message:"Couldn't find your product, Please check with productId again." })
    }
    req.product = product
    next()
  }catch(error){
    return res.status(400).json({ success:false, message:"Please check your id again", errorMessage:error.message })
  }
})

router.route('/:productId')
  .get((req,res)=>{
    const { product } = req
    product.__v = undefined;
    res.status(200).json({success:true, data:product})
  })
  .post(async (req,res)=>{
    const updatedProduct = req.body
    const { product } = req
    product = extend(product, updatedProduct)
    product = await product.save()
    res.status(201).json({success:true, data:product})
  })
  .delete(async (req,res)=>{
    const {product}= req;
    product = await product.remove()
    res.status(200).json({success:true, id:product._id, deleted:true})
  })

  module.exports = router