const uuid = require('uuid');
const cartModel = require('../models/cardModel');
const customerModel = require('../models/customerModel');
const { isValidBody, isValidObjectId, isValidPhone, isValidDate, isValidEmail, isValidString } = require('../util/validator');

//createCustomer
const createCustomer = async (req, res) => {
    try {
        let reqBody = req.body;
        const { firstName, lastName, mobileNumber, DOB, emailId, address } = reqBody;

        if (!isValidBody(reqBody)) return res.status(400).json({ status: false, message: 'Please enter data.' });

        if (!firstName) return res.status(400).json({ status: false, message: 'First name is mandatory.' });
        if (!lastName) return res.status(400).json({ status: false, message: 'Last name is mandatory.' });
        if (!mobileNumber) return res.status(400).json({ status: false, message: 'Mobile Number is mandatory.' });
        if (!DOB) return res.status(400).json({ status: false, message: 'DOB is mandatory.' });
        if (!emailId) return res.status(400).json({ status: false, message: 'emailId is required.' });
        if (!address) return res.status(400).status({ status: false, message: 'Please enter address' });

        if (!isValidString(firstName.trim())) return res.status(400).json({ status: false, message: 'Not a valid first nam.' });
        if (!isValidString(lastName.trim())) return res.status(400).json({ status: false, message: 'Not a valid last name.' });
        if (!isValidPhone(mobileNumber)) return res.status(400).json({ status: false, message: 'Put a valid mobile number.' });
        if (!isValidDate(DOB)) return res.status(400).json({ status: false, message: 'Please enter a valid DOB.' });
        if (!isValidEmail(emailId)) return res.status(400).json({ status: false, message: 'emailId is not Valid.' });

        //existsMobile
        const existsMobile = await customerModel.findOne({ mobileNumber });
        if (existsMobile) return res.status(400).json({ status: false, message: 'Mobile number already exists.' });

        //existsEmail
        const existsEmail = await customerModel.findOne({ emailId });
        if (existsEmail) return res.status(400).json({ status: false, message: 'emailId already exist' });

        req.body.customerId = uuid.v4();

        //newCustomer
        const newCustomer = await customerModel.create(reqBody);
        return res.status(201).json({ status: false, message: 'Success', data: newCustomer });
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};

//getCustomer
const getCustomer = async (req, res) => {
    try {
        const existsCustomer = await customerModel.find({ status: 'ACTIVE' });
        return res.status(200).json({ status: true, message: existsCustomer });
    }
    catch (err) {
        return res.status.json({ status: false, message: err.message });
    }
};

//deleteCustomer
const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        if (!isValidObjectId(customerId)) return res.status(400).json({ status: false, message: 'Invalid customerId.' }); 

        //existsCustomer
        const existsCustomer = await customerModel.findOne({ _id: customerId, status: 'ACTIVE' });
        if (!existsCustomer) { return res.status(404).json({ status: false, message: 'Customer not found.' }); }

        await customerModel.findOneAndUpdate({ _id: customerId }, { status: 'INACTIVE' });
        await cartModel.findOneAndUpdate({ customerId }, { status: 'INACTIVE' });

        return res.status(200).json({ status: false, message: 'Deleted Succesfully.' });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = { createCustomer, getCustomer, deleteCustomer };