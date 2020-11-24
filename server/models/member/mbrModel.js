let mbrForm = new Object();
function initMbrForm() {
    mbrForm.mbrNo       = null;   //회원번호
    mbrForm.mbrEmail    = null;   //회원이메일
    mbrForm.mbrPw       = null;   //회원비밀번호
    mbrForm.mbrNknm     = null;   //회원닉네임
    mbrForm.mbrStatCd   = null;   //회원상태코드
    mbrForm.mbrSxCd     = null;   //회원성별코드
    mbrForm.mbrIntro    = null;   //회원소개
    mbrForm.mbrJnDtt    = null;   //회원가입일시
    mbrForm.pwErrCnt    = null;   //비밀번호오류횟수
    mbrForm.prevPw      = null;   //이전비밀번호
    mbrForm.pwChgDtt    = null;   //비밀번호변경일시
    mbrForm.lastLgnDtt  = null;   //최근로그인일시
    mbrForm.mbrWthdDtt  = null;   //회원탈퇴일시
}
function newMbrForm() {
    initMbrForm();
    return mbrForm;
}
exports.newMbrForm = newMbrForm;

let snsMbrForm = new Object();
function initSnsMbrForm() {
    snsMbrForm.smbrNo       = null;   //SNS회원번호
    snsMbrForm.smbrUid      = null;   //SNS회원식별아이디
    snsMbrForm.smbrNknm     = null;   //SNS회원닉네임
    snsMbrForm.smbrStatCd   = null;   //SNS회원상태코드
    snsMbrForm.smbrSxCd     = null;   //SNS회원성별코드
    snsMbrForm.smbrIntro    = null;   //SNS회원소개
    snsMbrForm.smbrEmail    = null;   //SNS회원이메일
    snsMbrForm.smbrJnDtt    = null;   //SNS회원가입일시
    snsMbrForm.lastLgnDtt   = null;   //SNS최근로그인일시
    snsMbrForm.smbrWthdDtt  = null;   //SNS회원탈퇴일시
}
function newSnsMbrForm() {
    initSnsMbrForm();
    return snsMbrForm;
}
exports.newSnsMbrForm = newSnsMbrForm;

let mbrSbscForm = new Object();
function initMbrSbscForm() {
    mbrSbscForm.intgMbrNo   = null;   //회원번호
    mbrSbscForm.sbscMbrNo   = null;   //구독회원번호
    mbrSbscForm.sbscDtt     = null;   //구독일시
    mbrSbscForm.ntfYn       = null;   //알림여부
}
function newMbrSbscForm() {
    initMbrSbscForm();
    return mbrSbscForm;
}
exports.newMbrSbscForm = newMbrSbscForm;