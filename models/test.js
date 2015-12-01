var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    testIdentifier: { type: String, unique: true, index: true, match: /^\w{5,}-\d{4}-\d{2}-\d{2}/ },
    questionIds: [Number]
});

module.exports = mongoose.model('Test', testSchema);
