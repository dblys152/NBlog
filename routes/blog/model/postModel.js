/* 게시글 분류 */
class PostClForm {
    pstClNo         = null;   //게시글분류번호
    #pstClNo        = {value: null, dataType: "number", required: true};
    intgMbrNo       = null;   //회원번호
    #intgMbrNo      = {value: null, dataType: "string", required: true};
    blgMnuNo        = null;   //블로그메뉴번호
    #blgMnuNo       = {value: null, dataType: "string", required: true};
    pstClTyCd       = null;   //게시글분류유형코드
    #pstClTyCd      = {value: null, dataType: "string", required: true};
    pstClNm         = null;   //게시글분류명
    #pstClNm        = {value: null, dataType: "string", required: true};
    upPstClNo       = null;   //상위게시글분류번호
    #upPstClNo      = {value: null, dataType: "number", required: true};
    tpcCtgNo        = null;   //주제카테고리번호
    #tpcCtgNo       = {value: null, dataType: "string", required: true};
    pstCntDispYn    = null;   //글갯수표시여부
    #pstCntDispYn   = {value: null, dataType: "string", required: true};
    dispYn          = null;   //전시여부
    #dispYn         = {value: null, dataType: "string", required: true};
    dispTyCd        = null;   //전시유형코드
    #dispTyCd       = {value: null, dataType: "string", required: true};
    listDispYn      = null;   //목록노출여부
    #listDispYn     = {value: null, dataType: "string", required: false};
    listDispCnt     = null;   //목록노출갯수
    #listDispCnt    = {value: null, dataType: "number", required: false};
    thmbRtCd        = null;   //섬네일비율코드
    #thmbRtCd       = {value: null, dataType: "string", required: false};
    seq             = null;   //정렬순서
    #seq            = {value: null, dataType: "number", required: false};
    delYn           = null;   //삭제여부
    #delYn          = {value: null, dataType: "string", required: true};
    regNo           = null;   //등록자
    #regNo          = {value: null, dataType: "string", required: true};
    regDtt          = null;   //등록일시
    #regDtt         = {value: null, dataType: "string", required: true};
    modNo           = null;   //수정자
    #modNo          = {value: null, dataType: "string", required: true};
    modDtt          = null;   //수정일시
    #modDtt         = {value: null, dataType: "string", required: true};
    
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

