import ToolEquipment from '../models/ToolEquipment.js';

export const getTools = async (req, res) => {
  try {
    const tools = await ToolEquipment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTool = async (req, res) => {
  try {
    const tool = await ToolEquipment.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(tool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTool = async (req, res) => {
  try {
    const tool = await ToolEquipment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!tool) {
      return res.status(404).json({ message: 'Tool/Equipment not found' });
    }

    res.json(tool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTool = async (req, res) => {
  try {
    const tool = await ToolEquipment.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!tool) {
      return res.status(404).json({ message: 'Tool/Equipment not found' });
    }

    res.json({ message: 'Tool/Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
