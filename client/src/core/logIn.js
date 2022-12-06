import '../App.css';
// Helpery
import Title from '../helpers/title';
import Footer from '../helpers/footer';
import LoginComponent from '../components/loginComponent';

const LogIn = () => {
    return (
        <>
            <Title title='Přihlášení' />

            <LoginComponent />

            <Footer />
        </>
    )
};

export default LogIn;