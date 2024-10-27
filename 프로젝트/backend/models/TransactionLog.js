const mongoose = require('mongoose');

const transactionLogSchema = new mongoose.Schema({
    transactionId: String,
    userId: String,
    consentData: Object,
    timestamp: Date,
    result: String,
});

module.exports = mongoose.model('TransactionLog', transactionLogSchema);
