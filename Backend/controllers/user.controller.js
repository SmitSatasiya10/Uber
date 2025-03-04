const userModel = require("../model/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;
        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password: hashedPassword,
        });

        // Generate token
        const token = user.generateAuthToken();
        res.status(201).json({ success: true, token, user });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if(!user) {
        return res.status(401).json({ success: false, message: "Invalid Email or Password" });
    }
    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid Email or Password" });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res) => {
    res.status(200).json({ user: req.user });
}