const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) res.status(401).json({ message: 'Un-Authorized User | check your token' });
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode.id);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Un-Authorized User !' })
    }

};

module.exports = { authUser };