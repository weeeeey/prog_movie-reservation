export default function Seat({
    initialState,
    onInit,
    addSeat,
    minusSeat,
    ifFullCheck,
    ifHandicap,
    possibleSeat,
    reset,
}) {
    this.state = initialState;
    this.$target = document.querySelector('#theaterSeat');

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { adult, children, isHandicap, selectedSeats } = this.state;
        if (adult + children < selectedSeats.length) {
            reset();
        }
        onInit(adult, children, this.$target);
        if (selectedSeats.length > 0) {
            possibleSeat(this.$target);
        }
        if (isHandicap) {
            ifHandicap(this.$target);
        }
        if (adult + children === selectedSeats.length) {
            ifFullCheck(this.$target, selectedSeats);
        }
    };
    this.render();

    this.$target.addEventListener('click', (e) => {
        const seat = e.target.closest('.seat');
        if (!seat) return;
        const { adult, children, isHandicap, selectedSeats } = this.state;
        const seatId = parseInt(seat.id);

        if (!isHandicap && [36, 37, 38].includes(seatId)) {
            window.alert(
                '선택하신 좌석은 장애인석으로 일반고객은 예매할 수 없는 좌석입니다'
            );
            return;
        }
        if (
            !isHandicap &&
            parseInt(seatId / 13) === 2 &&
            (adult + children) % 2 === 1
        ) {
            window.alert(
                '선택하신 ‘MUSSEUKBOX’ 좌석은 2인 좌석입니다. 2인 단위로 인원을 선택해주세요.'
            );
            return;
        }

        if (selectedSeats.includes(seatId)) {
            minusSeat(seatId);
        } else {
            addSeat(seatId);
        }
    });
}
