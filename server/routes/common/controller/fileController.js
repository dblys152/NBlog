const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

let today = new Date();
let ym = today.getFullYear() + "-" + (today.getMonth() >= 9 ? dt.getMonth() + 1 : "0" + (today.getMonth() + 1));
let upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let dir = 'public/images/postImg/' + ym;
            if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            var name = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
            cb(null, name);
           
        }
    })
});

router.post('/uploadImg', upload.single('file'), (req, res) => { 
    res.json({
        "location": '/images/postImg/' + ym + "/" + req.file.filename
    });
});

module.exports = router;