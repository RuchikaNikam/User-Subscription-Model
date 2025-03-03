const express = require("express");
const { createSubscription, getAllSubscriptions, updateSubscription, deleteSubscription } = require("../controllers/subscriptionController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin routes (only admin can manage subscriptions)
router.post("/", authMiddleware, adminMiddleware, createSubscription);
router.get("/", authMiddleware, adminMiddleware, getAllSubscriptions);
router.put("/:id", authMiddleware, adminMiddleware, updateSubscription);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSubscription);

module.exports = router;
