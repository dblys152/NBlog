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
