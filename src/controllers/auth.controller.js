import authService from "../services/auth.service.js";

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);

            res.cookie('token', result.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 4 * 60 * 60 * 1000,
            });

            return res.status(200).json({
                status: "ok",
                message: "Successful login",
                payload: { user: result.user }
            });
        } catch (error) {
            console.log(error);
            if (error.message === "INVALID_CREDENTIALS") {
                return res.status(401).json({
                    status: "error",
                    message: "Invalid credentials",
                    code: 'INVALID_CREDENTIALS'
                });
            }
            return res.status(500).json({ status: "error", message: 'Server internal error' });
        }
    }

    async inviteUser(req, res) {
        try {
            const { newUser } = req.body;
            const user = await authService.inviteUser(newUser);
            return res.status(200).json({ status: "ok", payload: user, message: "Invitation sent" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: "error", message: error.message || "Something went wrong!" });
        }
    }

    
    async activateUser(req, res) {
        try {
            const token = req.query.token;
            const data = req.body;

            await authService.activateUser(token, data);
            return res.status(200).json({ status: "ok", message: "User activated successfully" });
        } catch (error) {
            console.log(error);
            if (error.message === "USER_NOT_FOUND") {
                return res.status(404).json({ status: "error", message: "User not found" });
            }
            if (error.message === "USER_ALREADY_ACTIVATED") {
                return res.status(400).json({ status: "error", message: "User already activated" });
            }
            return res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }



    async getCurrentUser(req, res) {
        try {
            const { user_id } = req.user;
            const foundUser = await authService.getCurrentUser(user_id);
            return res.status(200).json({ status: "ok", payload: foundUser });
        } catch (error) {
            console.log(error);
            if (error.message === "USER_NOT_FOUND") {
                return res.status(404).json({ status: "error", message: "User not found" });
            }
            return res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }


    async logout(req, res) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            return res.status(200).json({ status: "ok", message: "Logged out successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }
}


export default new AuthController()