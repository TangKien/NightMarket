const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('./asyncWrapper');
const auth = asyncWrapper(async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Error('Not authorized, no token');
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(payload.id).select('-password');
        next();
    } catch (error) {
        next(error);
    }

})

module.exports = auth;