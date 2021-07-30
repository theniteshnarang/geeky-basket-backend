const mongoose = require('mongoose');
const {Schema, SchemaTypes, model} = mongoose;
require('mongoose-type-url')

const ProductSchema = new Schema({
  name:{
    unique:true,
    type: String,
    index:true,
    required: "Can't enter a product without name, please enter product name"
  },
  entity:{
    type: String,
    required:true,
    default:'book'
  },
  price:{
    mrp:{
      type: Number,
      required:true
    },
    discount:{
      type: Number,
      required:true
    },
    save:{
      type:Number,
      required:true
    }
  },
  image: [{
    type: String,
    required: "Can't enter a product without URL, please enter URL of the product"
  }],
  fastDelivery:{
    type: Boolean,
    required:true,
    default:false
  },
  desc: {
    type: String,
    required:"Can't enter a product without description, please enter desc of the product"
  },
  ratings: {
    total: Number,
    avg: Number
  },
  reviews: [String],
  author_desc:{
    type: String,
    min: [100, "Author description must be 100 characters atleast."]
  },
  buy_link: {
    type: SchemaTypes.Url,
    required: "Can't enter a external product URL, please enter URL of the product"
  },
  authors: [String],
  genre: [String],
  stock_qty: {
    type: Number,
    required: true,
    default: 0
  }
},{
  timestamps:true
})

const Product = model("Product", ProductSchema)

module.exports = { Product }  