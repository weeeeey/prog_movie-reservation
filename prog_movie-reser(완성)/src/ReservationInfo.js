export default function ReservationInfo({ initialState }) {
    this.state = initialState;

    this.$remainSeatCnt = document.querySelector('#remainSeatCnt');
    this.$amount = document.querySelector('#amount');

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const { adult, isHandicap, selectedSeats } = this.state;
        const totalRemain = 39;
        this.$remainSeatCnt.innerHTML = `
            ${totalRemain - selectedSeats.length}
        `;
        let amountValue = 0;
        const discount = parseInt(selectedSeats[0] / 13) === 2 ? 0.8 : 1;
        if (isHandicap) {
            amountValue = 5_000 * selectedSeats.length;
        } else {
            if (adult >= selectedSeats.length) {
                amountValue = 10_000 * selectedSeats.length;
            } else {
                amountValue =
                    10_000 * adult + (selectedSeats.length - adult) * 7_000;
            }
        }
        this.$amount.innerHTML = `${amountValue * discount}`;
    };
    this.render();
}
