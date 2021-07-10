const express = require('express');
const router = express.Router();
const layoutJson = {'layout': 'common/layout'};
const blogLayoutJson = {'layout': 'common/blogLayout'};

const mbrService = require('../../member/service/mbrService');
const blogService = require('../service/blogService');

const { MbrForm } = require('../../member/model/mbrModel.js');
const { BlogForm, BlogMenuForm } = require('../model/blogModel.js');


router.get('/', async (req, res) => {
    res.render('front/blog/blogHome.ejs', {...layoutJson});
});

router.get('/blog/:blgMbrNo', async (req, res, next) => {
    try {
        let mbrForm = new MbrForm();
        mbrForm.setMbrNo(req.params.blgMbrNo);
        let mbrInfo = await mbrService.selectMbrInfo(mbrForm);

        
        let blogMenuForm = new BlogMenuForm();
        blogMenuForm.setDefaultMnu(1);
        blogMenuForm.setIntgMbrNo(mbrForm.mbrNo);
        let blogInfo = await blogService.selectBlogInfo(blogMenuForm);
        let blogMenuList = await blogService.selectBlogMenuList(blogMenuForm);
        res.status(201).json({message: "성공", data: {mbrInfo, blogInfo, blogMenuList}});
    } catch(err) {
        next(err);
    }
});

router.get('/blog/:blgMbrNo/write', async (req, res, next) => {
    try {
        let blgMbrNo = req.params.blgMbrNo;
        let mbrForm = mbrModel.newMbrForm();
        mbrForm.mbrNo = blgMbrNo;
        let mbrInfo = await mbrService.selectMbrInfo(res, mbrForm);
        
        if(res.locals.payload.mbrNo == blgMbrNo && mbrInfo != null) {
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
        } else {
            res.redirect('/common/other?flag=access');
        }
    } catch(err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
