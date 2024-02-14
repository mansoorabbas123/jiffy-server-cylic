const jwt = require("jsonwebtoken");
const db = require("../models");
const { QueryTypes } = require("sequelize");

const verifyRefreshToken = (refreshToken) => {
  return new Promise( async (res,rej) => {
    try {
        const token = await db.sequelize.query("SELECT token FROM user_tokens WHERE token = :token",{
            replacements: {token: refreshToken},
            type: QueryTypes.SELECT
        })
        if(!token || token.length===0){
            return rej({error:true, message: "Invalid refresh token"});
        }
        const verified = await jwt.verify(refreshToken,process.env.REFRESH_TOKEN_PRIVATE_KEY);
        if(!verified){
            return rej({error: true, message: "Expired or invalid refresh token"})
        }
        res({error:false, message: "valid refresh token",tokenDetails:verified })
    } catch (error) {
        return rej({error: true, message: "server error"})
    }
  })
}

module.exports = verifyRefreshToken;

// test two use cases
// pass invalid token
// pass expired token