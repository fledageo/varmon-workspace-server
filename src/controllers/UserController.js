import prisma from "../../prisma/prismaClient.js"
import jwt from "jsonwebtoken"
import sendMail from "../utils/mailSender.js"

class UserController {
    async inviteUser(req, res) {
        try {
            const { first_name, last_name, email } = req.body;
            const isExist = await prisma.user.findUnique({ where: { email } })

            if (isExist) {
                return res.status(409).json({ status: "error", message: "User with this email already exists" })
            }


            const newUser = await prisma.user.create({
                data: {
                    first_name,
                    last_name,
                    email
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                },
            })
            const activationToken = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, { expiresIn: "1h" })

            const send = await sendMail(newUser.id, email, activationToken, "invite")
            if (send) {
                res.status(200).json({ status: "ok", message: "Invitation sent" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", message: "Something went wrong" })
        }
    }


    async getUserById(req, res) {
        try {
            const { id } = req.params
            const user = await prisma.user.findUnique({
                where: { id: +id },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,    
                }
            })

            if (!user) res.status(404).json({ status: "error", message: "User with this id not found" })

            res.status(200).json({ status: "ok", payload: user })

        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", message: "Something went wrong!" })
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


export default new UserController()