    setPstClNo(pstClNo) { PostClForm.typeCheck(this.#pstClNo, pstClNo, "pstClNo"); this.pstClNo = this.#pstClNo.value; }
    setIntgMbrNo(intgMbrNo) { PostClForm.typeCheck(this.#intgMbrNo, intgMbrNo, "intgMbrNo"); this.intgMbrNo = this.#intgMbrNo.value; }
    setBlgMnuNo(blgMnuNo) { PostClForm.typeCheck(this.#blgMnuNo, blgMnuNo, "blgMnuNo"); this.blgMnuNo = this.#blgMnuNo.value; }
    setPstClTyCd(pstClTyCd) { PostClForm.typeCheck(this.#pstClTyCd, pstClTyCd, "pstClTyCd"); this.pstClTyCd = this.#pstClTyCd.value; }
    setPstClNm(pstClNm) { PostClForm.typeCheck(this.#pstClNm, pstClNm, "pstClNm"); this.pstClNm = this.#pstClNm.value; }
    setUpPstClNo(upPstClNo) { PostClForm.typeCheck(this.#upPstClNo, upPstClNo, "upPstClNo"); this.upPstClNo = this.#upPstClNo.value; }
    setTpcCtgNo(tpcCtgNo) { PostClForm.typeCheck(this.#tpcCtgNo, tpcCtgNo, "tpcCtgNo"); this.tpcCtgNo = this.#tpcCtgNo.value; }
    setPstCntDispYn(pstCntDispYn) { PostClForm.typeCheck(this.#pstCntDispYn, pstCntDispYn, "pstCntDispYn"); this.pstCntDispYn = this.#pstCntDispYn.value; }
    setDispYn(dispYn) { PostClForm.typeCheck(this.#dispYn, dispYn, "dispYn"); this.dispYn = this.#dispYn.value; }
    setDispTyCd(dispTyCd) { PostClForm.typeCheck(this.#dispTyCd, dispTyCd, "dispTyCd"); this.dispTyCd = this.#dispTyCd.value; }
    setListDispYn(listDispYn) { PostClForm.typeCheck(this.#listDispYn, listDispYn, "listDispYn"); this.listDispYn = this.#listDispYn.value; }
    setListDispCnt(listDispCnt) { PostClForm.typeCheck(this.#listDispCnt, listDispCnt, "listDispCnt"); this.listDispCnt = this.#listDispCnt.value; }
    setThmbRtCd(thmbRtCd) { PostClForm.typeCheck(this.#thmbRtCd, thmbRtCd, "thmbRtCd"); this.thmbRtCd = this.#thmbRtCd.value; }
    setSeq(seq) { PostClForm.typeCheck(this.#seq, seq, "seq"); this.seq = this.#seq.value; }
    setDelYn(delYn) { PostClForm.typeCheck(this.#delYn, delYn, "delYn"); this.delYn = this.#delYn.value; }
    setRegNo(regNo) { PostClForm.typeCheck(this.#regNo, regNo, "regNo"); this.regNo = this.#regNo.value; }
    setRegDtt(regDtt) { PostClForm.typeCheck(this.#regDtt, regDtt, "regDtt"); this.regDtt = this.#regDtt.value; }
    setModNo(modNo) { PostClForm.typeCheck(this.#modNo, modNo, "modNo"); this.modNo = this.#modNo.value; }
    setModDtt(modDtt) { PostClForm.typeCheck(this.#modDtt, modDtt, "modDtt"); this.modDtt = this.#modDtt.value; }
}

/* 게시글 */
class PostForm extends PostClForm {
    pstNo       = null;   //게시글번호
    #pstNo      = {value: null, dataType: "number", required: true};
    tpcCtgNo    = null;   //주제카테고리번호
    #tpcCtgNo   = {value: null, dataType: "string", required: true};
    pstTtl      = null;   //게시글제목
    #pstTtl     = {value: null, dataType: "string", required: true};
    pstLtCntn   = null;   //게시글일부내용
    #pstLtCntn  = {value: null, dataType: "string", required: true};
    pstCntn     = null;   //게시글내용
    #pstCntn    = {value: null, dataType: "string", required: true};
    pstDispCd   = null;   //게시글전시코드
    #pstDispCd  = {value: null, dataType: "string", required: true};
    topPstYn    = null;   //상단고정여부
    #topPstYn   = {value: null, dataType: "string", required: true};
    wrtDtt      = null;   //작성일시
    #wrtDtt     = {value: null, dataType: "string", required: true};
    viewCnt     = null;   //조회수
    #viewCnt    = {value: null, dataType: "number", required: true};
    cmntYn      = null;   //댓글가능여부
    #cmntYn     = {value: null, dataType: "string", required: true};
    rcmYn       = null;   //추천가능여부
    #rcmYn      = {value: null, dataType: "string", required: true};
    pstStDtt    = null;   //게시시작일시
    #pstStDtt   = {value: null, dataType: "string", required: false};
    pstEdDtt    = null;   //게시종료일시
    #pstEdDtt   = {value: null, dataType: "string", required: false};
    tagSeq      = null;   //태그순번
    #tagSeq     = {value: null, dataType: "number", required: true};
    tagNm       = null;   //태그명
    #tagNm      = {value: null, dataType: "string", required: true};

    constructor() { super(); }

    setPstNo(pstNo) { PostForm.typeCheck(this.#pstNo, pstNo, "pstNo"); this.pstNo = this.#pstNo.value; }
    setTpcCtgNo(tpcCtgNo) { PostForm.typeCheck(this.#tpcCtgNo, tpcCtgNo, "tpcCtgNo"); this.tpcCtgNo = this.#tpcCtgNo.value; }
    setPstTtl(pstTtl) { PostForm.typeCheck(this.#pstTtl, pstTtl, "pstTtl"); this.pstTtl = this.#pstTtl.value; }
    setPstLtCntn(pstLtCntn) { PostForm.typeCheck(this.#pstLtCntn, pstLtCntn, "pstLtCntn"); this.pstLtCntn = this.#pstLtCntn.value; }
    setPstCntn(pstCntn) { PostForm.typeCheck(this.#pstCntn, pstCntn, "pstCntn"); this.pstCntn = this.#pstCntn.value; }
    setPstDispCd(pstDispCd) { PostForm.typeCheck(this.#pstDispCd, pstDispCd, "pstDispCd"); this.pstDispCd = this.#pstDispCd.value; }
    setTopPstYn(topPstYn) { PostForm.typeCheck(this.#topPstYn, topPstYn, "topPstYn"); this.topPstYn = this.#topPstYn.value; }
    setWrtDtt(wrtDtt) { PostForm.typeCheck(this.#wrtDtt, wrtDtt, "wrtDtt"); this.wrtDtt = this.#wrtDtt.value; }
    setViewCnt(viewCnt) { PostForm.typeCheck(this.#viewCnt, viewCnt, "viewCnt"); this.viewCnt = this.#viewCnt.value; }
    setCmntYn(cmntYn) { PostForm.typeCheck(this.#cmntYn, cmntYn, "cmntYn"); this.cmntYn = this.#cmntYn.value; }
    setRcmYn(rcmYn) { PostForm.typeCheck(this.#rcmYn, rcmYn, "rcmYn"); this.rcmYn = this.#rcmYn.value; }
    setPstStDtt(pstStDtt) { PostForm.typeCheck(this.#pstStDtt, pstStDtt, "pstStDtt"); this.pstStDtt = this.#pstStDtt.value; }
    setPstEdDtt(pstEdDtt) { PostForm.typeCheck(this.#pstEdDtt, pstEdDtt, "pstEdDtt"); this.pstEdDtt = this.#pstEdDtt.value; }
    setTagSeq(tagSeq) { PostForm.typeCheck(this.#tagSeq, tagSeq, "tagSeq"); this.tagSeq = this.#tagSeq.value; }
    setTagNm(tagNm) { PostForm.typeCheck(this.#tagNm, tagNm, "tagNm"); this.tagNm = this.#tagNm.value; }
}

/* 댓글 */
class CmntForm {
    cmntNo      = null;   //댓글번호
    #cmntNo     = {value: null, dataType: "string", required: true};
    pstNo       = null;   //게시글번호
    #pstNo      = {value: null, dataType: "string", required: true};
    cmntCntn    = null;   //댓글내용
    #cmntCntn   = {value: null, dataType: "string", required: true};
    upCmntNo    = null;   //상위댓글번호
    #upCmntNo   = {value: null, dataType: "string", required: true};
    wrtMbrNo    = null;   //작성자회원번호
    #wrtMbrNo   = {value: null, dataType: "string", required: true};
    wrtDtt      = null;   //작성일시
    #wrtDtt     = {value: null, dataType: "string", required: true};
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

    setCmntNo(cmntNo) { CmntForm.typeCheck(this.#cmntNo, cmntNo, "cmntNo"); this.cmntNo = this.#cmntNo.value; }
    setPstNo(pstNo) { CmntForm.typeCheck(this.#pstNo, pstNo, "pstNo"); this.pstNo = this.#pstNo.value; }
    setCmntCntn(cmntCntn) { CmntForm.typeCheck(this.#cmntCntn, cmntCntn, "cmntCntn"); this.cmntCntn = this.#cmntCntn.value; }
    setUpCmntNo(upCmntNo) { CmntForm.typeCheck(this.#upCmntNo, upCmntNo, "upCmntNo"); this.upCmntNo = this.#upCmntNo.value; }
    setWrtMbrNo(wrtMbrNo) { CmntForm.typeCheck(this.#wrtMbrNo, wrtMbrNo, "wrtMbrNo"); this.wrtMbrNo = this.#wrtMbrNo.value; }
    setWrtDtt(wrtDtt) { CmntForm.typeCheck(this.#wrtDtt, wrtDtt, "wrtDtt"); this.wrtDtt = this.#wrtDtt.value; }
    setDelYn(delYn) { CmntForm.typeCheck(this.#delYn, delYn, "delYn"); this.delYn = this.#delYn.value; }
    setRegNo(regNo) { CmntForm.typeCheck(this.#regNo, regNo, "regNo"); this.regNo = this.#regNo.value; }
    setRegDtt(regDtt) { CmntForm.typeCheck(this.#regDtt, regDtt, "regDtt"); this.regDtt = this.#regDtt.value; }
    setModNo(modNo) { CmntForm.typeCheck(this.#modNo, modNo, "modNo"); this.modNo = this.#modNo.value; }
    setModDtt(modDtt) { CmntForm.typeCheck(this.#modDtt, modDtt, "modDtt"); this.modDtt = this.#modDtt.value; }
}

/* 추천항목 */
class rcmItemForm {
    rcmIdntCd   = null;   //추천식별코드
    #rcmIdntCd  = {value: null, dataType: "string", required: true};
    rcmIdntNo   = null;   //추천식별번호
    #rcmIdntNo  = {value: null, dataType: "string", required: true};
    rcmMbrNo    = null;   //추천회원번호
    #rcmMbrNo   = {value: null, dataType: "string", required: true};
    rcmDtt      = null;   //추천일시
    #rcmDtt     = {value: null, dataType: "string", required: true};

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

    setRcmIdntCd(rcmIdntCd) { rcmItemForm.typeCheck(this.#rcmIdntCd, rcmIdntCd, "rcmIdntCd"); this.rcmIdntCd = this.#rcmIdntCd.value; }
    setRcmIdntNo(rcmIdntNo) { rcmItemForm.typeCheck(this.#rcmIdntNo, rcmIdntNo, "rcmIdntNo"); this.rcmIdntNo = this.#rcmIdntNo.value; }
    setRcmMbrNo(rcmMbrNo) { rcmItemForm.typeCheck(this.#rcmMbrNo, rcmMbrNo, "rcmMbrNo"); this.rcmMbrNo = this.#rcmMbrNo.value; }
    setRcmDtt(rcmDtt) { rcmItemForm.typeCheck(this.#rcmDtt, rcmDtt, "rcmDtt"); this.rcmDtt = this.#rcmDtt.value; }
}

module.exports = { PostClForm, PostForm, CmntForm, rcmItemForm };