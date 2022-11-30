import '../App.css';

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Helpery
import Title from '../helpers/title';
import Footer from '../helpers/footer';

const SubjectInfo = () => {
    const navigate = useNavigate();

    const [id, setId] = useState(0);

    useEffect(() => {
        findUri();
    }, []);

    useEffect(() => {
        if (id === 0) return;
        if (id === undefined) {
            navigate("/");
            return;
        }

        console.log(id)
    }, [id]);

    function findUri() {
        const data = [(window.location.href.split('?'))[1]];

        if (data.length <= 0) {
            navigate("/");
            return;
        }

        let temp;

        if (data.constructor != Array) {
            setId((data.split('='))[1]);
            return;
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i].includes('id')) {
                temp = (data[i].split('='))[1];
                break;
            }
        }

        setId(temp)
    }

    return (
        <>
            <Title title='Předmět' />

            <div className='container'>
                <div className='card border-0 shadow my-5'>
                    <div className='card-body p-5'>
                        <h1> <b> Předmět </b> </h1>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
};

export default SubjectInfo;