window.addEventListener('DOMContentLoaded', () => {
    /* 프로필 박스 고정 */
    const profileBox = document.querySelector('.profile_box');
    if(profileBox != null) {
        profileBox.addEventListener('click', (e) => {
            let thisClList = e.currentTarget.classList;
            if(thisClList.contains('on')) {
                thisClList.remove('on');
            } else {
                thisClList.add('on');
            }
        });
    }
    /* //프로필 박스 고정 */

    /* 이메일 형식 체크 */
    const Emailregex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;  //이메일 정규식
    
    let emailInpList = document.getElementsByClassName('email_check');
    for(let emailInp of emailInpList) {
        emailInp.addEventListener('change', () => {
            if(emailInp.value !== '') {
                emailCheck(emailInp, emailInp.value);
            } else {    //이메일 값이 없으면 err 클래스 삭제
                emailInp.classList.remove('err');
            }
        });
    }
    /* 이메일 형식 체크 함수*/
    const emailCheck = (emailInp, email) => {
        if(Emailregex.test(email)) {    //이메일 형식이면 err 클래스 삭제
            emailInp.classList.remove('err');
        } else {    //이메일 형식이 아니면 err 클래스 추가
            emailInp.classList.add('err');
            emailInp.focus();
        }
    }
    /* //이메일 형식 체크 */
});

