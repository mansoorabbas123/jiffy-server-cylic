const {Router} = require("express");

const router = Router();

router.get('/category',(req,res)=>{
  res.status(200).json({erro:false,message:"category route hits"})
})

module.exports = router;