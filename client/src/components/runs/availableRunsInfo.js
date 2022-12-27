import '../../App.css';

import moment from 'moment';
import { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';

import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// Axios Calls
import { _listUsers } from '../../axiosCalls/user';
import { _alterActivityOfRun, _createRun, _getStudentsRuns, _listRuns, _signUnsignStudentFromRun } from '../../axiosCalls/runs';
import { _listSubjects } from '../../axiosCalls/subjects';
// Roles Manager
import { _canBrowseAllRuns, _canCreateRun, _canSingOnRun } from '../../rolesManager';
// Ikony
import { GiNotebook } from "react-icons/gi";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillPlusSquare, AiOutlineInfoCircle } from "react-icons/ai";
// Konstanty
ReactSession.setStoreType("localStorage");
const user = ReactSession.get("userProject");
const role = user === undefined ? 0 : user.role
const activeSelect = [{ label: 'Můžu se přihlásit', value: 1 }, { label: 'Nemůžu se přihlásit', value: 0 }, { label: 'Všechny', value: -1 }]

const AvailableRunsInfo = () => {
    const [showCreation, setShowCreation] = useState(false);
    const [showActive, setShowActive] = useState(1);
    // Data
    const [runsData, setRunsData] = useState([]);
    const [shownRuns, setShownRuns] = useState([]);
    const [studentsRuns, setStudentsRuns] = useState([]);
    // Ostatní
    const [teachersInfo, setTeachersInfo] = useState([]);
    const [subjectsInfo, setSubjectsInfo] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        setShownRuns(runsData.filter(function (run) {
            if (run.canSign == showActive) {
                return run;
            }

            if (showActive === -1) {
                return run;
            }
        }));
    }, [showActive, runsData])

    async function getData() {
        setRunsData((await _listRuns()).data);
        setTeachersInfo((await _listUsers({ role: 2 })).data);
        setSubjectsInfo((await _listSubjects()).data);

        if (role === 3) getStudentsRuns();
    }

    async function getStudentsRuns() {
        const data = (await _getStudentsRuns({ id: user.id }));
        let temp = [];

        for (let i = 0; i < data.length; i++) {
            temp.push(data[i].run);
        }

        setStudentsRuns(temp);
    }

    return (
        <>
            <div className='subjectList-container'>
                {/* Hlavička */}
                <div className='row subjectsList-header'>
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <h3> Právě vyučující se předměty </h3>
                    </div>

                    {_canBrowseAllRuns.includes(role) ?
                        <div className='col-sm-12 col-md-12 col-lg-3'>
                            <Select
                                className='subjectsList-header-right-select'
                                placeholder="Vyberte jaké předměty chcete zobrazit"
                                defaultValue={{ label: 'Můžu se přihlásit', value: 1 }}
                                onChange={(selected) => { setShowActive(selected.value) }}
                                options={activeSelect}
                            />
                        </div> : ""}
                    {_canCreateRun.includes(role) ? <div className='col-sm-12 col-md-12 col-lg-1'>
                        <span onClick={() => { setShowCreation(!showCreation) }}> <AiFillPlusSquare size={43} /> </span>
                    </div>
                        : ""}
                </div>
                <div className='line-divider'></div>
                <RunCreation show={showCreation} teachers={teachersInfo} subjects={subjectsInfo} />
                {/* Tělo */}
                <div className='row subjectsList-body'>
                    {shownRuns.map((val, i) => {
                        return (
                            <div className='col-sm-12 col-md-12 col-lg-12'>
                                {i === 0 ? "" : <div className='line-divider'></div>}
                                <AvailableRunsRow data={val} studentsRuns={studentsRuns} key={val.id_sute} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
};

const AvailableRunsRow = ({ data, studentsRuns }) => {
    async function sign() {
        if (studentsRuns.includes(data.id_sute)) {
            alert('Na předmět jse již přihlášen/a. Pokud se chcete odhlásit, kontaktujte prosím studijní oddělení školy');
            return;
        }

        _signUnsignStudentFromRun({ id: user.id, run: data.id_sute });
    }

    return (
        <>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-3'>
                    <a className='subjectListRow-a'
                        href={'/subject?id=' + data.subject}>
                        {data.subject_name}
                    </a>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-2'>
                    <span> Obor: {data.field_name} </span>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-2'>
                    <span> Počet týdnů: {data.length} </span>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-3'>
                    <span> Lektor: {data.teacher_name} </span>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-1'>
                    <span> {data.signed_students} / {data.capacity} </span>
                </div>
                {_canCreateRun.includes(role) ?
                    <div className='col-sm-12 col-md-12 col-lg-1'>
                        <span className={data.canSign == 0 ? 'red' : 'green'} onClick={() => { _alterActivityOfRun({ id: data.id_sute }) }}> <BsFillPencilFill size={33} /> </span>
                    </div>
                    : ""
                }
                {_canSingOnRun.includes(role) && data.canSign && data.signed_students < data.capacity ?
                    <div className='col-sm-12 col-md-12 col-lg-1'>
                        <span className={studentsRuns.includes(data.id_sute) == 0 ? 'red' : 'green'} onClick={() => { sign() }}> <GiNotebook size={33} /> </span>
                    </div>
                    : ''
                }
            </div>
        </>
    )
}

const RunCreation = ({ show, teachers, subjects }) => {
    // Výplň selectů
    const [teachersSelect, setTeachersSelect] = useState([]);
    const [subjectsSelect, setSubjectsSelect] = useState([]);
    const canSignSelect = [{ value: 0, label: 'Nemůžou se přihlašovat' }, { value: 1, label: 'Můžou se přihlašovat' }];
    // Pro formulář
    const [start, setStart] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [length, setLegth] = useState(2);
    const [capacity, setCapacity] = useState(1);
    const [canSign, setCanSign] = useState(0);
    const [subject, setSubject] = useState(0);
    const [teacher, setTeacher] = useState(0);
    // Errory
    const [startErr, setStartErr] = useState(false);
    const [lengthErr, setLegthErr] = useState(false);
    const [capacityErr, setCapacityErr] = useState(false);
    const [subjectErr, setSubjectErr] = useState(false);
    const [teacherErr, setTeacherErr] = useState(false);
    // Po odeslání
    const [errMsg, setErrMsg] = useState([]);
    const [success, setSuccess] = useState(false);
    // UseEffecty pro errory
    useEffect(() => {
        setErrMsg([])
    }, [start, length, capacity, subject, teacher])

    useEffect(() => {
        setStartErr(false);
    }, [start]);

    useEffect(() => {
        setLegthErr(false);
    }, [length]);

    useEffect(() => {
        setCapacityErr(false);
    }, [capacity]);

    useEffect(() => {
        setSubjectErr(false);
    }, [subject]);

    useEffect(() => {
        setTeacherErr(false);
    }, [teacher]);
    //
    useEffect(() => {
        setSelects();
    }, []);

    function setSelects() {
        let temp = [];

        if (teachers != undefined) {
            for (let i = 0; i < teachers.length; i++) {
                temp.push({
                    label: teachers[i].name,
                    value: teachers[i].id
                })
            }
        }

        setTeachersSelect(temp);
        temp = [];

        if (subjects != undefined) {
            for (let i = 0; i < subjects.length; i++) {
                temp.push({
                    label: subjects[i].name,
                    value: subjects[i].id
                })
            }
        }

        setSubjectsSelect(temp);
    }

    function check() {
        let err = false;

        if (start === '') {
            setStartErr(true);
            setErrMsg('* Nebyl vyplněn začátek běhu');
            err = true;
        }

        if (length === '' || length < 1) {
            setLegthErr(true);
            setErrMsg('* Nebyla vyplněna délka běhu');
            err = true;
        }

        if (capacity === '' || capacity < 1) {
            setCapacityErr(true);
            setErrMsg('* Nebyla vyplněna kapacita běhu');
            err = true;
        }

        if (teacher === 0) {
            setErrMsg('* Nebyl vybrán lektor')
            err = true;
        }

        if (subject === 0) {
            setErrMsg('* Nebyl vybrán předmět')
            err = true;
        }

        if (err) return;

        send();
    }

    function send() {
        const data = {
            subject: subject,
            teacher: teacher,
            start: start,
            length: length,
            canSign: canSign,
        }

        if (_createRun(data)) {
            setSuccess(true);
            alert('Běh předmětu byl vytvořen');
        }
    }

    if (!show) return;

    return (
        <>
            <div className='row subjectsList-header'>
                <h3> <b> Vytvoření nového běhu předmětu </b> </h3>
            </div>
            <div className='new-line'></div>
            <div className='row subjectsList-body'>
                <div className='col-sm-12 col-md-3 col-lg-4'>
                    <TextField
                        label="Začátek*"
                        type="date"
                        error={startErr}
                        defaultValue={start}
                        onChange={(e) => { setStart(e.target.value); }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: 150 }}
                    />
                </div>
                <div className='col-sm-12 col-md-3 col-lg-4'>
                    <TextField
                        label="Délka*"
                        type="number"
                        error={lengthErr}
                        defaultValue={length}
                        onChange={(e) => { setLegth(e.target.value); }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ inputProps: { min: 1 } }}
                        sx={{ width: 150 }}
                    />
                </div>
                <div className='col-sm-12 col-md-3 col-lg-4'>
                    <TextField
                        label="Kapacita*"
                        type="number"
                        error={capacityErr}
                        defaultValue={capacity}
                        onChange={(e) => { setCapacity(e.target.value); }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ inputProps: { min: 1 } }}
                        sx={{ width: 150 }}
                    />
                </div>
            </div>
            <div className='new-line'></div>
            <div className='row subjectsList-body'>
                <div className='col-sm-12 col-md-3 col-lg-4'>
                    <Select
                        placeholder="Vyberte jméno lektora*"
                        onChange={(selected) => { setTeacher(selected.value) }}
                        options={teachersSelect}
                    />
                </div>
                <div className='col-sm-12 col-md-3 col-lg-4'>
                    <Select
                        placeholder="Vyberte předmět*"
                        onChange={(selected) => { setSubject(selected.value) }}
                        options={subjectsSelect}
                    />
                </div>
                <div className='col-sm-12 col-md-3 col-lg-4'>
                    <Select
                        placeholder="Vyberte zda se studenti můžou přihlašovat*"
                        defaultValue={canSignSelect[0]}
                        onChange={(selected) => { setCanSign(selected.value) }}
                        options={canSignSelect}
                    />
                </div>
            </div>
            <div className='new-line'></div>
            <div className='subjectsList-header'> <a> <i> <AiOutlineInfoCircle /> * Musí být vyplněno </i> </a> </div>
            <div className='new-line'></div>
            <div className="form-group addRecipe-btn-div subjectsList-header">
                <Button
                    variant="contained"
                    onClick={check}
                >
                    Přidat lektora </Button>
                <div className='new-line'></div>

                <span className={errMsg ? "help-block red" : "help-block hidden"}>
                    {
                        errMsg === "" ? "" :
                            errMsg.map((val, i) => {
                                return (
                                    <>
                                        {i != 0 ? "" : <p> Nejsou vyplněny všechny potřebné údaje: </p>}
                                        <p className='red'> {val} </p>
                                    </>
                                )
                            })
                    }
                </span>
                <span className={success ? "help-block green" : "help-block hidden"}> Běh předmětu byl vytvořen </span>
            </div>

            <div className='line-divider'></div>
        </>
    )
};

export default AvailableRunsInfo;