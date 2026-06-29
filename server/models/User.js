const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, { timestamps: true });

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

UserSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  if (!this.passwordHash.startsWith('$2')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
