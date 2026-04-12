import Crop from '../models/Crop.js';

export const getCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ userId: req.user._id })
      .populate('landParcelId')
      .sort({ createdAt: -1 });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCrop = async (req, res) => {
  try {
    const crop = await Crop.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.json({ message: 'Crop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
