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
exports.newBlogMenuForm = () => {
    initBlogMenuForm();
    return blogMenuForm;
};

exports.setBlogMenuJson = [
    {
        blgMnuNo: 'BM01'
      , blgMnuNm: '블로그'
      , rprsMnuYn: 'Y'
      , ncsYn: 'Y'
      , useYn: 'Y'
      , blgMnuTyCd: '101101'
      , pagPstCnt: 1
      , prlgFrmCd: null
      , ntfYn: null
    }
  , {
        blgMnuNo: 'BM02'
      , blgMnuNm: '프롤로그'
      , rprsMnuYn: 'N'
      , ncsYn: 'Y'
      , useYn: 'N'
      , blgMnuTyCd: '101102'
      , pagPstCnt: null
      , prlgFrmCd: '102101'   /* 글강조 */  
      , ntfYn: null
    }
    , {
        blgMnuNo: 'BM03'
      , blgMnuNm: '방명록'
      , rprsMnuYn: 'N'
      , ncsYn: 'Y'
      , useYn: 'Y'
      , blgMnuTyCd: '101103'
      , pagPstCnt: null
      , prlgFrmCd: null
      , ntfYn: 'Y'
    }
];


let topMenuSetForm = new Object();
function initTopMenuSetForm() {
    topMenuSetForm.intgMbrNo    = null;   //회원번호
    topMenuSetForm.pstClNo      = null;   //게시글분류번호
    topMenuSetForm.seq          = null;   //정렬순서
}
exports.newTopMenuSetForm = () => {
    initTopMenuSetForm();
    return topMenuSetForm;
};

let blogInfoForm = new Object();
function initBlogInfoForm() {
    blogInfoForm.intgMbrNo  = null;   //회원번호
    blogInfoForm.blgMnuNo   = null;   //블로그메뉴번호
    blogInfoForm.blgNm      = null;   //블로그명
    blogInfoForm.blgIntro   = null;   //블로그소개
    blogInfoForm.tpcCtgNo   = null;   //주제카테고리번호
}
exports.newBlogInfoForm = () => {
    initBlogInfoForm();
    return blogInfoForm;
};

let prlgDmnForm = new Object();
function initPrlgDmnForm() {
    prlgDmnForm.prlgDmnNo   = null;   //프롤로그영역번호
    prlgDmnForm.prlgFrmCd   = null;   //프롤로그형태코드
    prlgDmnForm.prlgDmnNm   = null;   //프롤로그영역명
    prlgDmnForm.ncsYn       = null;   //필수여부
    prlgDmnForm.delYn       = null;   //삭제여부
}
exports.newPrlgDmnForm = () => {
    initPrlgDmnForm();
    return prlgDmnForm;
};

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
exports.newPrlgSetForm = () => {
    initPrlgSetForm();
    return prlgSetForm;
};



