import mongoose from 'mongoose';

const landParcelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
    min: 0,
  },
  soilType: String,
  location: String,
  latitude: Number,
  longitude: Number,
  notes: String,
}, {
  timestamps: true,
});

export default mongoose.model('LandParcel', landParcelSchema);
