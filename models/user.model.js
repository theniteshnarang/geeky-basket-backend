const mongoose = require('mongoose');
const {Schema,SchemaTypes,model} = mongoose;


const UserSchmema = new Schema({
  name: {
    type: String,
    required: 'Can\'t enter user details without name, please enter name'
  },
  email : {
    type: String,
    unique: true,
    index:true,
    required: 'Can\' enter user details without email, please enter email'
  },
  image : SchemaTypes.Url,
  password : {
    type: String,
    required: 'Can\'t enter user details without password, please enter password'
  }
})

const User = model('User', UserSchmema)
module.exports = {User}