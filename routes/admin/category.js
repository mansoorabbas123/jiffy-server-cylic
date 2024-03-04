const { Router } = require("express");
const upload = require("../../middlewares/multer");
const { uploadImageToCloudinary } = require("../../utils/cloudinaryUtil");
const { db } = require("../../dbConnect");
const { QueryTypes } = require("sequelize");
const { createCategoryValidation } = require("../../utils/validations/authValidationSchema");

const router = Router();

router.get('/category', async (req, res) => {
  try {
    let { limit, offset, searchKey, searchValue } = req.query;

    let sql_query = "SELECT * FROM categories";
    let sql_query2 = "SELECT COUNT(*) FROM categories";
    if (searchKey && searchValue) {
      if (searchKey === 'title') {
        sql_query += ` WHERE ${searchKey} LIKE :searchValue`;
        sql_query2 += ` WHERE ${searchKey} LIKE :searchValue`;
      } else {
        sql_query += ` WHERE ${searchKey} = :searchValue`;
        sql_query2 += ` WHERE ${searchKey} = :searchValue`;
      }
    }
    sql_query += " limit :limit offset :offset";


    const categories = await db.sequelize.query(sql_query, {
      replacements: {
        limit: limit <= 30 ? limit : 30,
        offset: offset ? offset : 0,
        searchValue: searchKey === 'title' ? `%${searchValue}%` : searchValue // If searchValue is undefined, it will be ignored
      },
      type: QueryTypes.SELECT
    })
    const count = await db.sequelize.query(sql_query2, {
      replacements: {
        limit: limit <= 30 ? limit : 30,
        offset: offset ? offset : 0,
        searchValue: searchKey === 'title' ? `%${searchValue}%` : searchValue // If searchValue is undefined, it will be ignored
      },
      type: QueryTypes.SELECT
    });
    res.status(200).json({ error: false, categories, count: count[0].count })

  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: true, message: "internal server error" })
  }
})

router.post('/category', upload.array("image", 1), async (req, res) => {
  const files = req.files;
  const { error } = await createCategoryValidation({ ...req.body, image: files });
  if (error) {
    return res.status(400).json({ error: true, message: error.details[0].message })
  }
  const { title, description } = req.body;
  try {
    const result = await uploadImageToCloudinary(files[0]);

    if (result.public_id) {
      const category = await db.category.create({ title, description, created_at: new Date(), updated_at: new Date() })
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
  } catch (error) {
    console.log("error::", error)
    return res.status(500).json({ error: true, message: "internal server error" })
  }
  return res.status(200).json({ error: false, message: "category created successfully" })
})

module.exports = router;