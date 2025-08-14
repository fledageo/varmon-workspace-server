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
                return res.status(401).json({ status: "error", message: "Invalid credentials", code: 'INVALID_CREDENTIALS' })
            }
            const isPasswordValid = await bcrypt.compare(password, foundUser.password)

            if (!isPasswordValid) {
                return res.status(401).json({ status: "error", message: "Invalid credentials", code: 'INVALID_CREDENTIALS' })
            } else {

                const accessToken = jwt.sign(
                    { user_id: foundUser.id, role: foundUser.role },
                    process.env.SECRET_KEY,
                    { expiresIn: '4h' }
                )


                res.cookie('token', accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 4 * 60 * 60 * 1000,
                });

                const { password: _, ...user } = foundUser

                res.status(200).json({
                    status: "ok",
                    message: "Successful login",
                    payload: { user }
                })
            }


        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: "error", message: 'Server internal error' });
        }
    }



    async getCurrentUser(req, res) {
        try {
            const token = req.cookies.token
            const { user_id } = jwt.decode(token, process.env.SECRET_KEY,)

            const foundUser = await prisma.user.findUnique({
                where: { id: user_id },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    role: true
                }
            })

            if (!foundUser) {
                return res.status(404).json({ status: "error", message: "User not found" })
            }

            return res.status(200).json({ status: "ok", payload: foundUser })

        } catch (error) {
            return res.status(500).json({ status: "error", message: "Internal server error" })
        }
    }
}


export default new AuthController()