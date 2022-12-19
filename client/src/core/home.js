import '../App.css';
// Helpery
import Title from '../helpers/title';
import Footer from '../helpers/footer';
// Komponenty
import LinkTree from '../components/linkTree';
// Konstanty
const links = [
    {text: 'Předměty', link: '/available-subjects'}
]

const Home = () => {

    return (
        <>
            <Title title='Domovská stránka' />

            <div className='container'>
                <div className='card border-0 shadow my-5'>
                    <div className='card-body p-5'>
                        <h1> <b> Domovská stránka </b> </h1>
                        <br></br>
                        <LinkTree data={links} />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
};

export default Home;