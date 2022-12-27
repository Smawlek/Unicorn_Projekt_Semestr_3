import '../App.css';
// Helpery
import Title from '../helpers/title';
import Footer from '../helpers/footer';
// Komponenty
import AvailableRunsInfo from '../components/runs/availableRunsInfo';

const AvailableRuns = () => {
    return (
        <>
            <Title title='Dostupné předměty' />

            <div className='container'>
                <div className='card border-0 shadow my-5'>
                    <div className='card-body p-5'>
                        <h1> <b> Právě probíhající předměty </b> </h1>
                        <AvailableRunsInfo />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
};

export default AvailableRuns;