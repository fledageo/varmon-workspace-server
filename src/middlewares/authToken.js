const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ status: "error", message: "Token missing" });
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({ status: "error", message: "Invalid token" });
    }
};

module.exports = authToken;