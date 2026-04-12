import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['harvest', 'maintenance', 'inventory', 'financial', 'general'],
    required: true,
  },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Notification', notificationSchema);
