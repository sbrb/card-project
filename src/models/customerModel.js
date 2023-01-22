const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    mobileNumber: { type: Number, required: true },
    DOB: { type: Date, required: true },
    emailId: { type: String, unique: true, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    customerId: { type: String, required: true, trim: true },
    status: { type: String, default: 'ACTIVE', trim: true }
}, { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
