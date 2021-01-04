const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb, res) => {
        cb(null, 'img/postImg/');
    },
    filename: (req, file, cb, res) => {
        var name = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, name);

        return name;
    }
});

let upload = multer({
    storage: storage
});

router.post('/uploadImg', upload.single('file'), (req, res) => {
    res.json({
        "location": '/img/postImg/' + req.file.filename
    });
});

module.exports = router;