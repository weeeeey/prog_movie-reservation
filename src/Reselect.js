export default function Reselect({ handleReselect }) {
    this.$target = document.querySelector('#reselect');

    this.$target.addEventListener('click', (e) => {
        window.alert('선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?');
        handleReselect();
    });
}
