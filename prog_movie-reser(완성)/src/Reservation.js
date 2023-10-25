import NumOfPeople from './NumOfPeople.js';
import ReservationInfo from './ReservationInfo.js';
import ResetInfo from './ResetInfo.js';
import Seat from './Seat.js';

export default function Reservation() {
    this.state = {
        adult: 0,
        children: 0,
        isHandicap: false,
        selectedSeats: [],
    };

    const numOfPeople = new NumOfPeople({
        initialState: this.state,
        onClick: (key, value) => {
            this.setState({
                ...this.state,
                [key]: value,
            });
            if (this.state.adult + this.state.children === 0) {
                this.setState({
                    ...this.state,
                    isHandicap: false,
                });
            }
        },
        onRender: ($target, checkedIdx) => {
            Array.from($target.children).forEach((node, idx) => {
                if (idx === checkedIdx) {
                    node.classList.add('toggle');
                } else {
                    node.classList.remove('toggle');
                }
            });
        },
        handleHandicapOverPeople: ($people, value) => {
            const { adult, isHandicap, children } = this.state;
            const pivot = $people === 'adult' ? children : adult;
            if (isHandicap && pivot + parseInt(value) >= 4) {
                window.alert(
                    '머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.'
                );
                return true;
            }
        },
    });

    const seat = new Seat({
        initialState: this.state,

        onInit: (adult, children, $target) => {
            if (adult + children === 0) {
                console.log($target.children.__proto);
                $target.childNodes.forEach((node, idx) => {
                    node.classList.add('disabled');
                    node.id = idx;
                });
            } else {
                $target.childNodes.forEach((node, idx) => {
                    node.classList.remove('disabled');
                    node.id = idx;
                    if (this.state.selectedSeats.includes(idx)) {
                        node.classList.add('clicked');
                    } else {
                        node.classList.remove('clicked');
                    }
                });
            }
        },
        ifHandicap: ($target) => {
            $target.childNodes.forEach((node, idx) => {
                if ([36, 37, 38].includes(idx)) {
                    node.classList.remove('disabled');
                } else {
                    node.classList.add('disabled');
                }
            });
        },
        possibleSeat: ($target) => {
            const pivot = this.state.selectedSeats[0];
            const row = parseInt(pivot / 13);
            $target.childNodes.forEach((node, idx) => {
                const childRow = parseInt(idx / 13);
                if (row !== 2) {
                    if (childRow === 2) {
                        node.classList.add('disabled');
                    }
                } else {
                    if (childRow !== 2) {
                        node.classList.add('disabled');
                    }
                    if (!this.state.isHandicap && [36, 37, 38].includes(idx)) {
                        node.classList.add('disabled');
                    }
                }
            });
        },
        ifFullCheck: ($target, selectedSeats) => {
            $target.childNodes.forEach((node, idx) => {
                if (!selectedSeats.includes(idx)) {
                    node.classList.add('disabled');
                }
            });
        },
        addSeat: (seatValue) => {
            this.setState({
                ...this.state,
                selectedSeats: [...this.state.selectedSeats, seatValue],
            });
        },
        minusSeat: (seatValue) => {
            const idx = this.state.selectedSeats.findIndex(
                (id) => id === seatValue
            );
            const temp = this.state.selectedSeats.slice();
            temp.splice(idx, 1);
            this.setState({
                ...this.state,
                selectedSeats: temp,
            });
        },
        reset: () => {
            this.setState({
                adult: 0,
                children: 0,
                isHandicap: false,
                selectedSeats: [],
            });
            window.alert(
                `선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?`
            );
        },
    });

    const reservationInfo = new ReservationInfo({
        initialState: this.state,
    });

    new ResetInfo({
        reset: () => {
            this.setState({
                adult: 0,
                children: 0,
                isHandicap: false,
                selectedSeats: [],
            });
        },
    });

    this.setState = (nextState) => {
        this.state = nextState;
        numOfPeople.setState(this.state);
        seat.setState(this.state);
        reservationInfo.setState(this.state);
    };
}
