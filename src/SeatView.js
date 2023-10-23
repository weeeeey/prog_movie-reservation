export default function SeatView(seatNum) {
    this.state = seatNum;
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const seatMid = document.getElementById(this.state);
        if (seatMid) {
            console.log(this.state);
        }
    };
    this.render();
}
