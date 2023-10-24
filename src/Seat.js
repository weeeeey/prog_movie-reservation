export default function Seat({
    initialState,
    onInit,
    onSelectedSeats,
    handleFullSeats,
    resetState,
    handleHandicap,
    onClick,
    addSeats,
    minusSeats,
}) {
    this.state = initialState;
    this.$target = document.querySelector('.seat-group');
    this.$seats = document.querySelectorAll('.seat');

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const { adult, children, isDiff, selectSeats } = this.state;

        onInit(this.$seats);
        onSelectedSeats(this.$seats);
        if (adult + children < selectSeats.length) {
            window.alert(
                '선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?'
            );
            resetState();
        }
        if (
            !isDiff &&
            selectSeats.some((seatId) => [36, 37, 38].includes(seatId))
        ) {
            window.alert(
                '선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?'
            );
            resetState();
        }
        if (adult + children === selectSeats.length) {
            handleFullSeats(this.$seats);
        }
    };

    this.render();

    this.$target.addEventListener('click', (e) => {
        const clickedSeatBtn = e.target.closest('.seat');
        if (!clickedSeatBtn) return;
        if (
            !this.state.isDiff &&
            [36, 37, 38].includes(parseInt(clickedSeatBtn.id))
        ) {
            window.alert(
                '선택하신 좌석은 장애인석으로 일반고객은 예매할 수 없는 좌석입니다.'
            );
        } else if (clickedSeatBtn.classList.contains('clicked')) {
            minusSeats(clickedSeatBtn.id);
        } else {
            addSeats(clickedSeatBtn.id);
        }
    });
}

// this.render = () => {
//     const { adult, children, selectSeats,isDiff } = this.state;
//     const $seats = document.querySelectorAll('.seat');

//     if(isDiff){
//         $seats.forEach((node,idx)=>{
//             const row = parseInt(idx/13)
//             if(row!==2){}
//         })
//     }
//     // if (selectSeats.length === adult + children) {
//     //     $seats.forEach((node, idx) => {
//     //         if (!selectSeats.includes(idx)) {
//     //             node.classList.add('disabled');
//     //         }
//     //     });
//     // } else if (adult + children >= 1) {
//     //     $seats.forEach((node, idx) => {
//     //         node.classList.remove('disabled');
//     //         node.id = idx;
//     //     });
//     // } else {
//     //     $seats.forEach((node) => {
//     //         node.classList.add('disabled');
//     //     });
//     // }
// };

// this.render();

// this.$target.addEventListener('click', (e) => {
//     const seatBtn = e.target.closest('.seat');
//     if (!seatBtn) return;
//     const row = Math.floor(seatBtn.id / 13);
//     const a = document.querySelectorAll('.seat');

//     if (row !== 2) {
//         handleHandicap();
//     }

//     a.forEach((node, idx) => {
//         this.row = Math.floor(idx / 13);
//         if (
//             this.row !== row &&
//             !([0, 1].includes(row) && [0, 1].includes(this.row))
//         ) {
//             node.classList.add('disabled');
//         }
//         if (row === 2 && this.row === 2) {
//         }

//         if (idx === parseInt(seatBtn.id)) {
//             if (node.classList.contains('clicked')) {
//                 minusSeats(idx);
//                 node.classList.remove('clicked');
//             } else {
//                 addSeats(idx);
//                 node.classList.add('clicked');
//             }
//         }
//     });
// });
