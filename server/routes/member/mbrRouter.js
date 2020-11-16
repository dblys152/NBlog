const express = require('express');
const router = express.Router();

const mbrService = require('../../services/member/mbrService');

/* GET users listing. */
router.post('/mbrInfo', function(req, res) {
    let mbrJson = req.body;
    mbrService.selectMbrInfo(mbrJson, function(result) {
        res.send(result);
    });
});

module.exports = router;
