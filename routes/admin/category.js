const {Router} = require("express");

const router = Router();

router.get('/category',(req,res)=>{
  console.log("req",req.user);
  res.status(200).json({error:false,message:"category route hits"})
})

module.exports = router;