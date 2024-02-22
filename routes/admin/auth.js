const { Router } = require("express");
const { QueryTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const { loginBodyValidation, refreshTokenBodyValidation } = require("../../utils/validations/authValidationSchema");
const { generateTokens } = require("../../utils/generateTokens");
const verifyRefreshToken = require("../../utils/verfiyRefreshToken");
const { db } = require("../../dbConnect");

const router = Router();

router.post('/signup', async (req, res) => {
    try {

    } catch (error) {

    }
    res.send("signup");
});

router.post('/login', async (req, res) => {
    try {
        const { error } = await loginBodyValidation(req.body);
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message })
        }
        const { email, password } = req.body;
        const user = await db.sequelize.query('SELECT * FROM Users where email=:email',
            {
                replacements: { email },
                type: QueryTypes.SELECT
            });
        if (user.length === 0) {
            return res.status(401).json({ error: true, message: "invalid email or password" })
        }
        const verifiedPassword = await bcrypt.compare(password, user[0].password);
        if (!verifiedPassword) {
            return res.status(401).json({ error: true, message: "invalid email or password" })
        }
        const { accessToken, refreshToken } = await generateTokens(user[0])
        return res.status(200).json({ error: false, tokens: { accessToken, refreshToken }, user })
    } catch (error) {
        return res.status(500).json({ error: true, message: "internal server error" })
    }
});

router.delete("/logout", async (req, res) => {
    try {
        const { error } = refreshTokenBodyValidation(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message });

                const userToken = await db.sequelize.query("SELECT * FROM public.user_tokens WHERE token=:refreshToken",{
                    replacements: {refreshToken:req.body.refreshToken},
                    type: QueryTypes.SELECT
                })
                if (!userToken || userToken.length===0)
            return res
                .status(200)
                .json({ error: false, message: "Logged Out Sucessfully" });

        await db.sequelize.query("DELETE FROM public.user_tokens WHERE token=:refreshToken",{
            replacements: {refreshToken:req.body.refreshToken},
            type: QueryTypes.DELETE
        });
        res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.post('/refresh_token', async (req, res) => {
    try {
        const { error } = await refreshTokenBodyValidation(req.body);
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message })
        }
        const { refreshToken } = req.body;
        verifyRefreshToken(refreshToken).then(({ tokenDetails }) => {
            const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_PRIVATE_KEY,
                { expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES }
            );
            return res.status(200).json({ error: false, message: "Access token created successfully", tokens: { accessToken } })
        }).catch(err => {
            return res.status(500).json(err);
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "server error" })
    }
})

module.exports = router;