const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const cardSchema = new mongoose.Schema({
    cardNumber: { type: String, require: true, trim: true },
    cardType: { type: String, require: true, trim: true },
    customerName: { type: String, require: true, trim: true },
    status: { type: String, trim: true },
    vision: { type: String, trim: true },
    customerId: { type: ObjectId, ref: 'Customer', required: true }
}, { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);