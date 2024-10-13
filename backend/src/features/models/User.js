const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['Customer', 'PropertyAdmin', 'SuperAdmin'], default: 'Customer' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
