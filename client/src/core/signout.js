import { useEffect } from "react";
import { ReactSession } from 'react-client-session';
import { useNavigate } from "react-router-dom";

const Signout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        ReactSession.setStoreType("localStorage");

        ReactSession.set('tokenProject', undefined);
        ReactSession.set('userProject', undefined);

        navigate('/');
        window.location.reload(false);
    }, [])
}

export default Signout;