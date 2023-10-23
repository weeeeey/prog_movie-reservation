export default function LoginForm({ handleForm }) {
    this.$target = document.querySelector('#loginSection');

    this.$target.addEventListener('click', (e) => {
        const button = e.target.closest('#theaterLoginBtn');
        if (!button) return;
        const regEmail =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.]).{4,}@[A-Za-z\d.]{4,}\.co$/;
        const regPassword =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@~])[A-Za-z\d!@~]{8,20}$/;

        const $email = document.querySelector('#email');
        const $password = document.querySelector('#password');
        const emailValue = $email.value;
        const passwordValue = $password.value;
        if (emailValue.length === 0 || passwordValue.length === 0) {
            window.alert('이메일 혹은 비밀번호가 입력되지 않았습니다.');
        } else {
            if (!regEmail.test(emailValue)) {
                window.alert('이메일 형식이 올바르지 않습니다.');
            } else if (!regPassword.test(passwordValue)) {
                if (passwordValue.length < 8 || passwordValue.length > 20) {
                    window.alert(
                        '비밀번호는 최소 8자 이상, 최대 20자 이하로 구성해야 합니다.'
                    );
                } else {
                    window.alert(
                        '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.'
                    );
                }
            } else {
                handleForm(emailValue);
                window.alert('로그인 성공!');
            }
        }
    });
}
