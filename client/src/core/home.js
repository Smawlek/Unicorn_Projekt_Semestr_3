import '../App.css';
// Helpery
import Title from '../helpers/title';
import Footer from '../helpers/footer';

const Home = () => {

    return (
        <>
            <Title title='Domovská stránka' />

            <div className='container'>
                <div className='card border-0 shadow my-5'>
                    <div className='card-body p-5'>
                        <h1> <b> Domovská stránka </b> </h1>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
};

export default Home;