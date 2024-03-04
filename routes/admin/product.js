const { Router } = require("express");
const { createProductValidation } = require("../../utils/validations/productValidationSchema");
const upload = require("../../middlewares/multer");

const router = Router();

router.post('/product', upload.array("image", 1), async (req, res) => {
    // const files = req.files;
    // const { error } = await createProductValidation({ ...req.body, image: files });
    // if (error) {
    //     return res.status(400).json({ error: true, message: error.details[0].message })
    // }
    // const { title, description } = req.body;
    try {
        // const result = await uploadImageToCloudinary(files[0]);

        // if (result.public_id) {
        //     const category = await db.category.create({ title, description, created_at: new Date(), updated_at: new Date() })
        //     const sql_query = "INSERT INTO images(public_id, public_url, category_id, created_at, updated_at) VALUES(:public_id, :public_url, :category_id, :created_at, :updated_at)";
        //     const image = await db.sequelize.query(
        //         sql_query,
        //         {
        //             replacements: {
        //                 public_id: result.public_id,
        //                 public_url: result.url,
        //                 category_id: category.dataValues.id,
        //                 created_at: new Date(),
        //                 updated_at: new Date(),
        //             },
        //             type: QueryTypes.INSERT
        //         })
        // }
    } catch (error) {
        console.log("error::", error)
        return res.status(500).json({ error: true, message: "internal server error" })
    }
    return res.status(200).json({ error: false, message: "product created successfully" })
})

module.exports = router;