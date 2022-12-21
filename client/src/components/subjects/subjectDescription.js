import '../../App.css';

import { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';
import { useNavigate } from "react-router-dom";
// Axios Calls
import { _getSubject } from '../../axiosCalls/subjects';

const SubjectDescription = ({ id }) => {
    ReactSession.setStoreType("localStorage");
    const user = ReactSession.get("userProject");
    const navigate = useNavigate();
    //
    const [subjectInfo, setSubjectInfo] = useState([]);

    useEffect(() => {
        if (id === 0) return;

        getData();
    }, [id]);

    async function getData() {
        let temp = (await _getSubject({ id: id })).data[0];

        if(temp === undefined) navigate('/');

        temp.weekDescription = temp.weekDescription.split(',');
        setSubjectInfo(temp);
    }

    return (
        <>
            <div className='subjectDescription-container'>
                <h1> <b> {subjectInfo.name} </b> </h1>
                <br></br>
                <ul class="list-group">
                    <li class="list-group-item"> <b> Lektor: </b> {subjectInfo.teacher_name} </li>
                    <li class="list-group-item"> <b> Obor: </b> {subjectInfo.field_name} </li>
                    <li class="list-group-item"> <b> Délka předmětu: </b> {subjectInfo.howManyWeeks} </li>
                </ul>
                <br></br>
                <h4> Popis předmětu: </h4>
                <p> {subjectInfo.description} </p>
                {subjectInfo.weekDescription === undefined ? '' :
                    subjectInfo.weekDescription.map((val, i) => {
                        return (
                            <>
                                <SubjectDescriptionRow text={val} i={i + 1} />
                            </>
                        );
                    })
                }
            </div>
        </>
    );
};

const SubjectDescriptionRow = ({ text, i }) => {
    return (
        <>
            <li class="list-group-item"> <b>Týden {i}: </b> {text} </li>
        </>
    )
}

export default SubjectDescription;