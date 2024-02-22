const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const { db } = require("../dbConnect");

const generateTokens = async (user) => {
    try {
        const payload = { _id: user.id, role: user.role };
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES }
        )
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: process.env.JWT_REFRESH_EXPIRATION_DAYS }
        )
        const deleteToken = await db.sequelize.query('DELETE FROM user_tokens WHERE id=:userId',
            {
                replacements: { userId: user.id },
                type: QueryTypes.DELETE
            })
        const userToken = await db.sequelize.query('INSERT INTO user_tokens(token,user_id,created_at) VALUES (:token,:user_id,:created_at)',
            {
                replacements: { token: refreshToken, user_id: user.id, created_at: new Date() }
            })
        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    generateTokens
}