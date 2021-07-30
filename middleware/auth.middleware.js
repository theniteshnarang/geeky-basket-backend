var jwt = require('jsonwebtoken')
const authVerify = (req,res,next) => {
  const token = req.headers.authorization;
  console.log({token})
  try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded._id;
    next();
  }catch(error){
    console.log({error})
    return res.status(401).json({success:false, message:"Unauthorized Access, Please check your token", errorMessage: error.message})
  }
}

module.exports = { authVerify }