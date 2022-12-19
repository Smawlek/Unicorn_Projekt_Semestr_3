import '../App.css';

import { useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';

const LinkTree = ({ data }) => {
    ReactSession.setStoreType("localStorage");
    const user = ReactSession.get("user");
    const navigate = useNavigate();

    return (
        <>
            <div className='row linkTree-container'>
                {
                    data.map((val, i) => {
                        return (
                            <div className='col-sm-12 col-md-3 col-lg-2'>
                                <button type="button" className="btn btn-dark linkTree-btn" onClick={() => { navigate(val.link) }}> {val.text} </button>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
};

export default LinkTree;