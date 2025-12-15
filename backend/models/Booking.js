const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  district: String,
  city: String
}, { _id: false });

const inventoryItemSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  note: String
}, { _id: false });


const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  customerFullName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String, required: true },
  originAddress: addressSchema,
  destinationAddress: addressSchema,
  movingDate: { type: Date, required: true },
  surveyDate: { type: Date }, // Ngày khảo sát
  inventory: [inventoryItemSchema],
  notes: String,
  status: { type: String, enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'fail'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
