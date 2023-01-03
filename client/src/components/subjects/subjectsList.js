import '../../App.css';

import { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';

import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// Axios Calls
import { _alterActivityOfSubject, _createSubject, _listSubjects } from '../../axiosCalls/subjects';
import { _listUsers } from '../../axiosCalls/user';
import { _listFields } from '../../axiosCalls/fields';
// Ikony
import { MdOutlineChangeCircle } from "react-icons/md";
import { AiFillPlusSquare, AiOutlineInfoCircle } from "react-icons/ai";
// Roles Manager
import { _canBrowseAllSubjects, _canCreateSubjects } from '../../rolesManager';
// Konstanty
ReactSession.setStoreType("localStorage");
const user = ReactSession.get("userProject");
const role = user === undefined ? 0 : user.role

const SubjectsList = () => {
    const activeSelect = [{ label: 'Aktivní', value: 1 }, { label: 'Neaktivní', value: 0 }, { label: 'Všechny', value: -1 }];
    // Pro zobrazování předmětů
    const [subjectData, setSubjectData] = useState([]);
    const [shownSubjects, setShownSubjects] = useState([]);
    const [showActive, setShowActive] = useState(1)
    // Zda zobrazovat sekce
    const [showCreation, setShowCreation] = useState(false);
    // Ostatní
    const [teachersInfo, setTeachersInfo] = useState([]);
    const [fieldsInfo, setFieldsInfo] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        setShownSubjects(subjectData.filter(function (subject) {
            if (subject.active == showActive) {
                return subject;
            }

            if (showActive === -1) {
                return subject;
            }
        }));
    }, [showActive, subjectData])

    async function getData() {
        const s = await _listSubjects();

        setSubjectData(s.data);
    }

    return (
        <>
            <div className='subjectList-container'>
                {/* Hlavička */}
                <div className='row subjectsList-header'>
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <h3> Předměty </h3>
                    </div>

                    {_canBrowseAllSubjects.includes(role) ? <div className='col-sm-12 col-md-12 col-lg-3'>
                        <Select
                            className='subjectsList-header-right-select'
                            placeholder="Vyberte jaké předměty chcete zobrazit"
                            defaultValue={{ label: 'Aktivní', value: 1 }}
                            onChange={(selected) => { setShowActive(selected.value) }}
                            options={activeSelect} />
                    </div> : ""}
                    {_canCreateSubjects.includes(role) ? <div className='col-sm-12 col-md-12 col-lg-1'>
                        <span onClick={() => { setShowCreation(!showCreation) }}> <AiFillPlusSquare size={43} /> </span>
                    </div>
                        : ""}
                </div>
                <div className='line-divider'></div>
                <SubjectCreation show={showCreation} />
                {/* Tělo */}
                <div className='row subjectsList-body'>
                    {shownSubjects.map((val, i) => {
                        return (
                            <div className='col-sm-12 col-md-12 col-lg-12'>
                                {i === 0 ? "" : <div className='line-divider'></div>}
                                <SubjectsListRow data={val} key={val.id} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
};

let weekDescriptions = [""];

const SubjectCreation = ({ show }) => {
    // Obsahy Selectů
    const activeSelect = [{ label: 'NE', value: 0 }, { label: 'ANO', value: 1 }];
    const [fieldSelect, setFieldSelect] = useState([{label: 'Data se načítají', value: ''}]);
    const [teacherSelect, setTeacherSelect] = useState([{label: 'Data se načítají', value: ''}]);
    // Vyplněné údaje
    const [name, setName] = useState("");
    const [howManyWeeks, setHowManyWeeks] = useState(1);
    const [field, setField] = useState('');
    const [teacher, setTeacher] = useState('');
    const [activity, setActivity] = useState(0);
    const [description, setDescription] = useState('');
    const [weekDescription, setWeeksDescription] = useState([""]);
    // Errory
    const [nameErr, setNameErr] = useState(false);
    const [howManyWeeksErr, setHowManyWeeksErr] = useState(false);
    const [fieldErr, setFieldErr] = useState(false);
    const [teacherErr, setTeacherErr] = useState(false);
    const [descriptionErr, setDescriptionErr] = useState(false);
    // Vyhodnocení
    const [errMsg, setErrMsg] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setSelectContent();
    }, [])

    useEffect(() => {
        setNameErr(false);
    }, [name])

    useEffect(() => {
        setHowManyWeeksErr(false);
    }, [howManyWeeks])

    useEffect(() => {
        if (howManyWeeks < 1) {
            setHowManyWeeks(1); 
        }

        let temp = []; 
        for (let i = 0; i < howManyWeeks; i++) {
            temp[i] = ' ';
            if(weekDescriptions[i] != undefined) {
                temp[i] = (weekDescriptions[i])
            }
        }

        weekDescriptions = [];
        weekDescriptions = temp;
        setWeeksDescription(temp);
    }, [howManyWeeks])

    if (!show) return;

    async function setSelectContent() {
        const teachers = (await _listUsers({ role: 2 })).data;
        const fields = (await _listFields()).data;
        let temp = [];
        let temp2 = [];

        for (let i = 0; i < fields.length; i++) {
            temp.push({ label: fields[i].name, value: fields[i].id_fi });
        }

        for (let i = 0; i < teachers.length; i++) {
            temp2.push({ label: teachers[i].name, value: teachers[i].id })
        }

        setFieldSelect(temp);
        setTeacherSelect(temp2);
    }

    function changeWeekDescription(index, value) {
        weekDescriptions[index] = value;
    }

    function check() {
        let containsErr = false;
        let msg = [];

        if(name === "" || name === null) {
            containsErr = true;
            setNameErr(true);
            msg.push("* Nebyl vyplněn název předmětu");
        }

        if(howManyWeeks < 1 || howManyWeeks === null) {
            containsErr = true;
            setHowManyWeeksErr(true);
            msg.push("* Nebyl vyplněn platný počet týdnů");
        }

        if(field === "") {
            containsErr = true;
            setFieldErr(true);
            msg.push("* Nebyl vyplněn obor předmětu");
        }

        if(teacher === "") {
            containsErr = true;
            setTeacherErr(true);
            msg.push("* Nebyl vyplněn lektor předmětu");
        }

        if(containsErr) {
            setErrMsg(msg);
            return;
        }

        send();
    }

    function send() {
        let arr = weekDescription.length != weekDescriptions.length ? weekDescription : weekDescriptions;

        const data = {
            name: name,
            description: description,
            field: field,
            howManyWeeks: howManyWeeks,
            weekDescription: arr.toString(),
            teacher: teacher,
            active: activity,
        }

        if(_createSubject(data)) {
            alert('Předmět byl vytvořen');
            setSuccess(true);
        }
    }

    return (
        <>
            <div className='subjectList-creation'>
                <h4> Tvorba předmětu </h4>
                <br></br>
                <div className='row'>
                    <div className='col-sm-12 col-md-4 col-lg-4'>
                        <TextField
                            error={nameErr}
                            label="Název předmětu*"
                            type="text"
                            onChange={(e) => { setName(e.target.value); }}
                        />
                    </div>
                    <div className='col-sm-12 col-md-4 col-lg-4'>
                        <TextField
                            error={howManyWeeksErr}
                            label="Kolik týdnů*"
                            value={howManyWeeks}
                            type="number"
                            onChange={(e) => { setHowManyWeeks(e.target.value); }}
                        />
                    </div>
                </div>
                <br></br>
                <div className='row'>
                    <h5> Popis týdnů </h5>
                    {weekDescription.map((val, i) => {
                        return (
                            <>
                                <br></br>
                                <TextField
                                    label={(i + 1) + ". týden"}
                                    type="text"
                                    onChange={(e) => { changeWeekDescription(i, e.target.value); }}
                                />
                                <div className='new-line'></div>
                            </>
                        )
                    })}
                </div>
                <br></br>
                <div className='row'>
                    <h5> Zbylé informace </h5>
                    <div className='col-sm-12 col-md-4 col-lg-4'>
                        <label> Obor* </label>
                        <Select
                            placeholder="Obor*"
                            onChange={(selected) => { setField(selected.value) }}
                            options={fieldSelect} />
                    </div>
                    <div className='col-sm-12 col-md-4 col-lg-4'>
                        <label> Lektor* </label>
                        <Select
                            placeholder="Lektor*"
                            onChange={(selected) => { setTeacher(selected.value) }}
                            options={teacherSelect} />
                    </div>
                    <div className='col-sm-12 col-md-4 col-lg-4'>
                        <label> Je předmět připraven k výuce* </label>
                        <Select
                            placeholder="Je předmět připraven k výuce*"
                            defaultValue={{ label: 'NE', value: 0 }}
                            onChange={(selected) => { setActivity(selected.value) }}
                            options={activeSelect} />
                    </div>
                </div>
                <br></br>
                <div className='row'>
                    <div className='col-sm-12 col-md-4 col-lg-12'>
                        <label> Popis předmětu: </label>
                        <textarea
                            className='form-control'
                            rows="4"
                            maxLength={1000}
                            placeholder="Popis předmětu"
                            onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                    </div>
                </div>
                <div className='new-line'></div>
                <a> <i> <AiOutlineInfoCircle /> * Musí být vyplněno </i> </a>
                <div className='new-line'></div>
                <div className="form-group addRecipe-btn-div">
                    <Button
                        variant="contained"
                        onClick={check}
                    >
                        Vytvořit předmět </Button>
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
                    <span className={success ? "help-block green" : "help-block hidden"}> Předmět byl vytvořen </span>
                </div>
            </div>
            <div className='line-divider'></div>
        </>
    )
}

const SubjectsListRow = ({ data }) => {
    return (
        <>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-3'>
                    <a className='subjectListRow-a'
                        href={'/subject?id=' + data.id}>
                        {data.name}
                    </a>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-3'>
                    <span> Obor: {data.field_name} </span>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-2'>
                    <span> Počet týdnů: {data.howManyWeeks} </span>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-3'>
                    <span> Lektor: {data.teacher_name} </span>
                </div>
                {_canCreateSubjects.includes(role) ? <div className='col-sm-12 col-md-12 col-lg-1'>
                        <span className={data.active == 0 ? 'red' : 'green'} onClick={() => { _alterActivityOfSubject({id: data.id}) }}> <MdOutlineChangeCircle size={33} /> </span>
                    </div>
                        : ""}
            </div>
        </>
    )
}

export default SubjectsList;