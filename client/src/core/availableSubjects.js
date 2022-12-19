import '../App.css';
// Helpery
import Title from '../helpers/title';
import Footer from '../helpers/footer';
// Komponenty
import SubjectsList from '../components/subjects/subjectsList';

const AvailableSubjects = () => {
    return (
        <>
            <Title title='Dostupné předměty' />

            <div className='container'>
                <div className='card border-0 shadow my-5'>
                    <div className='card-body p-5'>
                        <h1> <b> Dostupné předměty </b> </h1>
                        <br></br>
                        <SubjectsList />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
};

export default AvailableSubjects;