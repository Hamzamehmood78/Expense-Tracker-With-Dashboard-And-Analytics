const generateToken = require("../utils/jwt");
const {
    registerUser,
    loginUser
} = require("../services/auth.service");

const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const user = await loginUser(req.body);

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const logout = (req, res) => {
    res.clearCookie("token");

    res.json({
        success: true,
        message: "Logged out successfully"
    });
};

module.exports = {
    register,
    login,
    logout
};