export default function ReservationInfo({ initialState }) {
    this.state = initialState;
    this.$seat = document.querySelector('#remainSeatCnt');
    this.$amount = document.querySelector('#amount');

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { remainSeatCnt, adult, children, selectSeats } = this.state;
        const discount = parseInt(selectSeats[0] / 13) === 2 ? 0.8 : 1;
        this.$seat.innerHTML = `${remainSeatCnt - selectSeats.length}`;
        if (adult >= selectSeats.length) {
            this.$amount.innerHTML = `${
                selectSeats.length * 10_000 * discount
            }`;
        } else {
            this.$amount.innerHTML = `${
                (adult * 10_000 + (selectSeats.length - adult) * 7_000) *
                discount
            }`;
        }
    };
    this.render();
}
