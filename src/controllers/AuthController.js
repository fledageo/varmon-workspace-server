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


    async activateUser(req, res) {
        try {
            const data = req.body
            const token = req.query.token
            const { id } = jwt.decode(token, process.env.SECRET_KEY,)


            const foundUser = await prisma.user.findUnique({ where: { id } })

            if (!foundUser) return res.status(404).json({ status: "error", message: "User not found" })

            if (foundUser.status === "active") return res.status(400).json({ status: "error", message: "User already activated" })
            const hashedPassword = await bcrypt.hash(data.password, 10)


            await prisma.user.update({
                where: { id },
                data: {
                    status: 'active',
                    password: hashedPassword,
                }
            })


            return res.status(200). json({ status: "ok", message: "User activated successfully"})

        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", message: "Internal server error" })
        }
    }

}


export default new AuthController()