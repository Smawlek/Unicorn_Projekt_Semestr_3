import '../App.css';

import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';

import Button from '@mui/material/Button';
// Const
import { _EMAIL_REGEX } from '../helpers/const';
// Axios Calls
import { _loginUser } from '../axiosCalls/user';

const LoginComponent = (props) => {
    ReactSession.setStoreType("localStorage");

    let firstEmail = true;

    const token = ReactSession.get("tokenProject");
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(1);

    const [emailErr, setEmailErr] = useState(false);
    const [pwdErr, setPwdErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if(token != undefined || token != null) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        const ver = _EMAIL_REGEX.test(email);

        if ((email === "" && firstEmail) || (!ver && !firstEmail)) {
            firstEmail = false;
            setEmailErr(true);
        } else {
            setEmailErr(false);
        }
    }, [email])

    useEffect(() => {
        if (password === "") {
            setPwdErr(true);
        } else {
            setPwdErr(false);
        }
    }, [password])

    async function login() {
        try {
            let response = await _loginUser({
                email: email,
                password: password,
            });

            const user = {
                id: response.data[0].id,
                name: response.data[0].name,
                role: response.data[0].role,
                email: response.data[0].email,
            }

            ReactSession.set("tokenProject", response.data[0].token);
            ReactSession.set("userProject", user);
            response.data[0].token = undefined;

            navigate("/")
        } catch (error) {
            setErrMsg('Uživatel s daným email a heslem neexistuje!');
        }
    }

    return (
        <>
            <div>
                <div className="col-sm-0 col-md-0 col-lg-4 mx-auto"></div>

                <div className="card card-signin my-5 col-sm-12 col-md-12 col-lg-4 mx-auto">
                    <div className="card-body" id="reg">
                        <h2> Přihlášení </h2>
                        <div className='new-line'></div>
                        <form>
                            <div className="form-group">
                                <label> E-mail </label>
                                <input
                                    type="text"
                                    className={emailErr && !firstEmail ? "form-control is-invalid" : "form-control"}
                                    autoComplete='off'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            <div className='new-line'></div>
                            <div className="form-group">
                                <label> Heslo </label>
                                <input
                                    type="password"
                                    className={pwdErr ? "form-control is-invalid" : "form-control"}
                                    autoComplete='off'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                                <div className='new-line'></div>
                                <span className={errMsg ? "help-block red" : "white"}> {errMsg} </span>
                            </div>
                            <div className='new-line'></div>
                            <div className="form-group">
                                <Button variant="contained" onClick={login}> Přihlásit se </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="col-sm-0 col-md-0 col-lg-4 mx-auto"></div>
            <Outlet />
        </>
    )
};

export default LoginComponent;