import LoginForm from './LoginForm.js';
import Reservation from './Reservation.js';

export default function App($app) {
    this.state = {
        email: '',
    };
    new LoginForm({
        handleForm: (email) => {
            this.setState({
                ...this.state,
                email,
            });
        },
    });
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        if (this.state.email) {
            let loginSection = document.getElementById('loginSection');
            let theaterSection = document.getElementById('theaterSection');

            loginSection.style.display = 'none';
            theaterSection.style.display = 'block';
            new Reservation();
        }
    };
    this.render();
}
