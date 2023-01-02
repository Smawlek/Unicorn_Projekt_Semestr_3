import '../App.css';

import { ReactSession } from 'react-client-session';
// Helpery
import Title from '../helpers/title';
import Footer from '../helpers/footer';
// Komponenty
import LinkTree from '../components/linkTree';
import SignedSubjectList from '../components/subjects/signedSubjectList';
// Konstanty
ReactSession.setStoreType("localStorage");
const user = ReactSession.get("userProject");
const role = user === undefined ? 0 : user.role
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
                        {role === 2 || role === 3 ? <SignedSubjectList /> : ''}
                        <LinkTree data={links} />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
};

export default Home;