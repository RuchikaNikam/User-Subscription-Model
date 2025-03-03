const Subscription = require("../models/subscriptionModel");

exports.createSubscription = async (req, res) => {
    try {
      console.log("Received request body:", req.body); // Debugging log
  
      const { plan, duration, price } = req.body;
  
      if (!plan || !duration || !price) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const subscription = new Subscription({ plan, duration, price });
      await subscription.save();
  
      res.status(201).json({ message: "Subscription created", subscription });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Error creating subscription", error });
    }
  };
  
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscriptions", error });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Subscription updated", subscription });
  } catch (error) {
    res.status(500).json({ message: "Error updating subscription", error });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Subscription deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subscription", error });
  }
};
