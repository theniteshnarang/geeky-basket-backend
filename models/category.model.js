const mongoose = require('mongoose')
const {Schema, SchemaTypes, model} = mongoose;
require('mongoose-type-url')

const CategorySchema = new Schema ({
  name: {
    unique: true,
    type: String,
    required: 'Can\'t enter document without name'
  },
  image:{
    type: SchemaTypes.Url
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
})

const Category = model('Category', CategorySchema)
module.exports = {Category}