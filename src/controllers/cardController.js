const cardModel = require('../models/cardModel');
const { isValidBody, isValidCardNumber, isValidString } = require('../util/validator');

//createCard
const createCard = async (req, res) => {
    try {
        const reqBody = req.body;
        const { customerName, cardNumber, cardType, status } = reqBody;

        if (!isValidBody(reqBody)) return res.status(400).json({ status: false, message: 'Please enter data.' });
        if (!isValidCardNumber(cardNumber)) return res.status(400).json({ status: true, message: 'Provide valid card number.' });
        if (!isValidString(customerName)) return res.status(400).json({ status: false, message: 'Provide valid customerName.' });
        if (!['REGULAR', 'SPECIAL'].includes(cardType)) return res.status(400).json({ status: false, message: 'Provide valid cardType info between REGULAR & SPECIAL.' });
        if (status)
            if (status !== 'ACTIVE' || status == 'INACTIVE') return res.status(400).json({ status: false, message: 'Provide valid status info.' });

        //existsCart
        const existsCart = await cardModel.findOne({ cardNumber, status: 'ACTIVE' })
        if (existsCart) return res.status(400).json({ status: false, message: 'This card no already exist.' })

        //newCard
        const newCard = await cardModel.create(reqBody)
        return res.status(201).json({ status: true, data: newCard });
    }
    catch (err) {
        return res.status(500).json({ status: true, message: err.message });
    }
};

//getCardDetails
const getCardDetails = async (req, res) => {
    try {
        const existsCart = await cardModel.find({ status: 'ACTIVE' }).populate('customerId');
        return res.status(200).json({ status: true, Data: existsCart });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};

module.exports = { createCard, getCardDetails }