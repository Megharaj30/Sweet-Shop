const express = require("express");
const router = express.Router();
const {
  purchaseSweet,
  restockSweet,
  getInventoryStats,
} = require("../controllers/inventoryController");
const { protect } = require("../middleware/authMiddleware");

router.post("/purchase", protect, purchaseSweet);
router.post("/restock", protect, restockSweet);
router.get("/stats", protect, getInventoryStats);

module.exports = router;
