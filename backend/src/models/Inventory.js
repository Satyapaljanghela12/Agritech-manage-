import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['seed', 'fertilizer', 'pesticide', 'supply', 'other'],
    required: true,
  },
  category: String,
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  unit: {
    type: String,
    required: true,
  },
  supplier: String,
  purchaseDate: Date,
  expiryDate: Date,
  alertLevel: {
    type: Number,
    default: 0,
  },
  costPerUnit: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Inventory', inventorySchema);
