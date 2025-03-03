const User = require("../models/userModel");
const Subscription = require("../models/subscriptionModel");

exports.subscribeUser = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) return res.status(404).json({ message: "Subscription not found" });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        subscription: subscriptionId,
        subscriptionExpiry: new Date(new Date().setMonth(new Date().getMonth() + subscription.duration)),
      },
      { new: true }
    );

    res.status(200).json({ message: "User subscribed successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing user", error });
  }
};

exports.getUserSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("subscription");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user subscription", error });
  }
};
