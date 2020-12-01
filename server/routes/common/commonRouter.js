const express = require('express');
const router = express.Router();
const { jwtMW } = require('../../models/jwtMW.js');

router.get('/other', jwtMW, (req, res) => {
    let flag = req.query.flag;
    res.render('common/other.ejs', {...{'flag': flag}});
});

module.exports = router;