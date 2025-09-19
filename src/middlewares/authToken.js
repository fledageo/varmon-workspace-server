import jwt from "jsonwebtoken"
import prisma from "../../prisma/prismaClient.js"

const authToken = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ status: "error", message: 'Token missing' })
    }
    
    try {
        const verified = await jwt.verify(token, process.env.SECRET_KEY)
        const exist = await prisma.user.findUnique({ where: { id: verified.user_id } })
        if (exist) {
            req.user = verified
            next()
        }else{
            res.status(404).json({ status: "error", message: 'User not found' })
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({ status: "error", message: 'Invalid or expired token' })
    }
}

export default authToken;