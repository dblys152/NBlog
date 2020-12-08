const express = require('express');
const router = express.Router();
const layoutJson = {'layout': 'common/layout'};
const blogLayoutJson = {'layout': 'common/blogLayout'};

const mbrService = require('../../services/member/mbrService');
const blogService = require('../../services/blog/blogService');

const mbrModel = require('../../models/member/mbrModel.js');
const blogModel = require('../../models/blog/blogModel.js');

router.get('/', async (req, res) => {
    let mbrForm = mbrModel.newMbrForm();
    mbrForm.mbrNo = "M000000002";
    try {
        let mbrInfo = await mbrService.selectMbrInfo(mbrForm);
        res.render('front/blog/blogHome.ejs', {...mbrInfo[0], ...layoutJson});
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});

router.get('/blog/:blgMbrNo', async (req, res) => {
    let blgMbrNo = req.params.blgMbrNo;
    let mbrForm = mbrModel.newMbrForm();
    mbrForm.mbrNo = blgMbrNo;
    try {
        let mbrInfo = await mbrService.selectMbrInfo(mbrForm);

        let blogInfoForm = blogModel.newBlogInfoForm();
        blogInfoForm.intgMbrNo = mbrInfo.MBR_NO;
        blogInfoForm.blgMnuNo = 'BM01';
        let blogInfo = await blogService.selectBlogInfo(blogInfoForm);
        res.render('front/blog/blogView.ejs', {...{'blgMbrNo': blgMbrNo}, ...{'mbrInfo': mbrInfo}, ...{'blogInfo': blogInfo}, ...blogLayoutJson});
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;
