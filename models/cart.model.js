const mongoose = require('mongoose')
const {Schema, SchemaTypes, model} = mongoose;
require('mongoose-type-url')

const ItemSchema = new Schema({
  qty: {
    type: Number,
    default:1
  },
  product : {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
})

const CartSchema = new Schema ({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cartlist: [ItemSchema]
})

const Cart = model('Cart', CartSchema)
module.exports = {Cart}