const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        if (!token) return res.status(401).json({ error: true, message: "unauthorized" })
        jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, user) => {
            if (err) return res.status(403).json({ error: true, message: "Forbidden" })
            if(req.baseUrl.includes("admin")){
                if(user.role!=="admin") return res.status(401).json({error: true, message: "unauthorized"})
            }
            req.user = user;
            next();
        });
    }