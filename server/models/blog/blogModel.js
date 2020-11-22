let blogInfoForm = new Object();
function initBlogInfoForm() {
    blogInfoForm.intgMbrNo  = null;   //회원번호
    blogInfoForm.blgMnuNo   = null;   //블로그메뉴번호
    blogInfoForm.blgNm      = null;   //블로그명
    blogInfoForm.blgIntro   = null;   //블로그소개
    blogInfoForm.tpcCtgNo   = null;   //주제카테고리번호
}

function newBlogInfoForm() {
    initBlogInfoForm();
    return blogInfoForm;
}

exports.newBlogInfoForm = newBlogInfoForm;
