import '../../App.css';

import { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';
// Ikony
import { BsFillArrowUpSquareFill, BsFillArrowDownSquareFill } from "react-icons/bs";
import { _getStudentsRuns2, _getTeachersRuns } from '../../axiosCalls/runs';
// Konstanty
ReactSession.setStoreType("localStorage");
const user = ReactSession.get("userProject");
const role = user === undefined ? 0 : user.role

const SignedSubjectList = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <div className='signedSubjectList-container'>
                {/* Hlavička */}
                <div className='row subjectsList-header'>
                    <div className="col-sm-12 col-md-12 col-lg-11 mx-auto">
                        <div className="d-flex w-100 justify-content-between">
                            <h3> <b> Seznam aktivních předmětů </b> </h3>
                            <small>
                                {show ?
                                    <BsFillArrowUpSquareFill size={30} onClick={() => { setShow(!show) }} /> :
                                    <BsFillArrowDownSquareFill size={30} onClick={() => { setShow(!show) }} />
                                }
                            </small>
                        </div>
                    </div>
                </div>
                {/* Tělo */}
                {show ? <SignedSubjectListBody /> : ''}
            </div>
        </>
    )
}

const SignedSubjectListBody = () => {
    const [show, setShow] = useState(false);
    // Data
    const [activeData, setActiveData] = useState('');
    const [notActiveData, setNotActiveData] = useState('');

    useEffect(() => {
        switch (role) {
            case 2:
                setTeacherRuns();
                break;
            case 3:
                setStudentsRuns();
                break;
            default:
                break;
        }
    }, []);

    async function setTeacherRuns() {
        let notActive = [];
        let active = [];
        let arr = (await _getTeachersRuns({ id: user.id })).data;

        notActive = arr.filter((run) => {
            if (run.run_finished === 0) {
                return run;
            }
        });

        active = arr.filter((run) => {
            if (run.run_finished === 1) {
                return run;
            }
        });

        setActiveData(active);
        setNotActiveData(notActive);
    }

    async function setStudentsRuns() {
        let notActive = [];
        let active = [];
        let arr = (await _getStudentsRuns2({ id: user.id })).data;

        notActive = arr.filter((run) => {
            if (run.run_finished === 0) {
                return run;
            }
        });

        active = arr.filter((run) => {
            if (run.run_finished === 1) {
                return run;
            }
        });

        setActiveData(active);
        setNotActiveData(notActive);
    }

    return (
        <>
            <div className='signedSubjectListBody-container'>
                <div className='row'>
                    <div className="col-sm-12 col-md-12 col-lg-11 mx-auto">
                        <div className="d-flex w-100 justify-content-between">
                            <h4> Aktivní </h4>
                            <ul class="list-group">
                                {activeData === '' ? <p className='search-result'> DATA SE NAČÍTAJÍ </p> :
                                    activeData.length <= 0 ? <p className='search-result'> NEJSTE PŘIHLÁŠEN/A NA ŽÁDNÝ PŘEDMĚT </p> :
                                        activeData.map((val) => {
                                            return (
                                                <li class="list-group-item"> <a href={'/subject?id=' + val.subject_id + '&run=' + val.run_id}>
                                                    {val.subject_name}
                                                </a> </li>
                                            )
                                        })
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='line-divider'></div>
                <div className='row'>
                    <div className="col-sm-12 col-md-12 col-lg-11 mx-auto">
                        <div className="d-flex w-100 justify-content-between">
                            <h4> Historie </h4>
                            <small>
                                {show ?
                                    <BsFillArrowUpSquareFill size={30} onClick={() => { setShow(!show) }} /> :
                                    <BsFillArrowDownSquareFill size={30} onClick={() => { setShow(!show) }} />
                                }
                            </small>
                            <ul class="list-group">
                                {!show ? '' :
                                    notActiveData === '' ? <p className='search-result'> DATA SE NAČÍTAJÍ </p> :
                                        notActiveData.length <= 0 ? <p className='search-result'> NEMÁTE ŽÁDNOU HISTORII PŘIHLÁŠENÝCH PŘEDMĚTŮ </p> :
                                            notActiveData.map((val) => {
                                                return (
                                                    <li class="list-group-item"> <a href={'/subject?id=' + val.subject_id + '&run=' + val.run_id}>
                                                        {val.subject_name}
                                                    </a> </li>
                                                )
                                            })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignedSubjectList;