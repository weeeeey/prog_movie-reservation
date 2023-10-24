import PersonalsButton from './PersonalsButton.js';
import Reselect from './Reselect.js';
import ReservationInfo from './ReservationInfo.js';
import Seat from './Seat.js';

export default function Reservation() {
    this.state = {
        adult: 0,
        children: 0,
        isDiff: false,
        remainSeatCnt: 39,
        selectSeats: [],
    };

    const personalsButton = new PersonalsButton({
        initialState: this.state,
        onClick: (num, person) => {
            this.setState({
                ...this.state,
                [person]: num,
            });
        },
        onToggle: () => {
            this.setState({
                ...this.state,
                isDiff: !this.state.isDiff,
            });
        },
        onCheck: () => {
            window.alert(
                `머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.`
            );
            this.setState({
                ...this.state,
                adult: 0,
                children: 0,
                isDiff: false,
            });
        },
    });

    const reservationInfo = new ReservationInfo({
        initialState: this.state,
    });

    const seats = new Seat({
        initialState: this.state,
        onInit: ($target) => {
            if (this.state.adult + this.state.children !== 0) {
                $target.forEach((node, index) => {
                    if (this.state.isDiff && parseInt(index / 13) === 2) {
                        node.classList.remove('disabled');
                    } else {
                        node.classList.remove('disabled');
                    }
                    node.id = index;
                });
            } else {
                $target.forEach((node) => {
                    node.classList.add('disabled');
                });
            }
        },
        onSelectedSeats: ($target) => {
            $target.forEach((node, idx) => {
                if (this.state.selectSeats.includes(idx)) {
                    node.classList.add('clicked');
                } else {
                    node.classList.remove('clicked');
                }
            });
        },
        handleFullSeats: ($target) => {
            $target.forEach((node, idx) => {
                if (!this.state.selectSeats.includes(idx)) {
                    node.classList.add('disabled');
                }
            });
        },
        handleHandicap: () => {
            this.setState({
                ...this.state,
                isDiff: false,
            });
            const $handicap = document.querySelector('#checkHandicap');
            $handicap.checked = false;
            $handicap.setAttribute('disabled', true);
        },
        resetState: () => {
            this.setState({
                adult: 0,
                children: 0,
                isDiff: false,
                remainSeatCnt: 39,
                selectSeats: [],
            });
        },
        addSeats: (num) => {
            this.setState({
                ...this.state,
                selectSeats: [...this.state.selectSeats, parseInt(num)],
            });
        },
        minusSeats: (num) => {
            this.setState({
                ...this.state,
                selectSeats: this.state.selectSeats.filter(
                    (seat) => seat !== parseInt(num)
                ),
            });
        },
    });
    new Reselect({
        handleReselect: () => {
            this.setState({
                adult: 0,
                children: 0,
                isDiff: false,
                remainSeatCnt: 39,
                selectSeats: [],
            });
        },
    });

    this.setState = (nextState) => {
        this.state = nextState;
        personalsButton.setState(this.state);
        reservationInfo.setState(this.state);
        seats.setState(this.state);
    };
}
