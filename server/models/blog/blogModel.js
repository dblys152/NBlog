let blogMenuForm = new Object();
function initBlogMenuForm() {
    blogMenuForm.intgMbrNo  = null;   //회원번호
    blogMenuForm.blgMnuNo   = null;   //블로그메뉴번호
    blogMenuForm.blgMnuNm   = null;   //블로그메뉴명
    blogMenuForm.rprsMnuYn  = null;   //대표메뉴여부
    blogMenuForm.ncsYn      = null;   //필수여부
    blogMenuForm.useYn      = null;   //사용여부
    blogMenuForm.blgMnuTyCd = null;   //블로그메뉴유형코드
    blogMenuForm.pagPstCnt  = null;   //페이지당글갯수
    blogMenuForm.prlgFrmCd  = null;   //프롤로그형태코드
    blogMenuForm.ntfYn      = null;   //알림여부
    blogMenuForm.seq        = null;   //정렬순서
    blogMenuForm.note       = null;   //비고
    blogMenuForm.delYn      = null;   //삭제여부
    blogMenuForm.regNo      = null;   //등록자
    blogMenuForm.regDtt     = null;   //등록일시
    blogMenuForm.modNo      = null;   //수정자
    blogMenuForm.modDtt     = null;   //수정일시
}
function newBlogMenuForm() {
    initBlogMenuForm();
    return blogMenuForm;
}
exports.newBlogMenuForm = newBlogMenuForm;

let topMenuSetForm = new Object();
function initTopMenuSetForm() {
    topMenuSetForm.intgMbrNo    = null;   //회원번호
    topMenuSetForm.pstClNo      = null;   //게시글분류번호
    topMenuSetForm.seq          = null;   //정렬순서
}
function newTopMenuSetForm() {
    initTopMenuSetForm();
    return topMenuSetForm;
}
exports.newTopMenuSetForm = newTopMenuSetForm;

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

let prlgDmnForm = new Object();
function initPrlgDmnForm() {
    prlgDmnForm.prlgDmnNo   = null;   //프롤로그영역번호
    prlgDmnForm.prlgFrmCd   = null;   //프롤로그형태코드
    prlgDmnForm.prlgDmnNm   = null;   //프롤로그영역명
    prlgDmnForm.ncsYn       = null;   //필수여부
    prlgDmnForm.delYn       = null;   //삭제여부
}
function newPrlgDmnForm() {
    initPrlgDmnForm();
    return prlgDmnForm;
}
exports.newPrlgDmnForm = newPrlgDmnForm;

let prlgSetForm = new Object();
function initPrlgSetForm() {
    prlgSetForm.intgMbrNo       = null;   //회원번호
    prlgSetForm.blgMnuNo        = null;   //블로그메뉴번호
    prlgSetForm.prlgDmnNo       = null;   //프롤로그영역번호
    prlgSetForm.prlgFrmCd       = null;   //프롤로그형태코드
    prlgSetForm.pstClNo         = null;   //게시글분류번호
    prlgSetForm.prlgDmnUseYn    = null;   //프롤로그영역사용여부
    prlgSetForm.pstDispLineCnt  = null;   //게시글노출라인수
    prlgSetForm.prlgDmnSeq      = null;   //프롤로그영역정렬순서
    prlgSetForm.delYn           = null;   //삭제여부
    prlgSetForm.regNo           = null;   //등록자
    prlgSetForm.regDtt          = null;   //등록일시
    prlgSetForm.modNo           = null;   //수정자
    prlgSetForm.modDtt          = null;   //수정일시
}
function newPrlgSetForm() {
    initPrlgSetForm();
    return prlgSetForm;
}
exports.newPrlgSetForm = newPrlgSetForm;