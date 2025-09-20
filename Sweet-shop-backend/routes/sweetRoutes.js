const express = require("express");
const {
  getSweets,
  createSweet,
  updateSweet,
  deleteSweet,
} = require("../controllers/sweetController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSweets);
router.post("/", protect, createSweet);
router.put("/:id", protect, updateSweet);
router.delete("/:id", protect, deleteSweet);

module.exports = router;
