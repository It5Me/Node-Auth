const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter an password'],
    minLength: [8, 'Minimum password length is a characters'],
  },
});
// //fire a function after doc saved to db
// userSchema.post('save', function (doc, next) {
//   console.log('new user was created & save', doc);
//   next();
// });
// userSchema.pre('save', function (next) {
//   console.log('user about to be created and saved', this);
//   next();
// });

//hashing
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const User = mongoose.model('user', userSchema);

module.exports = User;
