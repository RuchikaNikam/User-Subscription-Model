const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  plan: { type: String, required: true },  // This is missing in the request!
  duration: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
