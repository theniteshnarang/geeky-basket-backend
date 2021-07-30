const defaultRouteHandler = (req,res,next)=>{
  res.status(404).json({success:false, message:"The Requested route is not there, please verify it again"})
}

const defaultErrorHandler = (err, req, res, next)=>{
  console.log(err.stack)
  res.status(500).json({success:false, message:err.message})
}

module.exports = { defaultRouteHandler, defaultErrorHandler}