/* 회원 */
class MbrForm {
    mbrNo       = null;   //회원번호
    #mbrNo      = {value: null, dataType: "string", required: true};
    mbrEmail    = null;   //회원이메일
    #mbrEmail   = {value: null, dataType: "string", required: true};
    mbrPw       = null;   //회원비밀번호
    #mbrPw      = {value: null, dataType: "string", required: true};
    mbrNknm     = null;   //회원닉네임
    #mbrNknm    = {value: null, dataType: "string", required: true};
    mbrStatCd   = null;   //회원상태코드
    #mbrStatCd  = {value: null, dataType: "string", required: true};
    mbrSxCd     = null;   //회원성별코드
    #mbrSxCd    = {value: null, dataType: "string", required: true};
    mbrIntro    = null;   //회원소개
    #mbrIntro   = {value: null, dataType: "string", required: false};
    mbrJnDtt    = null;   //회원가입일시
    #mbrJnDtt   = {value: null, dataType: "string", required: true};
    pwErrCnt    = null;   //비밀번호오류횟수
    #pwErrCnt   = {value: null, dataType: "number", required: true};
    prevPw      = null;   //이전비밀번호
    #prevPw     = {value: null, dataType: "string", required: false};
    pwChgDtt    = null;   //비밀번호변경일시
    #pwChgDtt   = {value: null, dataType: "string", required: false};
    lastLgnDtt  = null;   //최근로그인일시
    #lastLgnDtt = {value: null, dataType: "string", required: false};
    mbrWthdDtt  = null;   //회원탈퇴일시
    #mbrWthdDtt = {value: null, dataType: "string", required: false};

    smbrNo       = null;   //SNS회원번호
    #smbrNo      = {value: null, dataType: "string", required: true};
    smbrUid      = null;   //SNS회원식별아이디
    #smbrUid     = {value: null, dataType: "string", required: true};
    smbrNknm     = null;   //SNS회원닉네임
    #smbrNknm    = {value: null, dataType: "string", required: true};
    smbrStatCd   = null;   //SNS회원상태코드
    #smbrStatCd  = {value: null, dataType: "string", required: true};
    smbrSxCd     = null;   //SNS회원성별코드
    #smbrSxCd    = {value: null, dataType: "string", required: true};
    smbrIntro    = null;   //SNS회원소개
    #smbrIntro   = {value: null, dataType: "string", required: false};
    smbrEmail    = null;   //SNS회원이메일
    #smbrEmail   = {value: null, dataType: "string", required: false};
    smbrJnDtt    = null;   //SNS회원가입일시
    #smbrJnDtt   = {value: null, dataType: "string", required: true};
    smbrWthdDtt  = null;   //SNS회원탈퇴일시
    #smbrWthdDtt = {value: null, dataType: "string", required: false};

    constructor() {}

    static typeCheck = (thisParam, param, paramNm) => {
        let orgParam = param;
        if(param != null && typeof param == 'string') {             //공백 NULL 처리
            param = (param.trim() == '' ? null : param.trim());
        }
        if(param != null && thisParam.dataType == 'number') {       //body 이외는 다 string 이므로 형변환 필요
            if(!isNaN(parseInt(param))) param = parseInt(param);
        }
        try {
            if(thisParam.required && param != null && typeof param == thisParam.dataType) {
                thisParam.value = param;
            } else if ((!thisParam.required && param == null) || typeof param == thisParam.dataType) {
                thisParam.value = (param == null ? null : param);
            } else {
                throw {status: 400, message:"Data type error : " + paramNm + " / " + orgParam};
            }
        } catch(err) {
            throw err;
        }
    }

