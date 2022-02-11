const express = require('express');
const router = express.Router();
const { register, login ,updateUser} = require('../controllers/UserController');
const auth = require('../middlewares/authentication');
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').patch(auth,updateUser);
module.exports = router;