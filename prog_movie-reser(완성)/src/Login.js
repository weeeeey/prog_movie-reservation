export default function Login() {
    this.$email = document.querySelector('#email');
    this.$password = document.querySelector('#password');
    this.$loginBtn = document.querySelector('#theaterLoginBtn');

    this.$loginBtn.addEventListener('click', (e) => {
        const emailValue = this.$email.value;
        const passwordValue = this.$password.value;

        const regEmail = /^[a-zA-Z0-9\.]+@[a-z0-9-_\.]+\.co$/;

        const regPassword =
            /^(?=.*[a-zA-Z])(?=.*[!@~])(?=.*[0-9])[a-zA-Z0-9!@~]{8,20}$/;
        if (!emailValue.length || !passwordValue.length) {
            window.alert('이메일 혹은 비밀번호가 입력되지 않았습니다.');
        } else if (!regEmail.test(emailValue)) {
            window.alert('이메일 형식이 올바르지 않습니다.');
        } else if (!regPassword.test(passwordValue)) {
            if (passwordValue.length < 8 || passwordValue.length > 20) {
                window.alert(
                    `비밀번호는 최소 8자 이상, 최대 20자 이하로 구성해야 합니다.`
                );
            } else {
                window.alert(
                    '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.` '
                );
            }
        } else {
            window.alert('로그인 성공!');
        }
    });
}
