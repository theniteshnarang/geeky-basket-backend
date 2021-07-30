const router = require('express').Router()
const { Category } = require('../models/category.model')
const { Product } = require('../models/product.model')
// const { categData } = require('../data/category')
// const { productData } = require('../data/products')
const books = require('../data/books.json')
const categData = require('../data/category.json')
const { extend } = require('lodash');

router.route('/')
  .get(async (req,res) => {
    try{
      const categories = await Category.find({}).populate('products','name desc price image')
      res.status(200).json({ success:true, data:categories })
    }catch(error){
      res.status(500).json({ success:false, message:"Couldn't fetch categories", errorMessage:error.message })
    }
  })
  .post(async (req,res)=>{
  const newCategory = req.body
    try{
      const data = new Category(newCategory)
      await data.save();
      res.status(201).json({ success:true, data })
    }catch(error){
      res.status(500).json({ success:false, message:"Couldn't post new category", errorMessage:error.message })
    }
  })
  .delete(async(req,res)=>{
    try{
      await Category.deleteMany({})
      res.status(200).json({ deleted:true, success:true })
    }catch(error){
      res.status(500).json({ deleted:false, success:false, message:"Couldn't delete the collection", errorMessage:error.message })
    }
  })

router.get('/seed', async (req,res)=>{
  try{
    categData.items.forEach( (category) => {
      books.forEach(async (product) => {
        const returnedProduct = await Product.findOne({name: product.name},'name') // To get the id from product collection
        console.log({ product, category})
        console.log({returnedProduct})
        if(!returnedProduct) return; 
        product.genre.forEach( name => {
          if(name === category.name){
            category.products.push(returnedProduct._id)
          }
        })
      })
    })
    const data = await Category.insertMany(categData.items)
    
    res.status(200).json({
      success: true, message:"Successfully Inserted all documents",
      data })

  }catch(error){
    res.status(500).json({
      success: false,
      message:"Insertion failed, Couldn't insert all documents",
      errorMessage: error.message
    })
  }
})

router.param('categId',async (req,res,next,id) =>{
  try{
    const categItem = await Category.findById(id).populate('products','name desc price image')

    if(!categItem){
      return res.status(400).json({ success:false, message:"Couldn't find your item, please check your categId again" })
    }
    req.categItem = categItem
    next()
  }catch(error){
    return res.status(400).json({ success:false, message:"Please check your id again", errorMessage:err.message })
  }
})

router.route('/:categId')
  .get((req,res)=>{
    let { categItem } = req
    categItem.__v = undefined;
    res.status(200).json({ success:true, data:categItem })
  })
  .post(async (req,res)=>{
    const updateCategItem = req.body
    let { categItem } = req
    categItem = extend(categItem, updateCategItem)
    categItem = await categItem.save()
    res.status(201).json({success:true, data:categItem})
  })
  .delete(async (req,res)=>{
    let { categItem }= req;
    await categItem.remove();
    res.status(200).json({success:true, id:categItem._id, deleted:true})
  })

module.exports = router