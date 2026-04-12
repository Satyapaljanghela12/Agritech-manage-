import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    sparse: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: String,
  farmName: String,
  location: String,
  role: {
    type: String,
    enum: ['farmer', 'manager', 'admin'],
    default: 'farmer',
  },
  avatarUrl: String,
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
