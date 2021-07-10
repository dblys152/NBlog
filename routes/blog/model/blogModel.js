/* 블로그 정보 */
class BlogForm {
    intgMbrNo   = null;   //회원번호
    #intgMbrNo  = {value: null, dataType: "string", required: true};
    blgMnuNo    = null;   //블로그메뉴번호
    #blgMnuNo   = {value: null, dataType: "string", required: true};
    blgNm       = null;   //블로그명
    #blgNm      = {value: null, dataType: "string", required: true};
    blgIntro    = null;   //블로그소개
    #blgIntro   = {value: null, dataType: "string", required: false};
    tpcCtgNo    = null;   //주제카테고리번호
    #tpcCtgNo   = {value: null, dataType: "string", required: true};
    delYn       = null;   //삭제여부
    #delYn      = {value: null, dataType: "string", required: true};
    regNo       = null;   //등록자
    #regNo      = {value: null, dataType: "string", required: true};
    regDtt      = null;   //등록일시
    #regDtt     = {value: null, dataType: "string", required: true};
    modNo       = null;   //수정자
    #modNo      = {value: null, dataType: "string", required: true};
    modDtt      = null;   //수정일시
    #modDtt     = {value: null, dataType: "string", required: true};

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

    setIntgMbrNo(intgMbrNo) { BlogForm.typeCheck(this.#intgMbrNo, intgMbrNo, "intgMbrNo"); this.intgMbrNo = this.#intgMbrNo.value; }
    setBlgMnuNo(blgMnuNo) { BlogForm.typeCheck(this.#blgMnuNo, blgMnuNo, "blgMnuNo"); this.blgMnuNo = this.#blgMnuNo.value; }
    setBlgNm(blgNm) { BlogForm.typeCheck(this.#blgNm, blgNm, "blgNm"); this.blgNm = this.#blgNm.value; }
    setBlgIntro(blgIntro) { BlogForm.typeCheck(this.#blgIntro, blgIntro, "blgIntro"); this.blgIntro = this.#blgIntro.value; }
    setTpcCtgNo(tpcCtgNo) { BlogForm.typeCheck(this.#tpcCtgNo, tpcCtgNo, "tpcCtgNo"); this.tpcCtgNo = this.#tpcCtgNo.value; }
    setDelYn(delYn) { BlogForm.typeCheck(this.#delYn, delYn, "delYn"); this.delYn = this.#delYn.value; }
    setRegNo(regNo) { BlogForm.typeCheck(this.#regNo, regNo, "regNo"); this.regNo = this.#regNo.value; }
    setRegDtt(regDtt) { BlogForm.typeCheck(this.#regDtt, regDtt, "regDtt"); this.regDtt = this.#regDtt.value; }
    setModNo(modNo) { BlogForm.typeCheck(this.#modNo, modNo, "modNo"); this.modNo = this.#modNo.value; }
    setModDtt(modDtt) { BlogForm.typeCheck(this.#modDtt, modDtt, "modDtt"); this.modDtt = this.#modDtt.value; }
}

/* 블로그 메뉴 */
class BlogMenuForm extends BlogForm {
    blgMnuNm    = null;   //블로그메뉴명
    #blgMnuNm   = {value: null, dataType: "string", required: true};
    rprsMnuYn   = null;   //대표메뉴여부
    #rprsMnuYn  = {value: null, dataType: "string", required: true};
    ncsYn       = null;   //필수여부
    #ncsYn      = {value: null, dataType: "string", required: true};
    useYn       = null;   //사용여부
    #useYn      = {value: null, dataType: "string", required: true};
    blgMnuTyCd  = null;   //블로그메뉴유형코드
    #blgMnuTyCd = {value: null, dataType: "string", required: true};
    pagPstCnt   = null;   //페이지당글갯수
    #pagPstCnt  = {value: null, dataType: "number", required: false};
    prlgFrmCd   = null;   //프롤로그형태코드
    #prlgFrmCd  = {value: null, dataType: "string", required: false};
    ntfYn       = null;   //알림여부
    #ntfYn      = {value: null, dataType: "string", required: false};
    seq         = null;   //정렬순서
    #seq        = {value: null, dataType: "number", required: false};
    note        = null;   //비고
    #note       = {value: null, dataType: "string", required: false};

    constructor() { super(); }

    setBlgMnuNm(blgMnuNm) { BlogMenuForm.typeCheck(this.#blgMnuNm, blgMnuNm, "blgMnuNm"); this.blgMnuNm = this.#blgMnuNm.value; }
    setRprsMnuYn(rprsMnuYn) { BlogMenuForm.typeCheck(this.#rprsMnuYn, rprsMnuYn, "rprsMnuYn"); this.rprsMnuYn = this.#rprsMnuYn.value; }
    setNcsYn(ncsYn) { BlogMenuForm.typeCheck(this.#ncsYn, ncsYn, "ncsYn"); this.ncsYn = this.#ncsYn.value; }
    setUseYn(useYn) { BlogMenuForm.typeCheck(this.#useYn, useYn, "useYn"); this.useYn = this.#useYn.value; }
    setBlgMnuTyCd(blgMnuTyCd) { BlogMenuForm.typeCheck(this.#blgMnuTyCd, blgMnuTyCd, "blgMnuTyCd"); this.blgMnuTyCd = this.#blgMnuTyCd.value; }
    setPagPstCnt(pagPstCnt) { BlogMenuForm.typeCheck(this.#pagPstCnt, pagPstCnt, "pagPstCnt"); this.pagPstCnt = this.#pagPstCnt.value; }
    setPrlgFrmCd(prlgFrmCd) { BlogMenuForm.typeCheck(this.#prlgFrmCd, prlgFrmCd, "prlgFrmCd"); this.prlgFrmCd = this.#prlgFrmCd.value; }
    setNtfYn(ntfYn) { BlogMenuForm.typeCheck(this.#ntfYn, ntfYn, "ntfYn"); this.ntfYn = this.#ntfYn.value; }
    setSeq(seq) { BlogMenuForm.typeCheck(this.#seq, seq, "seq"); this.seq = this.#seq.value; }
    setNote(note) { BlogMenuForm.typeCheck(this.#note, note, "note"); this.note = this.#note.value; }

    setDefaultMnu(type) {
        switch(type) {
            case 1: 
                this.blgMnuNo = 'BM01';
                this.blgMnuNm = '블로그';
                this.rprsMnuYn = 'Y';
                this.ncsYn = 'Y';
                this.useYn = 'Y';
                this.blgMnuTyCd = '101101';
                this.pagPstCnt = 1;
                this.prlgFrmCd = null;
                this.ntfYn = null;
                break;
            case 2:
                this.blgMnuNo = 'BM02';
                this.blgMnuNm = '프롤로그';
                this.rprsMnuYn = 'N';
                this.ncsYn = 'N';
                this.useYn = 'Y';
                this.blgMnuTyCd = '101102';
                this.pagPstCnt = null;
                this.prlgFrmCd = '102101';      /* 글강조 */
                this.ntfYn = null;
                break;
            case 3:
                this.blgMnuNo = 'BM03';
                this.blgMnuNm = '방명록';
                this.rprsMnuYn = 'N';
                this.ncsYn = 'N';
                this.useYn = 'Y';
                this.blgMnuTyCd = '101103';
                this.pagPstCnt = null;
                this.prlgFrmCd = null;
                this.ntfYn = 'Y';
                break;
            default: break;
        }
    }
}

/* 블로그 상단 메뉴 */
class TopMenuSetForm extends BlogForm {
    pstClNo     = null;   //게시글분류번호
    #pstClNo    = {value: null, dataType: "number", required: true};
    seq         = null;   //정렬순서
    #seq        = {value: null, dataType: "number", required: false};

    constructor() { super(); }

    setPstClNo(pstClNo) { TopMenuSetForm.typeCheck(this.#pstClNo, pstClNo, "pstClNo"); this.pstClNo = this.#pstClNo.value; }
    setSeq(seq) { TopMenuSetForm.typeCheck(this.#seq, seq, "seq"); this.seq = this.#seq.value; }
}

/* 프롤로그 영역 */
class PrlgDmnForm {
    prlgDmnNo   = null;   //프롤로그영역번호
    #prlgDmnNo  = {value: null, dataType: "string", required: true};
    prlgFrmCd   = null;   //프롤로그형태코드
    #prlgFrmCd  = {value: null, dataType: "string", required: true};
    prlgDmnNm   = null;   //프롤로그영역명
    #prlgDmnNm  = {value: null, dataType: "string", required: true};
    ncsYn       = null;   //필수여부
    #ncsYn      = {value: null, dataType: "string", required: true};
    delYn       = null;   //삭제여부
    #delYn      = {value: null, dataType: "string", required: true};
    regNo       = null;   //등록자
    #regNo      = {value: null, dataType: "string", required: true};
    regDtt      = null;   //등록일시
    #regDtt     = {value: null, dataType: "string", required: true};
    modNo       = null;   //수정자
    #modNo      = {value: null, dataType: "string", required: true};
    modDtt      = null;   //수정일시
    #modDtt     = {value: null, dataType: "string", required: true};

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

    setPrlgDmnNo(prlgDmnNo) { PrlgDmnForm.typeCheck(this.#prlgDmnNo, prlgDmnNo, "prlgDmnNo"); this.prlgDmnNo = this.#prlgDmnNo.value; }
    setPrlgFrmCd(prlgFrmCd) { PrlgDmnForm.typeCheck(this.#prlgFrmCd, prlgFrmCd, "prlgFrmCd"); this.prlgFrmCd = this.#prlgFrmCd.value; }
    setPrlgDmnNm(prlgDmnNm) { PrlgDmnForm.typeCheck(this.#prlgDmnNm, prlgDmnNm, "prlgDmnNm"); this.prlgDmnNm = this.#prlgDmnNm.value; }
    setNcsYn(ncsYn) { PrlgDmnForm.typeCheck(this.#ncsYn, ncsYn, "ncsYn"); this.ncsYn = this.#ncsYn.value; }
    setDelYn(delYn) { PrlgDmnForm.typeCheck(this.#delYn, delYn, "delYn"); this.delYn = this.#delYn.value; }
    setRegNo(regNo) { PrlgDmnForm.typeCheck(this.#regNo, regNo, "regNo"); this.regNo = this.#regNo.value; }
    setRegDtt(regDtt) { PrlgDmnForm.typeCheck(this.#regDtt, regDtt, "regDtt"); this.regDtt = this.#regDtt.value; }
    setModNo(modNo) { PrlgDmnForm.typeCheck(this.#modNo, modNo, "modNo"); this.modNo = this.#modNo.value; }
    setModDtt(modDtt) { PrlgDmnForm.typeCheck(this.#modDtt, modDtt, "modDtt"); this.modDtt = this.#modDtt.value; }
}

/* 프롤로그 설정 */
class PrlgSetForm extends PrlgDmnForm {
    intgMbrNo       = null;   //회원번호
    #intgMbrNo      = {value: null, dataType: "string", required: true};
    blgMnuNo        = null;   //블로그메뉴번호
    #blgMnuNo       = {value: null, dataType: "string", required: true};
    pstClNo         = null;   //게시글분류번호
    #pstClNo        = {value: null, dataType: "number", required: true};
    prlgDmnUseYn    = null;   //프롤로그영역사용여부
    #prlgDmnUseYn   = {value: null, dataType: "string", required: true};
    pstDispLineCnt  = null;   //게시글노출라인수
    #pstDispLineCnt = {value: null, dataType: "number", required: true};
    prlgDmnSeq      = null;   //프롤로그영역정렬순서
    #prlgDmnSeq     = {value: null, dataType: "number", required: true};

    constructor() { super(); }

    setIntgMbrNo(intgMbrNo) { PrlgSetForm.typeCheck(this.#intgMbrNo, intgMbrNo, "intgMbrNo"); this.intgMbrNo = this.#intgMbrNo.value; }
    setBlgMnuNo(blgMnuNo) { PrlgSetForm.typeCheck(this.#blgMnuNo, blgMnuNo, "blgMnuNo"); this.blgMnuNo = this.#blgMnuNo.value; }
    setPstClNo(pstClNo) { PrlgSetForm.typeCheck(this.#pstClNo, pstClNo, "pstClNo"); this.pstClNo = this.#pstClNo.value; }
    setPrlgDmnUseYn(prlgDmnUseYn) { PrlgSetForm.typeCheck(this.#prlgDmnUseYn, prlgDmnUseYn, "prlgDmnUseYn"); this.prlgDmnUseYn = this.#prlgDmnUseYn.value; }
    setPstDispLineCnt(pstDispLineCnt) { PrlgSetForm.typeCheck(this.#pstDispLineCnt, pstDispLineCnt, "pstDispLineCnt"); this.pstDispLineCnt = this.#pstDispLineCnt.value; }
    setPrlgDmnSeq(prlgDmnSeq) { PrlgSetForm.typeCheck(this.#prlgDmnSeq, prlgDmnSeq, "prlgDmnSeq"); this.prlgDmnSeq = this.#prlgDmnSeq.value; }
}

module.exports = { BlogForm, BlogMenuForm, TopMenuSetForm, PrlgDmnForm, PrlgSetForm };