    setMbrNo(mbrNo) { MbrForm.typeCheck(this.#mbrNo, mbrNo, "mbrNo"); this.mbrNo = this.#mbrNo.value; }
    setMbrEmail(mbrEmail) { MbrForm.typeCheck(this.#mbrEmail, mbrEmail, "mbrEmail"); this.mbrEmail = this.#mbrEmail.value; }
    setMbrPw(mbrPw) { MbrForm.typeCheck(this.#mbrPw, mbrPw, "mbrPw"); this.mbrPw = this.#mbrPw.value; }
    setMbrNknm(mbrNknm) { MbrForm.typeCheck(this.#mbrNknm, mbrNknm, "mbrNknm"); this.mbrNknm = this.#mbrNknm.value; }
    setMbrStatCd(mbrStatCd) { MbrForm.typeCheck(this.#mbrStatCd, mbrStatCd, "mbrStatCd"); this.mbrStatCd = this.#mbrStatCd.value; }
    setMbrSxCd(mbrSxCd) { MbrForm.typeCheck(this.#mbrSxCd, mbrSxCd, "mbrSxCd"); this.mbrSxCd = this.#mbrSxCd.value; }
    setMbrIntro(mbrIntro) { MbrForm.typeCheck(this.#mbrIntro, mbrIntro, "mbrIntro"); this.mbrIntro = this.#mbrIntro.value; }
    setMbrJnDtt(mbrJnDtt) { MbrForm.typeCheck(this.#mbrJnDtt, mbrJnDtt, "mbrJnDtt"); this.mbrJnDtt = this.#mbrJnDtt.value; }
    setPwErrCnt(pwErrCnt) { MbrForm.typeCheck(this.#pwErrCnt, pwErrCnt, "pwErrCnt"); this.pwErrCnt = this.#pwErrCnt.value; }
    setPrevPw(prevPw) { MbrForm.typeCheck(this.#prevPw, prevPw, "prevPw"); this.prevPw = this.#prevPw.value; }
    setPwChgDtt(pwChgDtt) { MbrForm.typeCheck(this.#pwChgDtt, pwChgDtt, "pwChgDtt"); this.pwChgDtt = this.#pwChgDtt.value; }
    setLastLgnDtt(lastLgnDtt) { MbrForm.typeCheck(this.#lastLgnDtt, lastLgnDtt, "lastLgnDtt"); this.lastLgnDtt = this.#lastLgnDtt.value; }
    setMbrWthdDtt(mbrWthdDtt) { MbrForm.typeCheck(this.#mbrWthdDtt, mbrWthdDtt, "mbrWthdDtt"); this.mbrWthdDtt = this.#mbrWthdDtt.value; }

    setSmbrNo(smbrNo) { MbrForm.typeCheck(this.#smbrNo, smbrNo, "smbrNo"); this.smbrNo = this.#smbrNo.value; }
    setSmbrUid(smbrUid) { MbrForm.typeCheck(this.#smbrUid, smbrUid, "smbrUid"); this.smbrUid = this.#smbrUid.value; }
    setSmbrNknm(smbrNknm) { MbrForm.typeCheck(this.#smbrNknm, smbrNknm, "smbrNknm"); this.smbrNknm = this.#smbrNknm.value; }
    setSmbrStatCd(smbrStatCd) { MbrForm.typeCheck(this.#smbrStatCd, smbrStatCd, "smbrStatCd"); this.smbrStatCd = this.#smbrStatCd.value; }
    setSmbrSxCd(smbrSxCd) { MbrForm.typeCheck(this.#smbrSxCd, smbrSxCd, "smbrSxCd"); this.smbrSxCd = this.#smbrSxCd.value; }
    setSmbrIntro(smbrIntro) { MbrForm.typeCheck(this.#smbrIntro, smbrIntro, "smbrIntro"); this.smbrIntro = this.#smbrIntro.value; }
    setSmbrEmail(smbrEmail) { MbrForm.typeCheck(this.#smbrEmail, smbrEmail, "smbrEmail"); this.smbrEmail = this.#smbrEmail.value; }
    setSmbrJnDtt(smbrJnDtt) { MbrForm.typeCheck(this.#smbrJnDtt, smbrJnDtt, "smbrJnDtt"); this.smbrJnDtt = this.#smbrJnDtt.value; }
    setSmbrWthdDtt(smbrWthdDtt) { MbrForm.typeCheck(this.#smbrWthdDtt, smbrWthdDtt, "smbrWthdDtt"); this.smbrWthdDtt = this.#smbrWthdDtt.value; }
}

/* 회원 구독 */
class MbrSbscForm {
    intgMbrNo   = null;   //회원번호
    #intgMbrNo  = {value: null, dataType: "string", required: true};
    sbscMbrNo   = null;   //구독회원번호
    #sbscMbrNo  = {value: null, dataType: "string", required: true};
    sbscDtt     = null;   //구독일시
    #sbscDtt    = {value: null, dataType: "string", required: true};
    ntfYn       = null;   //알림여부
    #ntfYn      = {value: null, dataType: "string", required: true};

    constructor() {}

    static typeCheck = (thisParam, param, paramNm) => {
        let orgParam = param;
        if(param != null && typeof param == 'string') {             //공백 NULL 처리
            param = (param.trim() == '' ? null : param.trim());
        }
        if(param != null && thisParam.dataType == 'number') {       //body 이외는 다 string 이므로 형변환 필요
            if(!isNaN(parseInt(param))) param = parseInt(param);
        }
        try {
            if(thisParam.required && param != null && typeof param == thisParam.dataType) {
                thisParam.value = param;
            } else if ((!thisParam.required && param == null) || typeof param == thisParam.dataType) {
                thisParam.value = (param == null ? null : param);
            } else {
                throw {status: 400, message:"Data type error : " + paramNm + " / " + orgParam};
            }
        } catch(err) {
            throw err;
        }
    }

    setIntgMbrNo(intgMbrNo) { MbrSbscForm.typeCheck(this.#intgMbrNo, intgMbrNo, "intgMbrNo"); this.intgMbrNo = this.#intgMbrNo.value; }
    setSbscMbrNo(sbscMbrNo) { MbrSbscForm.typeCheck(this.#sbscMbrNo, sbscMbrNo, "sbscMbrNo"); this.sbscMbrNo = this.#sbscMbrNo.value; }
    setSbscDtt(sbscDtt) { MbrSbscForm.typeCheck(this.#sbscDtt, sbscDtt, "sbscDtt"); this.sbscDtt = this.#sbscDtt.value; }
    setNtfYn(ntfYn) { MbrSbscForm.typeCheck(this.#ntfYn, ntfYn, "ntfYn"); this.ntfYn = this.#ntfYn.value; }
}

module.exports = { MbrForm, MbrSbscForm };