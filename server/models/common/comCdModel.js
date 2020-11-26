exports.comCdData = {
        "blgMnuTyCd"    : "101"     //블로그메뉴유형코드
      , "prlgFrmCd"     : "102"     //프롤로그형태코드
      , "ctgTyCd"       : "103"     //카테고리유형코드
      , "pstClTyCd"     : "104"     //게시글분류유형코드
      , "dispTyCd"      : "105"     //전시유형코드
      , "pstDispCd"     : "106"     //게시글전시코드
      , "idntCd"        : "107"     //식별코드
      , "fileTyCd"      : "108"     //파일유형코드
      , "mbrStatCd"     : "109"     //회원상태코드
      , "mbrSxCd"       : "110"     //회원성별코드
      , "rprtRsnCd"     : "111"     //신고사유코드
};

let fileForm = new Object();
function initFileForm() {
    fileForm.fileNo         = null;   //댓글번호
    fileForm.fileTyCd       = null;   //게시글번호
    fileForm.fileIdntCd     = null;   //댓글내용
    fileForm.fileIdntNo     = null;   //상위댓글번호
    fileForm.fileSeq        = null;   //작성자회원번호
    fileForm.orgFileNm      = null;   //작성일시
    fileForm.fileNm         = null;   //작성일시
    fileForm.filePathNm     = null;   //작성일시
    fileForm.fileSize       = null;   //작성일시
    fileForm.fileExtNm      = null;   //작성일시
    fileForm.fileDownCnt    = null;   //작성일시
    fileForm.note           = null;   //작성일시
    fileForm.delYn          = null;   //삭제여부
    fileForm.regNo          = null;   //등록자
    fileForm.regDtt         = null;   //등록일시
    fileForm.modNo          = null;   //수정자
    fileForm.modDtt         = null;   //수정일시
}
exports.newFileForm = () => {
    initFileForm();
    return fileForm;
};

let rprtForm = new Object();
function initRprtForm() {
    rprtForm.rprtNo         = null;   //신고번호
    rprtForm.rprtIdntCd     = null;   //신고식별코드
    rprtForm.rprtIdntNo     = null;   //신고식별번호
    rprtForm.rprtRsnCd      = null;   //신고사유코드
    rprtForm.rprtCntn       = null;   //신고내용
    rprtForm.rprtRegMbrNo   = null;   //신고자회원번호
    rprtForm.rprtDtt        = null;   //신고일시
    rprtForm.delYn          = null;   //삭제여부
    rprtForm.regNo          = null;   //등록자
    rprtForm.regDtt         = null;   //등록일시
    rprtForm.modNo          = null;   //수정자
    rprtForm.modDtt         = null;   //수정일시
}
exports.newRprtForm = () => {
    initRprtForm();
    return rprtForm;
};