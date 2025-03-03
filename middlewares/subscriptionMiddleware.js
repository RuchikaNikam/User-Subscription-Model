const User = require("../models/userModel");

const validateSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("subscription");
    if (!user.subscription || new Date() > new Date(user.subscriptionExpiry)) {
      return res.status(403).json({ message: "Subscription expired. Please renew." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = validateSubscription;
