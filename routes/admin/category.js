const { Router } = require("express");
const upload = require("../../middlewares/multer");
const { uploadImageToCloudinary } = require("../../utils/cloudinaryUtil");
const { db } = require("../../dbConnect");
const { QueryTypes } = require("sequelize");

const router = Router();

router.get('/category', async (req, res) => {
  try {
     // for pagination 
  const {limit,offset} = req.query;
  // const sql_query = "SELECT * FROM categories limit :limit offset :offset";
  const sql_query = "SELECT * FROM categories LIMIT 3 offset 1";
  const categories = await db.sequelize.query(sql_query,{
    replacements: {limit,offset},
    type: QueryTypes.SELECT
  })
  
  console.log("categories",categories)
  } catch (error) {
    console.log("error",error);
    return res.status(500).json({ error: true, message: "internal server error" })

  }
  res.status(200).json({ error: false, message: "category route hits" })
})

router.post('/category', upload.array("image", 1), async (req, res) => {
  const { title, description } = req.body;
  try {
    const category = await db.category.create({title,description,created_at: new Date(), updated_at: new Date()})
    if (category) {
      const files = req.files;
      const result = await uploadImageToCloudinary(files[0]);

      if (result.public_id) {
        const sql_query = "INSERT INTO images(public_id, public_url, category_id, created_at, updated_at) VALUES(:public_id, :public_url, :category_id, :created_at, :updated_at)";
        const image = await db.sequelize.query(
          sql_query,
          {
            replacements: { 
              public_id: result.public_id,
              public_url: result.url,
              category_id: category.dataValues.id,
              created_at: new Date(),
              updated_at: new Date(),
            },
            type: QueryTypes.INSERT
          })
      }
    }
  } catch (error) {
    console.log("error::", error)
    return res.status(500).json({ error: true, message: "internal server error" })
  }
  return res.status(200).json({ error: false, message: "category created successfully" })
})

module.exports = router;