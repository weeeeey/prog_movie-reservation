export default function ReservationInfo({ initialState }) {
    this.state = initialState;
    this.$seat = document.querySelector('#remainSeatCnt');
    this.$amount = document.querySelector('#amount');

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { remainSeatCnt, adult, children } = this.state;
        this.$seat.innerHTML = `${remainSeatCnt - adult - children}`;
        this.$amount.innerHTML = `${adult * 10_000 + children * 7_000}`;
    };
    this.render();
}
