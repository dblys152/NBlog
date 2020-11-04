const express = require('express');
const { NotExtended } = require('http-errors');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('...');
});

router.get('/:mbrNo', function(req, res, next) {
   
    next();
});

module.exports = router;
