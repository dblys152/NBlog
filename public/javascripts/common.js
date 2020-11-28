window.addEventListener('DOMContentLoaded', () => {
    const Emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    /* 이메일 형식 체크 */
    let emailInpList = document.getElementsByClassName('email_check');
    for(let emailInp of emailInpList) {
        emailInp.addEventListener('change', () => {
            if(emailInp.value !== '') {
                emailCheck(emailInp, emailInp.value);
            }
        });
    }
    /* 이메일 형식 체크 함수*/
    const emailCheck = (thisInp, email) => {
        if(Emailregex.test(email)) {
            thisInp.classList.remove('err');
        } else {
            alert('이메일 형식을 확인해주세요.');
            thisInp.classList.add('err');
            thisInp.focus();
        }
    }

});

