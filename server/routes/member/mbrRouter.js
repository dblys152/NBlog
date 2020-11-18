const express = require('express');
const router = express.Router();

const mbrService = require('../../services/member/mbrService');

/* GET users listing. */
router.post('/mbrInfo', async (req, res) => {
    let mbrJson = req.body;
    let mbrInfo = await mbrService.selectMbrInfo(mbrJson);
    res.send(mbrInfo);
});

module.exports = router;
