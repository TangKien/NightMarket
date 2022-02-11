const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide an username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    contact: {
      type: String,
      required: [true, "Please provide a phone number"],
      minLength: 10,
      maxlength: 12,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    next();
  }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.createJWT = function() {
    const token = jwt.sign({id : this._id}  , process.env.JWT_SECRET, {expiresIn: '30d'});
    return token;
}

userSchema.methods.comparePassword = async function (inputPassowrd) {
    const isMatch = await bcrypt.compare(inputPassowrd, this.password);
    return isMatch;
}
module.exports = mongoose.model('User', userSchema);