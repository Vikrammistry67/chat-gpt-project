const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { fullName: { firstName, lastName }, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) res.status(400).json({ message: 'this user already Exist | try different' });

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        fullName: { firstName, lastName },
        email,
        password: hashPassword
    });


    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token);

    res.status(201).json({
        message: 'user registered successfully !',
        user: {
            email: user.email,
            _id: user._id,
            fullName: user.fullName
        }
    })

};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) res.status(400).json({ message: 'Inavlid email or Password | check email ' });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) res.status(400).json({ message: 'Invalid email or password | check password' });

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie('token', token);
    res.status(201).json({
        message: 'user loggedIn successfully !',
        user: {
            email: user.email,
            _id: user._id,
            fullName: user.fullName
        },
    })
};
const logoutUser = async (req, res) => {
    try {
        // Clear the cookie by setting its expiration to the past
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed", error: error.message });
    }
};

module.exports = { registerUser, loginUser, logoutUser }