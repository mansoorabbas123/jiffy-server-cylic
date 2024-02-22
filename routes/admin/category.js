const {Router} = require("express");
const upload = require("../../middlewares/multer");
const { uploadImageToCloudinary } = require("../../utils/cloudinaryUtil");

const router = Router();

router.get('/category',(req,res)=>{
  res.status(200).json({error:false,message:"category route hits"})
})

router.post('/category', upload.array("image",1), async(req,res)=>{
  // const category = await db.sequelize.query("INSERT INTO categories (title, image) ")
  console.log("files",req.files)
  if(req.files){
    const files = req.files;
      try {
        const result = await uploadImageToCloudinary(files[0]);
        if(url.public_id){
          
        }
      } catch (error) {
        return res.status(500).json({error:true, message:"internal server error"})
      }
  }
  return res.status(200).json({error:false, message:"success"})
})

module.exports = router;