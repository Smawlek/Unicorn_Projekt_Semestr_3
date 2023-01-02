import '../App.css';

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Helpery
import Title from '../helpers/title';
import Footer from '../helpers/footer';
// Komponenty
import SubjectDescription from '../components/subjects/subjectDescription';
import ScoreList from '../components/scoreList';
// Axios Calls
import { _getRun } from '../axiosCalls/runs';
import { _getSubject } from '../axiosCalls/subjects';

const SubjectInfo = () => {
    const navigate = useNavigate();

    const [id, setId] = useState(0);
    const [run, setRun] = useState(0);

    useEffect(() => {
        findUri();
    }, []);

    useEffect(() => {
        if (id === 0) return;

        if (id === undefined) {
            navigate("/");
            return;
        }

        checkId();
    }, [id]);

    useEffect(() => {
        if (run === 0 || run === undefined) return;

        checkRun();
    }, [run]);

    async function checkId() {
        const temp = (await _getSubject({ id: id }));

        if (temp.length <= 0) navigate("/");
    }

    async function checkRun() {
        const temp = (await _getRun({ id: run })).data;

        if (temp.length <= 0) navigate("/");
    }

    function findUri() {
        const data = [(window.location.href.split('?'))[1]];

        if (data.length <= 0) {
            navigate("/");
            return;
        }

        const temp = (data[0].split('='));
        const idTemp = (temp[1].split('&'))[0];
        const runTemp = (temp[2]);

        setId(idTemp);
        setRun(runTemp);
    }

    return (
        <>
            <Title title='Předmět' />

            <div className='container'>
                <div className='card border-0 shadow my-5'>
                    <div className='card-body p-5'>
                        <SubjectDescription id={id} />

                        <div className='new-line'></div>
                        {run != 0 ? <ScoreList subject={id} run={run} /> : ''}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
};

export default SubjectInfo;