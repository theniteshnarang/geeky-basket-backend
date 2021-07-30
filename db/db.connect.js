const mongoose = require('mongoose')

const initializeDBConnection = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true  
  })
    console.log("MongoDB connected sucessfully")
  }catch(error){
    console.log("MongoDB connection has failed..", error)
  }
  
}

module.exports = { initializeDBConnection }