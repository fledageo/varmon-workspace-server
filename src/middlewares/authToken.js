import jwt from "jsonwebtoken"

const authToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ status: "error", message: "Token missing" });

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ status: "error", message: "Invalid or expired token" });
    }
};

export default authToken;