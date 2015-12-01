var express = require('express');
var Test = require('../models/test');
var router = express.Router();

router.post('/', function(req, res) {
    var test = new Test({
        testIdentifier: req.body.testIdentifier,
        questionIds: req.body.questionIds
    });

    test.save(function(err) {
        if (err) {
            res.status(400).send({ success: false, message: err.message });
        } else {
            res.send({ success: true, message: 'New test added successfully!' });
        }
    });
});

router.get('/', function(req, res) {
    // get all tests
    Test.find({}, '_id testIdentifier questionIds', function(err, tests) {
        if (err) {
            res.status(404).send({ message: err.message });
        } else {
            res.send(tests);
        }
    });
});

router.get('/:id', function(req, res) {
    // get test which matches id = req.params.id
    Test.findOne({ testIdentifier: req.params.id }, '_id testIdentifier questionIds', function(err, test) {
        if (err) {
            res.status(404).send({ message: err.message });
        } else if (test) {
            res.send(test);
        } else {
            res.status(404).send({ message: 'Test doesn\'t exist, verify that the identifier is correct.' });
        }
    })
});

module.exports = router;
