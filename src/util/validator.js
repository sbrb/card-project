const mongoose = require('mongoose');
const moment = require('moment');

const isValidBody = (d) => Object.keys(d).length > 0;
const isValidObjectId = (objectId) => mongoose.Types.ObjectId.isValid(objectId);
const isValidEmail = (e) => /^([a-zA-Z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/.test(e);
const isValidPhone = (m) => /^[6-9]\d{9}$/.test(m);
const isValidString = (s) => /^[a-zA-Z ]+$/.test(s);
const isValidDate = (d) => moment(d, 'YYYY-MM-DD', true).isValid();
const isValidCardNumber = (n) => /(?:\d[ -]*?){13,16}/.test(n);

module.exports = { isValidBody, isValidObjectId, isValidPhone, isValidDate, isValidEmail, isValidString, isValidCardNumber };