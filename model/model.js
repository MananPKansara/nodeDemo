const mongoose = require('mongoose');
const schema = require('./schema');

let model = mongoose.model('user', schema);

module.exports = model;