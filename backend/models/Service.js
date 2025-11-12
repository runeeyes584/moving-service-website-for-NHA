const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  basePrice: { type: Number, required: true },
  imageUrl: { type: String },
  features: [{ type: String }]
});

module.exports = mongoose.model('Service', serviceSchema);
