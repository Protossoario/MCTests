var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    testIdentifier: { type: String, required: true, unique: true, index: true, match: /^\w{5,}-\d{4}-\d{2}-\d{2}/ },
    questionIds: { type: [Number], required: true }
});

module.exports = mongoose.model('Test', testSchema);
