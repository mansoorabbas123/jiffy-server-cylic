const { Router } = require("express");
const { refreshTokenBodyValidation } = require("../utils/authValidationSchema");
const verifyRefreshToken = require("../utils/verfiyRefreshToken");
const jwt = require('jsonwebtoken');

const router = Router();


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
