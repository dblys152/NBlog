const express = require('express');
const router = express.Router();
const layoutJson = {'layout': 'common/layout'};
const blogLayoutJson = {'layout': 'common/blogLayout'};

const mbrService = require('../../member/service/mbrService');
const blogService = require('../service/blogService');

const mbrModel = require('../../member/model/mbrModel.js');
const blogModel = require('../model/blogModel.js');

router.get('/', async (req, res) => {
    res.render('front/blog/blogHome.ejs', {...layoutJson});
});

router.get('/blog/:blgMbrNo', async (req, res, next) => {
    try {
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
    } catch(err) {
        console.log(err);
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
