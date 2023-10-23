export default function Seat({ initialState }) {
    this.state = initialState;
    this.$target = document.querySelector('.seat-group');

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { adult, children } = this.state;
        const a = document.querySelectorAll('.seat');
        if (adult + children >= 1) {
            a.forEach((node, idx) => {
                node.classList.remove('disabled');
                node.id = idx;
            });
        } else {
            a.forEach((node) => {
                node.classList.add('disabled');
            });
        }
    };
    this.render();

    this.$target.addEventListener('click', (e) => {
        const seatBtn = e.target.closest('.seat');
        if (!seatBtn) return;
        const row = Math.floor(seatBtn.id / 13);
        const a = document.querySelectorAll('.seat');

        a.forEach((node, idx) => {
            if (Math.floor(idx / 13) !== row) {
                node.classList.add('disabled');
            }
            if (idx === parseInt(seatBtn.id)) {
                node.classList.toggle('clicked');
            }
        });
    });
}
