const Sweet = require("../models/Sweet");

exports.purchaseSweet = async (req, res) => {
  try {
    const { sweetId, quantity } = req.body;
    const sweet = await Sweet.findById(sweetId);

    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    if (sweet.quantity < quantity)
      return res.status(400).json({ message: "Not enough stock" });

    sweet.quantity -= quantity;
    await sweet.save();

    res.json({ message: "Purchase successful", sweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.restockSweet = async (req, res) => {
  try {
    const { sweetId, quantity } = req.body;
    const sweet = await Sweet.findById(sweetId);

    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity += quantity;
    await sweet.save();

    res.json({ message: "Restocked successfully", sweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInventoryStats = async (req, res) => {
  try {
    const totalItems = await Sweet.countDocuments();
    const lowStock = await Sweet.find({ quantity: { $lt: 20 } });

    res.json({ totalItems, lowStock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
