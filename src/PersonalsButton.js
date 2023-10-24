export default function PersonalsButton({
    initialState,
    onClick,
    onToggle,
    onCheck,
}) {
    this.state = initialState; //{adult,children,isDiff}
    this.$adult = document.querySelector('#adultBtn');
    this.$children = document.querySelector('#youthBtn');
    this.$isDiff = document.querySelector('#checkHandicap');

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { adult, children, isDiff, selectSeats } = this.state;
        this.$adult.children[adult].classList.add('toggle');
        this.$children.children[children].classList.add('toggle');
        this.$isDiff.checked = isDiff;
        if (
            adult + children === 0 ||
            adult >= 4 ||
            children >= 4 ||
            adult + children >= 4
        ) {
            this.$isDiff.setAttribute('disabled', true);
        } else {
            this.$isDiff.removeAttribute('disabled');
        }
        const handiSeat = [36, 37, 38];
        for (let i = 0; i < selectSeats.length; i++) {
            if (!handiSeat.includes(i)) {
                this.$isDiff.setAttribute('disabled', true);
                break;
            }
        }

        if (adult + children >= 4 && isDiff === true) {
            this.$adult.children[adult].classList.remove('toggle');
            this.$children.children[children].classList.remove('toggle');

            onCheck();
        }
    };
    this.render();

    this.$adult.addEventListener('click', (e) => {
        const btn = e.target.closest('.--general');
        if (!btn) return;
        this.$adult.children[this.state.adult].classList.remove('toggle');

        onClick(parseInt(btn.innerHTML), 'adult');
    });

    this.$children.addEventListener('click', (e) => {
        const btn = e.target.closest('.--youth');
        if (!btn) return;
        this.$children.children[this.state.children].classList.remove('toggle');
        onClick(parseInt(btn.innerHTML), 'children');
    });

    this.$isDiff.addEventListener('click', (e) => {
        const handicap = e.target.closest('#checkHandicap');
        if (!handicap) return;
        onToggle();
    });
}
