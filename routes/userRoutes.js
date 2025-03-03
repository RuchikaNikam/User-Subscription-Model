const express = require("express");
const { subscribeUser, getUserSubscription } = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const validateSubscription = require("../middlewares/subscriptionMiddleware");

const router = express.Router();

// Users can subscribe and view their subscription
router.post("/subscribe", authMiddleware, subscribeUser);
router.get("/subscription", authMiddleware, validateSubscription, getUserSubscription);

module.exports = router;
