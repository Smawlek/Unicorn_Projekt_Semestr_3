import '../App.css';

import { Outlet } from "react-router-dom";
import { ReactSession } from 'react-client-session';
// Ikony
import { AiFillHome } from "react-icons/ai";
import { CgUser } from "react-icons/cg";

const Layout = () => {
    ReactSession.setStoreType("localStorage");
    const token = ReactSession.get("token");
    const user = ReactSession.get("user");

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container" style={{ margin: 0 }}>
                    <a className="navbar-brand" href="/">
                        <span> SUBJECTTERMMAN </span>
                    </a>
                </div>
                <div className="container" style={{ margin: 0 }}>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto layout-ul layout-ul">
                            <li className='nav-item'> <a className='nav-link' href={"/"}> <AiFillHome /> Domů </a> </li>

                            <div className='dropdown-divider' style={{ border: '1px solid rgba(79, 82, 80)' }}></div>
                            <li className='nav-item layout-divider'> <a className='nav-link' href={"/available-subjects"}> Dostupné předměty </a> </li>

                            <div className='dropdown-divider' style={{ border: '1px solid rgba(79, 82, 80)' }}></div>
                            <li className='nav-item layout-divider'> <a className='nav-link' href={"/available-runs"}> Probíhající předměty </a> </li>
                            <LogedPart token={token} user={user} />
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
};

const LogedPart = ({ token, user }) => {
    if (token === undefined || token === null) {
        return (
            <>
                <div className='dropdown-divider' style={{ border: '1px solid rgba(79, 82, 80)' }}></div>
                <li className='nav-item layout-divider'> <a className='nav-link' href={"/login"}> Přihlásit se </a> </li>
            </>
        )
    }

    return (
        <>
            <div className='dropdown-divider' style={{ border: '1px solid rgba(79, 82, 80)' }}></div>
            <li className='nav-item layout-divider'> <a className='nav-link' href={"#"}> <CgUser /> {user.name} </a> </li>
        </>
    )
}

export default Layout;