export default function NumOfPeople({
    initialState,
    onClick,
    onRender,
    handleHandicapOverPeople,
    reset,
}) {
    this.state = initialState;
    this.$adultBtns = document.querySelector('#adultBtn');
    this.$childrenBtns = document.querySelector('#youthBtn');
    this.$handicapCheck = document.querySelector('#checkHandicap');

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { adult, children, selectedSeats } = this.state;
        onRender(this.$adultBtns, adult);
        onRender(this.$childrenBtns, children);

        if (adult + children == 0 || adult + children >= 4) {
            this.$handicapCheck.disabled = true;
            this.$handicapCheck.checked = false;
        } else {
            this.$handicapCheck.disabled = false;
        }
        if (
            selectedSeats.length > 0 &&
            ![36, 37, 38].includes(selectedSeats[0])
        ) {
            this.$handicapCheck.disabled = true;
            this.$handicapCheck.checked = false;
        }
    };

    this.render();

    this.$adultBtns.addEventListener('click', (e) => {
        const btn = e.target.closest('.--general');
        if (!btn) return;
        const isOver = handleHandicapOverPeople('adult', btn.innerText);
        if (!isOver) {
            onClick('adult', parseInt(btn.innerText));
        }
    });
    this.$childrenBtns.addEventListener('click', (e) => {
        const btn = e.target.closest('.--youth');
        if (!btn) return;
        const isOver = handleHandicapOverPeople('children', btn.innerText);
        if (!isOver) {
            onClick('children', parseInt(btn.innerText));
        }
    });
    this.$handicapCheck.addEventListener('click', (e) => {
        onClick('isHandicap', this.$handicapCheck.checked);
    });
}
