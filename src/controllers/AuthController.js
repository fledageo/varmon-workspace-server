import prisma from "../../prisma/prismaClient.js    "
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class AuthController {
    async login(req, res) {
        try {
            const email = req.body.email.trim().toLowerCase()
            const password = req.body.password
            const foundUser = await prisma.user.findUnique({ where: { email } })

            if (!foundUser) {
                return res.status(401).json({ status: "error", message: "Invalid credentials" })
            }
            const isPasswordValid = await bcrypt.compare(password, foundUser.password)

            if (!isPasswordValid) {
                return res.status(401).json({ status: "error", message: "Invalid credentials" })
            } else {

                const token = jwt.sign(
                    { user_id: foundUser.id, role: foundUser.role },
                    process.env.SECRET_KEY,
                    { expiresIn: '4h' }
                )

                const { password: _, ...user } = foundUser

                res.status(200).json({
                    status: "ok",
                    message: "Successful login",
                    payload: { user, token }
                })
            }


        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: "error", message: 'Server internal error' });
        }
    }
}


export default new AuthController()