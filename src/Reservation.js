import PersonalsButton from './PersonalsButton.js';

export default function Reservation() {
    this.state = {
        adult: 0,
        children: 0,
        isDiff: false,
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
    });

    this.setState = (nextState) => {
        this.state = nextState;
        personalsButton.setState(this.state);
    };
}
