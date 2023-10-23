import PersonalsButton from './PersonalsButton.js';
import Reselect from './Reselect.js';
import ReservationInfo from './ReservationInfo.js';

export default function Reservation() {
    this.state = {
        adult: 0,
        children: 0,
        isDiff: false,
        remainSeatCnt: 39,
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
            });
        },
    });

    const reservationInfo = new ReservationInfo({
        initialState: this.state,
    });
    new Reselect({
        handleReselect: () => {
            this.setState({
                adult: 0,
                children: 0,
                isDiff: false,
                remainSeatCnt: 39,
            });
        },
    });

    this.setState = (nextState) => {
        this.state = nextState;
        personalsButton.setState(this.state);
        reservationInfo.setState(this.state);
    };
}
