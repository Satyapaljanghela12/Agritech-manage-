import FinancialRecord from '../models/FinancialRecord.js';

export const getFinancialRecords = async (req, res) => {
  try {
    const records = await FinancialRecord.find({ userId: req.user._id })
      .populate('cropId')
      .sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFinancialRecord = async (req, res) => {
  try {
    const record = await FinancialRecord.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFinancialRecord = async (req, res) => {
  try {
    const record = await FinancialRecord.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({ message: 'Financial record not found' });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFinancialRecord = async (req, res) => {
  try {
    const record = await FinancialRecord.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!record) {
      return res.status(404).json({ message: 'Financial record not found' });
    }

    res.json({ message: 'Financial record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
