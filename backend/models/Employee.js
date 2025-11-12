const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: { type: String },
    password: { type: String, required: true },
    role: { type: String, required: true }, // e.g. 'packer', 'driver', 'admin', ...
    status: { type: String, enum: ['active', 'on_leave', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
