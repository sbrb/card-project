const express = require('express');
const router = express.Router();
const { createCustomer, getCustomer, deleteCustomer } = require('../controllers/customerController');
const { createCard, getCardDetails } = require('../controllers/cardController');

//customer
router.post('/customer', createCustomer);
router.get('/customer', getCustomer);
router.delete('/customer/:customerId', deleteCustomer);

//card
router.post('/card', createCard);
router.get('/card', getCardDetails);

module.exports = router;