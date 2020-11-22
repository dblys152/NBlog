let postClForm = new Object();
function initPostClForm() {
    mbrForm.pstClNo       = null;   //게시글분류번호
    mbrForm.intgMbrNo     = null;   //회원번호
    mbrForm.blgMnuNo      = null;   //블로그메뉴번호
    mbrForm.pstClTyCd     = null;   //게시글분류유형코드
    mbrForm.pstClNm       = null;   //게시글분류명
    mbrForm.upPstClNo     = null;   //상위게시글분류번호
    mbrForm.tpcCtgNo      = null;   //주제카테고리번호
    mbrForm.dispYn        = null;   //전시여부
    mbrForm.dispTyCd      = null;   //전시유형코드
    mbrForm.listDispYn    = null;   //목록노출여부
    mbrForm.listDispCnt   = null;   //목록노출갯수
    mbrForm.thmbRtCd      = null;   //섬네일비율코드
    mbrForm.seq           = null;   //정렬순서
    mbrForm.delYn         = null;   //삭제여부
    mbrForm.regNo         = null;   //등록자
    mbrForm.regDtt        = null;   //등록일시
    mbrForm.modNo         = null;   //수정자
    mbrForm.modDtt        = null;   //수정일시
}

function newPostClForm() {
    initPostClForm();
    return postClForm;
}

exports.newPostClForm = newPostClForm;
