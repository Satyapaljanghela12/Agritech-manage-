import mongoose from 'mongoose';

const financialRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['expense', 'revenue'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: String,
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  cropId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
  },
}, {
  timestamps: true,
});

export default mongoose.model('FinancialRecord', financialRecordSchema);
