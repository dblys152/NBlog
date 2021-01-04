const express = require('express');
const router = express.Router();
const layoutJson = {'layout': 'common/layout'};
const blogLayoutJson = {'layout': 'common/blogLayout'};

const mbrService = require('../../services/member/mbrService');
const blogService = require('../../services/blog/blogService');

const mbrModel = require('../../models/member/mbrModel.js');
const blogModel = require('../../models/blog/blogModel.js');

router.get('/', async (req, res) => {
    res.render('front/blog/blogHome.ejs', {...layoutJson});
});

router.get('/blog/:blgMbrNo', async (req, res) => {
    let blgMbrNo = req.params.blgMbrNo;
    let mbrForm = mbrModel.newMbrForm();
    mbrForm.mbrNo = blgMbrNo;
    let mbrInfo = await mbrService.selectMbrInfo(res, mbrForm);

    let blogInfoForm = blogModel.newBlogInfoForm();
    blogInfoForm.intgMbrNo = mbrInfo.MBR_NO;
    blogInfoForm.blgMnuNo = blogModel.setBlogMenuJson[0].blgMnuNo;
    let blogInfo = await blogService.selectBlogInfo(res, blogInfoForm);
    let blogMenuList = await blogService.selectBlogMenuList(res, blogInfoForm);
    res.locals.blogInfo = blogInfo;
    res.locals.blogMenuList = blogMenuList;
    res.render(
                'front/blog/blogView.ejs'
                , {
                    //...{'blgMbrNo': blgMbrNo}
                    //, ...{'blogInfo': blogInfo}
                    //, ...{'blogMenuList': blogMenuList}
                    ...blogLayoutJson
                }
    );
});

router.get('/blog/:blgMbrNo/write', async (req, res) => {
    let blgMbrNo = req.params.blgMbrNo;
    let mbrForm = mbrModel.newMbrForm();
    mbrForm.mbrNo = blgMbrNo;
    let mbrInfo = await mbrService.selectMbrInfo(res, mbrForm);

    let blogInfoForm = blogModel.newBlogInfoForm();
    blogInfoForm.intgMbrNo = mbrInfo.MBR_NO;
    blogInfoForm.blgMnuNo = blogModel.setBlogMenuJson[0].blgMnuNo;
    let blogInfo = await blogService.selectBlogInfo(res, blogInfoForm);
    let blogMenuList = await blogService.selectBlogMenuList(res, blogInfoForm);
    res.locals.blogInfo = blogInfo;
    res.locals.blogMenuList = blogMenuList;
    res.render(
                'front/blog/blogWrite.ejs'
                , {
                    //...{'blgMbrNo': blgMbrNo}
                    //, ...{'blogInfo': blogInfo}
                    //, ...{'blogMenuList': blogMenuList}
                    ...blogLayoutJson
                }
    );
});

module.exports = router;
