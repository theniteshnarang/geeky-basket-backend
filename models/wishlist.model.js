const mongoose = require('mongoose')
const {Schema, SchemaTypes, model} = mongoose;
require('mongoose-type-url')

const ItemSchema = new Schema({
  product : {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
})

const WishlistSchema = new Schema ({
  _id : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  wishlist : [ItemSchema]
})

const Wishlist = model('Wishlist', WishlistSchema)
module.exports = {Wishlist}