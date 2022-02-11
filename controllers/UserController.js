const asyncWrapper = require('../middlewares/asyncWrapper');
const { findById } = require('../models/UserModel');
const User = require('../models/UserModel');

const register = asyncWrapper(async (req, res) => {
    const { username, email, password, contact } = req.body;
    if (!username || !email || !password || !contact) {
        throw new Error('Please provide valid information');
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
        throw new Error('This email has been used');
    }
    const newUser = await User.create({ username, email, password, contact });
    const token = newUser.createJWT();
    res.status(200).json({ user : newUser , token});
});

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error('Please provide valid login information');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('This email is not exist');
    } 
    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
        throw new Error('Wrong password');
    }
    const token = user.createJWT();
    res.status(200).json({ user: user , token});
})

const updateUser = asyncWrapper(async(req,res) => {
    const user = await User.findById(req.user._id);
    if (user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.contact = req.body.contact || user.contact;
        if (req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        const token = updatedUser.createJWT();
        res.status(200).json({user: updatedUser, token});
    } else {
        throw new Error('User not found');
    }
})
module.exports = { register, login , updateUser };
