const Sweet = require("../models/Sweet");

exports.getSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};

exports.createSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSweet = async (req, res) => {
  try {
    await Sweet.findByIdAndDelete(req.params.id);
    res.json({ message: "Sweet removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
