const express = require('express');
const router = express.Router();

router.get('/other', (req, res) => {
    let flag = req.query.flag;
    res.render('common/other.ejs', {...{'flag': flag}});
});

module.exports = router;