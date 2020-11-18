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
    let mbrInfo = await mbrService.selectMbrInfo(mbrForm);
    res.render('front/blog/blogHome.ejs', {...mbrInfo[0], ...layoutJson});
});

router.get('/:mbrEmail', async (req, res) => {
    let mbrForm = mbrModel.newMbrForm();
    mbrForm.mbrEmail = req.params.mbrEmail;
    let mbrInfo = await mbrService.selectMbrInfo(mbrForm);

    let blogInfoForm = blogModel.newBlogInfoForm();
    console.log(mbrInfo.MBR_NO);
    blogInfoForm.intgMbrNo = mbrInfo.MBR_NO;
    blogInfoForm.blgMnuNo = 'BM01';
    let blogInfo = await blogService.selectBlogInfo(blogInfoForm);
            
    res.render('front/blog/blogView.ejs', {...{'mbrInfo': mbrInfo}, ...{'blogInfo': blogInfo}, ...blogLayoutJson});
});

module.exports = router;
