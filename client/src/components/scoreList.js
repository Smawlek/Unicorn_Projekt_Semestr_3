import '../App.css';

import { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';

import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// Axios Calls
import { _createAssigment, _getAssigmentBySubject } from '../axiosCalls/assigments';
import { _isUserSignedOnSubject } from '../axiosCalls/subjects';
import { _alterRatings, _getRatingForStudent } from '../axiosCalls/rating';
import { _getRunsStudentByAssigment } from '../axiosCalls/runs';
import { _listTypesOfAssigments } from '../axiosCalls/types';
// Ikony
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillPlusSquare, AiOutlineInfoCircle } from "react-icons/ai";
// Konstanty
ReactSession.setStoreType("localStorage");
const user = ReactSession.get("userProject");
const role = user === undefined ? 0 : user.role

const ScoreList = ({ subject, run }) => {
    const [showCreation, setShowCreation] = useState(false);
    // 
    const [data, setData] = useState('');
    const [isUserSigned, setIsUserSigned] = useState(0);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const arr = (await _getAssigmentBySubject({ id: subject })).data;
        let temp;

        if (role === 3) {
            temp = (await _isUserSignedOnSubject({ run: run, student: user.id })).data;
            setIsUserSigned(temp[0] === undefined ? undefined : temp[0].id_sturu);
        }

        if(role === 3 && temp[0] != undefined) {
            for(let i = 0; i < arr.length; i++) {
                arr[i].rating = (await _getRatingForStudent({ id: temp[0].id_sturu, assigment: arr[i].id_as })).data;
            }
        }

        setData(arr)
    }

    return (
        <>
            <div className='subjectList-container'>
                <div className='row subjectsList-header'>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="d-flex w-100 justify-content-between">
                            <h3> Hodnocení </h3>
                            <small>
                                {
                                    isUserSigned === 0 ? '' :
                                        isUserSigned ?
                                            <div className='green'> Jste přihlášeni na tento předmět </div> :
                                            <div className='red'> Nejste přihlášeni na tento předmět </div>
                                }
                                {
                                    role === 1 || role === 2 ?
                                        <span onClick={() => { setShowCreation(!showCreation) }}> <AiFillPlusSquare size={43} /> </span>
                                        : ''
                                }
                            </small>
                        </div>
                    </div>
                </div>
                <div className='line-divider'></div>
                {showCreation ? <AssigmentCreate subject={subject} /> : ''}
                {/* Tělo */}
                <div className='row subjectsList-body'>
                    {
                        data === '' ? '' :
                            !data ? <p className='search-result'> PŘEDMĚT NEMÁ ŽÁDNÁ ZADÁNÍ </p> :
                                data.map((val, i) => {
                                    return (
                                        <>
                                            {i != 0 ? <div className='line-divider'></div> : ''}
                                            <ScoreListRow data={val} sturu={isUserSigned} run={run} />
                                        </>
                                    )
                                })
                    }
                </div>
            </div>
        </>
    )
};

const ScoreListRow = ({ data, sturu, run }) => {
    const [show, setShow] = useState(false);
    const [points, setPoints] = useState('');

    useEffect(() => {
        if (role === 3 && sturu != undefined) getData();
    }, []);

    async function getData() {
        let rating = data.rating.length > 0 ? data.rating[0] : undefined;
        setPoints(rating != undefined ? rating.points + " / " : "");
    }

    return (
        <>
            <div className='row scoreListRow-div'>
                <div className='col-sm-12 col-md-12 col-lg-3'>
                    <span> {data.name} </span>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-3 mx-auto'>
                    <span> Hodnocení: {points} {data.maxPoints} </span>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-3 mx-auto'>
                    {role === 2 && data.teacher === user.id ? <BsFillPencilFill size={25} onClick={() => { setShow(!show) }} /> : ''}
                </div>
            </div>
            {show ? <ScoreListRow_ChangeRatings assigment={data.id_as} run={run} /> : ""}
        </>
    )
}

