let postClForm = new Object();
function initPostClForm() {
    postClForm.pstClNo       = null;   //게시글분류번호
    postClForm.intgMbrNo     = null;   //회원번호
    postClForm.blgMnuNo      = null;   //블로그메뉴번호
    postClForm.pstClTyCd     = null;   //게시글분류유형코드
    postClForm.pstClNm       = null;   //게시글분류명
    postClForm.upPstClNo     = null;   //상위게시글분류번호
    postClForm.tpcCtgNo      = null;   //주제카테고리번호
    postClForm.dispYn        = null;   //전시여부
    postClForm.dispTyCd      = null;   //전시유형코드
    postClForm.listDispYn    = null;   //목록노출여부
    postClForm.listDispCnt   = null;   //목록노출갯수
    postClForm.thmbRtCd      = null;   //섬네일비율코드
    postClForm.seq           = null;   //정렬순서
    postClForm.delYn         = null;   //삭제여부
    postClForm.regNo         = null;   //등록자
    postClForm.regDtt        = null;   //등록일시
    postClForm.modNo         = null;   //수정자
    postClForm.modDtt        = null;   //수정일시
}
exports.newPostClForm = () => {
    initPostClForm();
    return postClForm;
};

let postForm = new Object();
function initPostForm() {
    postForm.pstNO      = null;   //게시글번호
    postForm.pstClNo    = null;   //게시글분류번호
    postForm.tpcCtgNo   = null;   //주제카테고리번호
    postForm.pstTtl     = null;   //게시글제목
    postForm.pstLtCntn  = null;   //게시글일부내용
    postForm.pstCntn    = null;   //게시글내용
    postForm.pstDispCd  = null;   //게시글전시코드
    postForm.topPstYn   = null;   //상단고정여부
    postForm.wrtDtt     = null;   //작성일시
    postForm.viewCnt    = null;   //조회수
    postForm.cmntYn     = null;   //댓글가능여부
    postForm.rcmYn      = null;   //추천가능여부
    postForm.pstStDtt   = null;   //게시시작일시
    postForm.pstEdDtt   = null;   //게시종료일시
    postForm.delYn      = null;   //삭제여부
    postForm.regNo      = null;   //등록자
    postForm.regDtt     = null;   //등록일시
    postForm.modNo      = null;   //수정자
    postForm.modDtt     = null;   //수정일시
}
exports.newPostForm = () => {
    initPostForm();
    return postForm;
};

let tagForm = new Object();
function initTagForm() {
    tagForm.pstNo   = null;   //게시글번호
    tagForm.tagSeq  = null;   //태그순번
    tagForm.tagNm   = null;   //태그명
}
exports.newTagForm = () => {
    initTagForm();
    return tagForm;
};

let cmntForm = new Object();
function initCmntForm() {
    cmntForm.cmntNo     = null;   //댓글번호
    cmntForm.pstNo      = null;   //게시글번호
    cmntForm.cmntCntn   = null;   //댓글내용
    cmntForm.upCmntNo   = null;   //상위댓글번호
    cmntForm.wrtMbrNo   = null;   //작성자회원번호
    cmntForm.wrtDtt     = null;   //작성일시
    cmntForm.delYn      = null;   //삭제여부
    cmntForm.regNo      = null;   //등록자
    cmntForm.regDtt     = null;   //등록일시
    cmntForm.modNo      = null;   //수정자
    cmntForm.modDtt     = null;   //수정일시
}
exports.newCmntForm = () => {
    initCmntForm();
    return cmntForm;
};

let rcmItemForm = new Object();
function initRcmItemForm() {
    rcmItemForm.rcmIdntCd   = null;   //추천식별코드
    rcmItemForm.rcmIdntNo   = null;   //추천식별번호
    rcmItemForm.rcmMbrNo    = null;   //추천회원번호
    rcmItemForm.rcmDtt      = null;   //추천일시
}
exports.newRcmItemForm = () => {
    initRcmItemForm();
    return rcmItemForm;
};