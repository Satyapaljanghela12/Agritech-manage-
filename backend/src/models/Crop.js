import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  landParcelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LandParcel',
  },
  name: {
    type: String,
    required: true,
  },
  variety: String,
  areaPlanted: {
    type: Number,
    required: true,
    min: 0,
  },
  plantedOn: {
    type: Date,
    required: true,
  },
  expectedHarvestDate: {
    type: Date,
    required: true,
  },
  actualHarvestDate: Date,
  status: {
    type: String,
    enum: ['planned', 'planted', 'growing', 'harvested', 'failed'],
    default: 'planned',
  },
  yieldExpected: {
    type: Number,
    default: 0,
  },
  yieldActual: Number,
  notes: String,
}, {
  timestamps: true,
});

export default mongoose.model('Crop', cropSchema);