const ScoreListRow_ChangeRatings = ({ assigment, run }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (run != undefined) getData();
    }, [])

    async function getData() {
        setData((await _getRunsStudentByAssigment({ run: run, assigment: assigment })).data);
    }

    function changeData(index, point) {
        data[index].points = Number(point);
    }

    async function send() {
        if (_alterRatings(data)) {
            alert("Hodnocení byla upravena");
        }
    }

    return (
        <>
            <h4> Upravit hodnocení </h4>
            <br></br>
            {
                data.map((val, i) => {
                    return (
                        <>
                            <div className='row scoreListRow-div'>
                                <div className='col-sm-12 col-md-4 col-lg-4'>
                                    <p> {val.student_name} </p>
                                </div>
                                <div className='col-sm-12 col-md-4 col-lg-4'>
                                    <TextField
                                        label="Počet bodů*"
                                        type="number"
                                        defaultValue={val.points === null ? 0 : val.points}
                                        InputProps={{ inputProps: { min: 0, max: val.maxPoints } }}
                                        onChange={(e) => { changeData(i, e.target.value); }}
                                    />
                                </div>
                            </div>
                        </>
                    )
                })
            }
            <div className=''>
                <Button
                    variant="contained"
                    onClick={send}
                >
                    Aktualizovat
                </Button>
            </div>
            <div className='new-line'></div>
        </>
    )
}

const AssigmentCreate = ({ subject }) => {
    const [typesSelect, setTypesSelect] = useState([]);
    // Obsah
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(0);
    const [points, setPoints] = useState(1);
    // Errory
    const [nameErr, setNameErr] = useState(false);
    const [typeErr, setTypeErr] = useState(false);
    const [pointsErr, setPointsErr] = useState(false);
    // Vyhodnocení
    const [errMsg, setErrMsg] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setTypesNames();
    }, []);

    useEffect(() => {
        setErrMsg("");
        setNameErr(false);
    }, [name]);

    useEffect(() => {
        setErrMsg("");
        setTypeErr(false);
    }, [type]);

    useEffect(() => {
        setErrMsg("");
        setPointsErr(false);
    }, [points]);

    async function setTypesNames() {
        const t = (await _listTypesOfAssigments()).data;
        let arr = [];

        for (let i = 0; i < t.length; i++) {
            arr.push({
                label: t[i].name,
                value: t[i].id_ty
            });
        }

        setTypesSelect(arr);
    }

    function check() {
        let err = false;
        let msg = [];

        if (name === '') {
            err = true;
            msg.push('* Není vyplněn název zadání');
            setNameErr(true);
        }

        if (type === 0) {
            err = true;
            msg.push('* Není vybrán typ zadání');
            setTypeErr(true);
        }

        if (points <= 0) {
            err = true;
            msg.push('* Maximální počet dosažitelných bodů musí být větší než 0');
            setPointsErr(true);
        }

        if (err) {
            setErrMsg(msg);
            return;
        }

        send();
    }

    async function send() {
        const data = {
            subject: subject,
            type: type,
            name: name,
            description: description,
            maxPoints: points,
        }

        if (_createAssigment(data)) {
            setSuccess(true);
            alert('Zadání bylo úspěšně vytvořeno!');
            window.location.reload(false);
        }
    }

    return (
        <>
            <div className='assigmentCreate-container'>
                <div>
                    <h4> Vytvořit nové zadání </h4>
                </div>
                <br></br>
                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-12'>
                        <TextField
                            label="Název zadání*"
                            type="text"
                            error={nameErr}
                            onChange={(e) => { setName(e.target.value); }}
                        />
                    </div>
                </div>

                <br></br>
                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-12'>
                        <TextField
                            label="Popis zadání"
                            multiline
                            rows={3}
                            onChange={(e) => { setDescription(e.target.value); }}
                        />
                    </div>
                </div>

                <br></br>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-lg-6'>
                        <label> Typ zadání* </label>
                        <Select
                            placeholder="Typ zadání*"
                            onChange={(selected) => { setType(selected.value) }}
                            options={typesSelect}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6'>
                        <TextField
                            label="Maximální počet bodů*"
                            type="number"
                            error={pointsErr}
                            InputProps={{ inputProps: { min: 1 } }}
                            defaultValue={points}
                            onChange={(e) => { setPoints(e.target.value); }}
                        />
                    </div>
                </div>

                <br></br>
                <div className='row'>
                    <a> <i> <AiOutlineInfoCircle /> * Musí být vyplněno </i> </a>
                    <div className='new-line'></div>
                    <div className="form-group addRecipe-btn-div">
                        <Button
                            variant="contained"
                            onClick={check}
                        >
                            Přidat zadání </Button>
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
                    </div>
                </div>
            </div>

            <div className='line-divider'></div>
        </>
    )
}

export default ScoreList;