export default function Seat({
    initialState,
    onInit,
    onSelectedSeats,
    handleFullSeats,
    handleRestSeats,
    resetState,
    addSeats,
    minusSeats,
}) {
    this.state = initialState;
    this.$target = document.querySelector('.seat-group');
    this.$seats = document.querySelectorAll('.seat');

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const { adult, children, isDiff, selectSeats } = this.state;

        onInit(this.$seats);
        onSelectedSeats(this.$seats);
        handleRestSeats(this.$seats);
        if (adult + children < selectSeats.length) {
            resetState();
        }
        if (
            !isDiff &&
            selectSeats.some((seatId) => [36, 37, 38].includes(seatId))
        ) {
            resetState();
        }
        if (adult + children === selectSeats.length) {
            handleFullSeats(this.$seats);
        }
    };

    this.render();

    this.$target.addEventListener('click', (e) => {
        const clickedSeatBtn = e.target.closest('.seat');
        if (!clickedSeatBtn) return;
        if (
            !this.state.isDiff &&
            [36, 37, 38].includes(parseInt(clickedSeatBtn.id))
        ) {
            window.alert(
                '선택하신 좌석은 장애인석으로 일반고객은 예매할 수 없는 좌석입니다.'
            );
            return;
        }
        if (
            parseInt(clickedSeatBtn.id / 13) === 2 &&
            ![36, 37, 38].includes(parseInt(clickedSeatBtn.id)) &&
            (this.state.adult + this.state.children) % 2 !== 0
        ) {
            window.alert(
                '선택하신 ‘MUSSEUKBOX’ 좌석은 2인 좌석입니다. 2인 단위로 인원을 선택해주세요.'
            );
            return;
        }
        if (clickedSeatBtn.classList.contains('clicked')) {
            minusSeats(clickedSeatBtn.id);
        } else {
            addSeats(clickedSeatBtn.id);
        }
    });
}
