import LandParcel from '../models/LandParcel.js';

export const getLandParcels = async (req, res) => {
  try {
    const parcels = await LandParcel.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLandParcel = async (req, res) => {
  try {
    const parcel = await LandParcel.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(parcel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLandParcel = async (req, res) => {
  try {
    const parcel = await LandParcel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!parcel) {
      return res.status(404).json({ message: 'Land parcel not found' });
    }

    res.json(parcel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLandParcel = async (req, res) => {
  try {
    const parcel = await LandParcel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!parcel) {
      return res.status(404).json({ message: 'Land parcel not found' });
    }

    res.json({ message: 'Land parcel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
