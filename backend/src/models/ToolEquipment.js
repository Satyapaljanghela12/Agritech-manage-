import mongoose from 'mongoose';

const toolEquipmentSchema = new mongoose.Schema({
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
    enum: ['tool', 'machinery', 'vehicle', 'other'],
    required: true,
  },
  purchaseDate: Date,
  purchaseCost: {
    type: Number,
    default: 0,
  },
  condition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor'],
    default: 'good',
  },
  lastMaintenanceDate: Date,
  nextMaintenanceDate: Date,
  notes: String,
}, {
  timestamps: true,
});

export default mongoose.model('ToolEquipment', toolEquipmentSchema);
